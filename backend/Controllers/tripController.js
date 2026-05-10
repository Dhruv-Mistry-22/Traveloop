const createTrip = async (req, res) => {
  res.json({ success: true, message: "Trip created" });
};

const updateTrip = async (req, res) => {
  res.json({ success: true, message: "Trip updated" });
};

const deleteTrip = async (req, res) => {
  res.json({ success: true, message: "Trip deleted" });
};

const getTrips = async (req, res) => {
  res.json({ success: true, trips: [] });
};

const getSingleTrip = async (req, res) => {
  res.json({ success: true, trip: {} });
};

module.exports = {
  createTrip,
  updateTrip,
  deleteTrip,
  getTrips,
  getSingleTrip,
};