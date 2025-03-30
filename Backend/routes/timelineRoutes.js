import express from "express";
import {
  getTimelines,
  getTimelineById,
  createTimeline,
  updateTimeline,
  deleteTimeline
} from "../handlers/timelineHandlers.js";

const router = express.Router();

router.get("/", getTimelines); // Get all timelines
router.get("/:id", getTimelineById); // Get single timeline by ID
router.post("/", createTimeline); // Create new timeline
router.put("/:id", updateTimeline); // Update timeline
router.delete("/:id", deleteTimeline); // Delete timeline

export default router;


