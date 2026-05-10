const express = require("express");
const router = express.Router();
const {
  getAnalytics,
  getPopularCities,
  getTripStats,
  getUsers,
} = require("../Controllers/adminController");

router.get("/analytics", getAnalytics);
router.get("/popular-cities", getPopularCities);
router.get("/trip-stats", getTripStats);
router.get("/users", getUsers);

module.exports = router;
