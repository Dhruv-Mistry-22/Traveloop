const addItem = async (req, res) => {
  res.json({ success: true, message: "Item added" });
};

const markPacked = async (req, res) => {
  res.json({ success: true, message: "Item packed" });
};

const getChecklist = async (req, res) => {
  res.json({ success: true, checklist: [] });
};

module.exports = {
  addItem,
  markPacked,
  getChecklist,
};