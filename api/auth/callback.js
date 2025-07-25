import fetch from "node-fetch";
import crypto from "crypto";

function verifyHmac(query, clientSecret) {
  const { hmac, ...rest } = query;
  const message = Object.keys(rest)
    .sort()
    .map(
      (key) => `${key}=${Array.isArray(rest[key]) ? rest[key][0] : rest[key]}`
    )
    .join("&");
  const generated = crypto
    .createHmac("sha256", clientSecret)
    .update(message)
    .digest("hex");
  return generated === hmac;
}

export default async function handler(req, res) {
  const { shop, code, hmac, host } = req.query;
  const client_id = process.env.SHOPIFY_API_KEY;
  const client_secret = process.env.SHOPIFY_API_SECRET;

  // HMAC verification
  if (!verifyHmac(req.query, client_secret)) {
    res.status(400).send("Invalid HMAC");
    return;
  }

  const tokenResponse = await fetch(
    `https://${shop}/admin/oauth/access_token`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id,
        client_secret,
        code,
      }),
    }
  );
  const tokenData = await tokenResponse.json();

  // For demo: just show the token (in production, store it securely)
  // res.status(200).json(tokenData);

  // Redirect to app UI with shop and host params
  res.writeHead(302, {
    Location: `/?shop=${shop}&host=${encodeURIComponent(host)}`,
  });
  res.end();
}
