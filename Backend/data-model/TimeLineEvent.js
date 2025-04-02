import mongoose from "mongoose";

const TimelineEventSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
    title: { type: String, required: true },
    period: {
      start: { type: Date, required: true },
      end: { type: Date, required: true }
    },
    description: { type: String, required: true },
    media: { type: String }, 
  },
  { timestamps: true }
);

const TimelineEvent = mongoose.model("TimelineEvent", TimelineEventSchema,"timelineEvents");
export default TimelineEvent;
