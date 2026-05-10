const getRecentTrips = async (req, res) => {
  res.json({ success: true, trips: [] });
};

const getRecommendations = async (req, res) => {
  res.json({ success: true, destinations: [] });
};

const getBudgetOverview = async (req, res) => {
  res.json({ success: true, budget: {} });
};

module.exports = {
  getRecentTrips,
  getRecommendations,
  getBudgetOverview,
};