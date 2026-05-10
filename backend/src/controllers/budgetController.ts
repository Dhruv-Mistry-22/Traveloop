import { Response } from "express";
import { PrismaClient } from "@prisma/client";
import { AuthRequest } from "../middleware/auth";

const prisma = new PrismaClient();

export const addExpense = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.userId) return res.status(401).json({ error: "Unauthorized" });

    const { tripId, title, amount, category } = req.body;
    const expense = await prisma.expense.create({
      data: {
        userId: req.userId,
        tripId,
        title,
        amount: parseFloat(amount),
        category,
      },
    });

    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ error: "Failed to add expense" });
  }
};

export const getExpenses = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.userId) return res.status(401).json({ error: "Unauthorized" });

    const { tripId } = req.params;
    const expenses = await prisma.expense.findMany({
      where: { tripId, userId: req.userId },
    });

    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch expenses" });
  }
};

export const getBudgetSummary = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.userId) return res.status(401).json({ error: "Unauthorized" });

    const { tripId } = req.params;
    const trip = await prisma.trip.findUnique({
      where: { id: tripId },
      include: { expenses: true },
    });

    if (!trip || trip.userId !== req.userId) {
      return res.status(404).json({ error: "Trip not found" });
    }

    const totalExpense = trip.expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const remaining = trip.budget - totalExpense;

    res.json({
      budget: trip.budget,
      spent: totalExpense,
      remaining,
      percentage: ((totalExpense / trip.budget) * 100).toFixed(2),
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch budget summary" });
  }
};

export const deleteExpense = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.userId) return res.status(401).json({ error: "Unauthorized" });

    const { id } = req.params;
    const expense = await prisma.expense.findUnique({ where: { id } });

    if (!expense || expense.userId !== req.userId) {
      return res.status(404).json({ error: "Expense not found" });
    }

    await prisma.expense.delete({ where: { id } });
    res.json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete expense" });
  }
};
