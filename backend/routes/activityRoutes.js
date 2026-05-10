const express = require("express");
const router = express.Router();
const {
  addActivity,
  getActivities,
  updateActivity,
  deleteActivity,
} = require("../Controllers/activityController");

router.post("/", addActivity);
router.get("/", getActivities);
router.put("/:id", updateActivity);
router.delete("/:id", deleteActivity);

module.exports = router;
