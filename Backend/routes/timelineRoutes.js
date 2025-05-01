import express from "express";
import {
  getTimeline,
  upsertEvents,
  deleteEvent
} from "../handlers/timelineHandlers.js";

const router = express.Router();

router.get("/", getTimeline); // Get all timelines
router.post("/", upsertEvents); 
router.delete("/", deleteEvent); // Delete timeline

export default router;


