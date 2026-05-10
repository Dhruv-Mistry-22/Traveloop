import { Response } from "express";
import { PrismaClient } from "@prisma/client";
import { AuthRequest } from "../middleware/auth";

const prisma = new PrismaClient();

export const createChecklist = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.userId) return res.status(401).json({ error: "Unauthorized" });

    const { tripId } = req.body;
    const checklist = await prisma.packingChecklist.create({
      data: {
        userId: req.userId,
        tripId,
      },
      include: { items: true },
    });

    res.status(201).json(checklist);
  } catch (error) {
    res.status(500).json({ error: "Failed to create checklist" });
  }
};

export const addChecklistItem = async (req: AuthRequest, res: Response) => {
  try {
    const { checklistId, title, category, quantity } = req.body;
    const item = await prisma.checklistItem.create({
      data: {
        checklistId,
        title,
        category,
        quantity: quantity || 1,
      },
    });

    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: "Failed to add checklist item" });
  }
};

export const updateChecklistItem = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { isPacked, quantity } = req.body;

    const item = await prisma.checklistItem.update({
      where: { id },
      data: {
        ...(isPacked !== undefined && { isPacked }),
        ...(quantity && { quantity }),
      },
    });

    res.json(item);
  } catch (error) {
    res.status(500).json({ error: "Failed to update checklist item" });
  }
};

export const deleteChecklistItem = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.checklistItem.delete({ where: { id } });
    res.json({ message: "Checklist item deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete checklist item" });
  }
};

export const getChecklist = async (req: AuthRequest, res: Response) => {
  try {
    const { tripId } = req.params;
    const checklist = await prisma.packingChecklist.findFirst({
      where: { tripId },
      include: { items: true },
    });

    res.json(checklist || { message: "No checklist found" });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch checklist" });
  }
};
