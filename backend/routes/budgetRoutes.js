const express = require("express");
const router = express.Router();
const {
  addExpense,
  budgetOverview,
  budgetCharts,
} = require("../Controllers/budgetController");

router.post("/", addExpense);
router.get("/overview", budgetOverview);
router.get("/charts", budgetCharts);

module.exports = router;
