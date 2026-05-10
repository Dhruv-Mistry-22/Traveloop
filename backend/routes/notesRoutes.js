const express = require("express");
const router = express.Router();
const {
  addNote,
  getNotes,
  deleteNote,
} = require("../Controllers/notesController");

router.post("/", addNote);
router.get("/", getNotes);
router.delete("/:id", deleteNote);

module.exports = router;
