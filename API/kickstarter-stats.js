// api/kickstarter-stats.js
//test
export default function handler(req, res) {
  // TODO: Replace with real data from Shopify API
  res.status(200).json({
    raised: 721682,
    goal: 25000,
    backers: 5188,
    end_date: "2025-08-01",
  });
}
