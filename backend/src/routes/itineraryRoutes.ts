import { Router } from "express";
import {
  addStop,
  getStops,
  addActivity,
  updateActivity,
  deleteActivity,
} from "../controllers/itineraryController";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.post("/stops", authMiddleware, addStop);
router.get("/stops/:tripId", getStops);
router.post("/activities", authMiddleware, addActivity);
router.put("/activities/:id", authMiddleware, updateActivity);
router.delete("/activities/:id", authMiddleware, deleteActivity);

export default router;
