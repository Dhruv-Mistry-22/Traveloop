import { Response } from "express";
import { PrismaClient } from "@prisma/client";
import { AuthRequest } from "../middleware/auth";
import crypto from "crypto";

const prisma = new PrismaClient();

export const createSharedLink = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.userId) return res.status(401).json({ error: "Unauthorized" });

    const { tripId } = req.body;
    const trip = await prisma.trip.findUnique({ where: { id: tripId } });

    if (!trip || trip.userId !== req.userId) {
      return res.status(404).json({ error: "Trip not found" });
    }

    const token = crypto.randomBytes(32).toString("hex");
    const sharedLink = await prisma.sharedLink.create({
      data: {
        tripId,
        token,
      },
    });

    res.status(201).json({
      ...sharedLink,
      shareUrl: `/shared/${token}`,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to create shared link" });
  }
};

export const getSharedTrip = async (req: AuthRequest, res: Response) => {
  try {
    const { token } = req.params;
    const sharedLink = await prisma.sharedLink.findUnique({
      where: { token },
      include: {
        trip: {
          include: {
            stops: { include: { activities: true } },
            expenses: true,
            notes: true,
          },
        },
      },
    });

    if (!sharedLink) {
      return res.status(404).json({ error: "Shared link not found" });
    }

    if (sharedLink.expiresAt && new Date() > sharedLink.expiresAt) {
      return res.status(410).json({ error: "Link expired" });
    }

    res.json(sharedLink.trip);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch shared trip" });
  }
};

export const deleteSharedLink = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.userId) return res.status(401).json({ error: "Unauthorized" });

    const { id } = req.params;
    const sharedLink = await prisma.sharedLink.findUnique({
      where: { id },
      include: { trip: true },
    });

    if (!sharedLink || sharedLink.trip.userId !== req.userId) {
      return res.status(404).json({ error: "Link not found" });
    }

    await prisma.sharedLink.delete({ where: { id } });
    res.json({ message: "Shared link deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete shared link" });
  }
};

export const getMySharedLinks = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.userId) return res.status(401).json({ error: "Unauthorized" });

    const links = await prisma.sharedLink.findMany({
      where: { trip: { userId: req.userId } },
      include: { trip: true },
    });

    res.json(links);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch shared links" });
  }
};
