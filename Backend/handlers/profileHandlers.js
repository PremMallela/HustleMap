import userProfile from "../data-model/UserProfiles.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getUserProfile = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const profile = await userProfile.findOne({ user: userId });

  if (!profile) {
    res.status(404).json({ message: "Profile not found" });
  }

  res.status(200).json(profile);
});


export const saveUserProfile = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { hustlePeriod, lastJob, resignReason, roadmapLink } = req.body;

  let profile = await userProfile.findOne({ user: userId });

  if (profile) {
    // Update existing profile
    profile.hustlePeriod = hustlePeriod;
    profile.lastJob = lastJob;
    profile.resignReason = resignReason;
    profile.roadmapLink = roadmapLink;

    await profile.save();
    return res.status(200).json({ message: "Profile updated", profile });
  } else {
    // Create new profile
    const newProfile = await userProfile.create({
      user: userId,
      hustlePeriod,
      lastJob,
      resignReason,
      roadmapLink,
    });

    return res.status(201).json({ message: "Profile created", profile: newProfile });
  }
});




