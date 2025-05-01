import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  period: {
    start: { type: Date, required: true },
    end: { type: Date, required: true },
  },
  type: {
    type: String,
    enum: ["upskilling", "project", "struggle", "win"],
    required: true,
  },
  media: { type: String, default: "" },
});

const TimelineSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, 
    },
    events: {
      type: [EventSchema],
      default: [],
    },
  },
  { timestamps: true }
);

const Timeline = mongoose.model("Timeline", TimelineSchema, "events");

export default Timeline;
