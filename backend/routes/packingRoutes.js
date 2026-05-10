const express = require("express");
const router = express.Router();
const {
  addItem,
  markPacked,
  getChecklist,
} = require("../Controllers/packingController");

router.post("/", addItem);
router.put("/:id/pack", markPacked);
router.get("/", getChecklist);

module.exports = router;
