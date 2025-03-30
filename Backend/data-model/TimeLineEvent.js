import mongoose from "mongoose";

const TimelineEventSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
    title: { type: String, required: true },
    date: { type: Date, required: true },
    description: { type: String, required: true },
    media: { type: String }, 
  },
  { timestamps: true }
);

export default mongoose.model("TimelineEvent", TimelineEventSchema);
