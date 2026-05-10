const addStop = async (req, res) => {
  res.json({ success: true, message: "Stop added" });
};

const addDate = async (req, res) => {
  res.json({ success: true, message: "Date added" });
};

const reorderStops = async (req, res) => {
  res.json({ success: true, message: "Stops reordered" });
};

const addActivity = async (req, res) => {
  res.json({ success: true, message: "Activity added" });
};

module.exports = {
  addStop,
  addDate,
  reorderStops,
  addActivity,
};