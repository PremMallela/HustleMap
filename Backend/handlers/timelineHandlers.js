import TimelineEvent from "../data-model/TimeLineEvent.js";
import asyncHandler from "../utils/asyncHandler.js";

// Get all timeline events
export const getTimelines = asyncHandler(async (req, res,next) => {
  const events = await TimelineEvent.find();-
  res.json(events);
});

// Get a specific event by ID
export const getTimelineById = asyncHandler(async (req, res) => {
  res.json(await TimelineEvent.findById(req.params.id));
});

// Create a new timeline event
export const createTimeline = asyncHandler(async (req, res) => {
  const {title, description, date } = req.body;
  console.log(req.userId, title, description, date);
  if (!userId || !title || !description || !date) {
    return res.status(400).json({ message: "Please fill all fields " });
  }

  const newEvent = await TimelineEvent.create({ 
    userId: req.userId, 
    title, 
    description, 
    date 
  });

  console.log("✅ Event Created:", newEvent);
  res.status(201).json(newEvent);
});

// Update an event
export const updateTimeline = asyncHandler(async (req, res) => {
  res.json(await TimelineEvent.findByIdAndUpdate(req.params.id, req.body, { new: true }));
});

// Delete an event
export const deleteTimeline = asyncHandler(async (req, res) => {
  await TimelineEvent.findByIdAndDelete(req.params.id);
  res.status(204).send();
});
