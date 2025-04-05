import mongoose from "mongoose";

const userProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    hustlePeriod: {
      type: String,
      required: true,
    },
    lastJob: {
      type: String,
      required: true,
    },
    resignReason: {
      type: String,
      required: true,
    },
    roadmapLink: {
      type: String,
    },
  },
  { timestamps: true }
);

const Profile = mongoose.model("userProfile", userProfileSchema, "userProfiles");
export default Profile;
