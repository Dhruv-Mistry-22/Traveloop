const createShareLink = async (req, res) => {
  res.json({ success: true, link: "share-link" });
};

const viewSharedTrip = async (req, res) => {
  res.json({ success: true, trip: {} });
};

const copyTrip = async (req, res) => {
  res.json({ success: true, message: "Trip copied" });
};

module.exports = {
  createShareLink,
  viewSharedTrip,
  copyTrip,
};