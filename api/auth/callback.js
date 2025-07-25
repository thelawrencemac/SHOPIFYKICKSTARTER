import fetch from "node-fetch";

export default async function handler(req, res) {
  const { shop, code } = req.query;
  const client_id = process.env.SHOPIFY_API_KEY;
  const client_secret = process.env.SHOPIFY_API_SECRET;

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
  res.status(200).json(tokenData);
}
