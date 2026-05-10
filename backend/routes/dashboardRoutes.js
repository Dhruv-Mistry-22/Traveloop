const express = require("express");

const {
  getRecentTrips,
  getRecommendations,
  getBudgetOverview,
} = require("../controllers/dashboardController");

const router = express.Router();

// Dashboard routes
router.get("/recent-trips", getRecentTrips);
router.get("/recommendations", getRecommendations);
router.get("/budget-overview", getBudgetOverview);

module.exports = router;