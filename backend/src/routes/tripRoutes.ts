import { Router } from "express";
import { createTrip, getTrips, getTripById, updateTrip, deleteTrip } from "../controllers/tripController";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.post("/", authMiddleware, createTrip);
router.get("/", authMiddleware, getTrips);
router.get("/:id", authMiddleware, getTripById);
router.put("/:id", authMiddleware, updateTrip);
router.delete("/:id", authMiddleware, deleteTrip);

export default router;
