const express = require("express");
const router = express.Router();
const {
  addStop,
  addDate,
  reorderStops,
  addActivity,
} = require("../Controllers/itineraryController");

router.post("/stop", addStop);
router.post("/date", addDate);
router.put("/reorder", reorderStops);
router.post("/activity", addActivity);

module.exports = router;
