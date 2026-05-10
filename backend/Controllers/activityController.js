const addActivity = async (req, res) => {
  res.json({ success: true, message: "Activity added" });
};

const getActivities = async (req, res) => {
  res.json({ success: true, activities: [] });
};

const updateActivity = async (req, res) => {
  res.json({ success: true, message: "Activity updated" });
};

const deleteActivity = async (req, res) => {
  res.json({ success: true, message: "Activity deleted" });
};

module.exports = {
  addActivity,
  getActivities,
  updateActivity,
  deleteActivity,
};