const addNote = async (req, res) => {
  res.json({ success: true, message: "Note added" });
};

const getNotes = async (req, res) => {
  res.json({ success: true, notes: [] });
};

const deleteNote = async (req, res) => {
  res.json({ success: true, message: "Note deleted" });
};

module.exports = {
  addNote,
  getNotes,
  deleteNote,
};