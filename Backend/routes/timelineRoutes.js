import express from "express";
import {
  getTimeline,
  upsertEvents,
} from "../handlers/timelineHandlers.js";

const router = express.Router();

router.get("/", getTimeline); // Get all timelinevents
router.post("/", upsertEvents); 

export default router;


