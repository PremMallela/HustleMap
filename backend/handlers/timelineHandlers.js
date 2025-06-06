import Timeline from "../models/TimeLineEvent.js";
import asyncHandler from "../utils/asyncHandler.js";


// Get a timeline
export const getTimeline = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  res.json(await Timeline.findOne({userId}));
});

// Create & update a timeline event
export const upsertEvents = asyncHandler(async (req, res) => {
  const events = req.body.events;  
  const userId = req.user.id;

  if (!events || events.length === 0) {
    return res.status(400).json({ message: "No events provided" });
  }

  //Validate every event
  for (const event of events) {
    const { title, description, period, type } = event;

    if (!title || !description || !period?.start || !period?.end || !type) {
      return res.status(400).json({ message: "Please fill all fields in each event" });
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
  }

  try {
    const existingTimeline = await Timeline.findOne({ userId });

    if (existingTimeline) {
      existingTimeline.events = events;
      await existingTimeline.save();
      return res.status(201).json({ message: "Events updated" });
    } else {
      await Timeline.create({
        userId,
        events,
      });
      return res.status(201).json({ message: "Events created" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error upserting the events" });
  }
});

