export default function handler(req, res) {
  const shop = req.query.shop;
  const client_id = process.env.SHOPIFY_API_KEY;
  const redirect_uri = `https://${req.headers.host}/api/auth/callback`;
  const scopes = "read_orders";
  const installUrl = `https://${shop}/admin/oauth/authorize?client_id=${client_id}&scope=${scopes}&redirect_uri=${encodeURIComponent(
    redirect_uri
  )}`;
  res.writeHead(302, { Location: installUrl });
  res.end();
}
