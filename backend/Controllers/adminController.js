const getAnalytics = async (req, res) => {
  res.json({ success: true, analytics: {} });
};

const getPopularCities = async (req, res) => {
  res.json({ success: true, cities: [] });
};

const getTripStats = async (req, res) => {
  res.json({ success: true, stats: {} });
};

const getUsers = async (req, res) => {
  res.json({ success: true, users: [] });
};

module.exports = {
  getAnalytics,
  getPopularCities,
  getTripStats,
  getUsers,
};