const getProfile = async (req, res) => {
  res.json({ success: true, profile: {} });
};

const updateProfile = async (req, res) => {
  res.json({ success: true, message: "Profile updated" });
};

const getSavedDestinations = async (req, res) => {
  res.json({ success: true, destinations: [] });
};

module.exports = {
  getProfile,
  updateProfile,
  getSavedDestinations,
};