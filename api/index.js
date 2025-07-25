export default function handler(req, res) {
  const { shop } = req.query;
  if (shop) {
    // Start OAuth flow
    res.writeHead(302, { Location: `/api/auth?shop=${shop}` });
    res.end();
  } else {
    res
      .status(200)
      .send("Shopify Kickstarter App is running. No frontend installed API.");
  }
}
