const addExpense = async (req, res) => {
  res.json({ success: true, message: "Expense added" });
};

const budgetOverview = async (req, res) => {
  res.json({ success: true, budget: {} });
};

const budgetCharts = async (req, res) => {
  res.json({ success: true, charts: [] });
};

module.exports = {
  addExpense,
  budgetOverview,
  budgetCharts,
};