import { Response } from "express";
import { PrismaClient } from "@prisma/client";
import { AuthRequest } from "../middleware/auth";

const prisma = new PrismaClient();

export const getSavedDestinations = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.userId) return res.status(401).json({ error: "Unauthorized" });

    const destinations = await prisma.savedDestination.findMany({
      where: { userId: req.userId },
    });

    res.json(destinations);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch saved destinations" });
  }
};

export const addSavedDestination = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.userId) return res.status(401).json({ error: "Unauthorized" });

    const { city, country, latitude, longitude, costIndex } = req.body;
    const destination = await prisma.savedDestination.create({
      data: {
        userId: req.userId,
        city,
        country,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        ...(costIndex && { costIndex: parseFloat(costIndex) }),
      },
    });

    res.status(201).json(destination);
  } catch (error) {
    res.status(500).json({ error: "Failed to save destination" });
  }
};

export const removeSavedDestination = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.userId) return res.status(401).json({ error: "Unauthorized" });

    const { id } = req.params;
    const destination = await prisma.savedDestination.findUnique({ where: { id } });

    if (!destination || destination.userId !== req.userId) {
      return res.status(404).json({ error: "Destination not found" });
    }

    await prisma.savedDestination.delete({ where: { id } });
    res.json({ message: "Destination removed successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to remove destination" });
  }
};

export const getPreferences = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.userId) return res.status(401).json({ error: "Unauthorized" });

    let preferences = await prisma.userPreference.findUnique({
      where: { userId: req.userId },
    });

    if (!preferences) {
      preferences = await prisma.userPreference.create({
        data: { userId: req.userId },
      });
    }

    res.json(preferences);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch preferences" });
  }
};

export const updatePreferences = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.userId) return res.status(401).json({ error: "Unauthorized" });

    const { preferredCurrency, preferredLanguage, theme } = req.body;

    let preferences = await prisma.userPreference.findUnique({
      where: { userId: req.userId },
    });

    if (!preferences) {
      preferences = await prisma.userPreference.create({
        data: { userId: req.userId },
      });
    }

    const updated = await prisma.userPreference.update({
      where: { userId: req.userId },
      data: {
        ...(preferredCurrency && { preferredCurrency }),
        ...(preferredLanguage && { preferredLanguage }),
        ...(theme && { theme }),
      },
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Failed to update preferences" });
  }
};
