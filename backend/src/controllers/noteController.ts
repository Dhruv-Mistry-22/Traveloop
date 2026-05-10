import { Response } from "express";
import { PrismaClient } from "@prisma/client";
import { AuthRequest } from "../middleware/auth";

const prisma = new PrismaClient();

export const addNote = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.userId) return res.status(401).json({ error: "Unauthorized" });

    const { tripId, title, content, day } = req.body;
    const note = await prisma.note.create({
      data: {
        userId: req.userId,
        tripId,
        title,
        content,
        ...(day && { day }),
      },
    });

    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ error: "Failed to add note" });
  }
};

export const getNotes = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.userId) return res.status(401).json({ error: "Unauthorized" });

    const { tripId } = req.params;
    const notes = await prisma.note.findMany({
      where: { tripId, userId: req.userId },
      orderBy: { createdAt: "desc" },
    });

    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch notes" });
  }
};

export const updateNote = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.userId) return res.status(401).json({ error: "Unauthorized" });

    const { id } = req.params;
    const { title, content, day } = req.body;

    const note = await prisma.note.findUnique({ where: { id } });
    if (!note || note.userId !== req.userId) {
      return res.status(404).json({ error: "Note not found" });
    }

    const updatedNote = await prisma.note.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(content && { content }),
        ...(day && { day }),
      },
    });

    res.json(updatedNote);
  } catch (error) {
    res.status(500).json({ error: "Failed to update note" });
  }
};

export const deleteNote = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.userId) return res.status(401).json({ error: "Unauthorized" });

    const { id } = req.params;
    const note = await prisma.note.findUnique({ where: { id } });

    if (!note || note.userId !== req.userId) {
      return res.status(404).json({ error: "Note not found" });
    }

    await prisma.note.delete({ where: { id } });
    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete note" });
  }
};
