import { Response } from "express";
import { PrismaClient } from "@prisma/client";
import { AuthRequest } from "../middleware/auth";

const prisma = new PrismaClient();

export const addStop = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.userId) return res.status(401).json({ error: "Unauthorized" });

    const { tripId, city, country, order, startDate, endDate } = req.body;
    const stop = await prisma.stop.create({
      data: {
        tripId,
        city,
        country,
        order,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      },
    });

    res.status(201).json(stop);
  } catch (error) {
    res.status(500).json({ error: "Failed to add stop" });
  }
};

export const getStops = async (req: AuthRequest, res: Response) => {
  try {
    const { tripId } = req.params;
    const stops = await prisma.stop.findMany({
      where: { tripId },
      include: { activities: true },
    });

    res.json(stops);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch stops" });
  }
};

export const addActivity = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.userId) return res.status(401).json({ error: "Unauthorized" });

    const { stopId, title, description, category, cost, duration, startTime, address } = req.body;
    const activity = await prisma.activity.create({
      data: {
        stopId,
        title,
        description,
        category,
        cost: parseFloat(cost),
        duration,
        ...(startTime && { startTime: new Date(startTime) }),
        ...(address && { address }),
      },
    });

    res.status(201).json(activity);
  } catch (error) {
    res.status(500).json({ error: "Failed to add activity" });
  }
};

export const updateActivity = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, category, cost, duration, startTime, address } = req.body;

    const activity = await prisma.activity.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(description && { description }),
        ...(category && { category }),
        ...(cost && { cost: parseFloat(cost) }),
        ...(duration && { duration }),
        ...(startTime && { startTime: new Date(startTime) }),
        ...(address && { address }),
      },
    });

    res.json(activity);
  } catch (error) {
    res.status(500).json({ error: "Failed to update activity" });
  }
};

export const deleteActivity = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.activity.delete({ where: { id } });
    res.json({ message: "Activity deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete activity" });
  }
};
