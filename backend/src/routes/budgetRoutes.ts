import { Router } from "express";
import {
  addExpense,
  getExpenses,
  getBudgetSummary,
  deleteExpense,
} from "../controllers/budgetController";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.post("/", authMiddleware, addExpense);
router.get("/:tripId", authMiddleware, getExpenses);
router.get("/:tripId/summary", authMiddleware, getBudgetSummary);
router.delete("/:id", authMiddleware, deleteExpense);

export default router;
