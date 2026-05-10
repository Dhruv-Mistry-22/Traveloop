import { Response } from "express";
import { PrismaClient } from "@prisma/client";
import { AuthRequest } from "../middleware/auth";

const prisma = new PrismaClient();

export const createTrip = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.userId) return res.status(401).json({ error: "Unauthorized" });

    const { title, description, startDate, endDate, budget } = req.body;
    const trip = await prisma.trip.create({
      data: {
        userId: req.userId,
        title,
        description,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        budget: budget || 0,
      },
    });

    res.status(201).json(trip);
  } catch (error) {
    res.status(500).json({ error: "Failed to create trip" });
  }
};

export const getTrips = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.userId) return res.status(401).json({ error: "Unauthorized" });

    const trips = await prisma.trip.findMany({
      where: { userId: req.userId },
      include: { stops: true },
    });

    res.json(trips);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch trips" });
  }
};

export const getTripById = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.userId) return res.status(401).json({ error: "Unauthorized" });

    const { id } = req.params;
    const trip = await prisma.trip.findUnique({
      where: { id },
      include: { stops: { include: { activities: true } }, expenses: true, notes: true },
    });

    if (!trip || trip.userId !== req.userId) {
      return res.status(404).json({ error: "Trip not found" });
    }

    res.json(trip);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch trip" });
  }
};

export const updateTrip = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.userId) return res.status(401).json({ error: "Unauthorized" });

    const { id } = req.params;
    const { title, description, startDate, endDate, budget } = req.body;

    const trip = await prisma.trip.findUnique({ where: { id } });
    if (!trip || trip.userId !== req.userId) {
      return res.status(404).json({ error: "Trip not found" });
    }

    const updatedTrip = await prisma.trip.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(description && { description }),
        ...(startDate && { startDate: new Date(startDate) }),
        ...(endDate && { endDate: new Date(endDate) }),
        ...(budget && { budget }),
      },
    });

    res.json(updatedTrip);
  } catch (error) {
    res.status(500).json({ error: "Failed to update trip" });
  }
};

export const deleteTrip = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.userId) return res.status(401).json({ error: "Unauthorized" });

    const { id } = req.params;
    const trip = await prisma.trip.findUnique({ where: { id } });
    if (!trip || trip.userId !== req.userId) {
      return res.status(404).json({ error: "Trip not found" });
    }

    await prisma.trip.delete({ where: { id } });
    res.json({ message: "Trip deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete trip" });
  }
};
