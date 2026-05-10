const express = require("express");
const router = express.Router();
const {
  createTrip,
  updateTrip,
  deleteTrip,
  getTrips,
  getSingleTrip,
} = require("../Controllers/tripController");

router.get("/", getTrips);
router.post("/", createTrip);
router.get("/:id", getSingleTrip);
router.put("/:id", updateTrip);
router.delete("/:id", deleteTrip);

module.exports = router;
