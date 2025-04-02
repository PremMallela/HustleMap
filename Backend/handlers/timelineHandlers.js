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
  const {title, description, period } = req.body;
  const userId = req.user.id;

  if (!userId || !title || !description || !period?.start || !period?.end) {
    return res.status(400).json({ message: "Please fill all fields " });
  }

  const startDate = new Date(period.start);
    const endDate = new Date(period.end);
    const today = new Date();

    if (startDate > today || endDate > today) {
      return res.status(400).json({ message: "Period dates cannot be in the future" });
    }

    if (startDate > endDate) {
      return res.status(400).json({ message: "Start date must be before end date" });
    }

    const newEvent = await TimelineEvent.create({
      userId,
      title,
      description,
      period: { start: startDate, end: endDate }
    });

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
