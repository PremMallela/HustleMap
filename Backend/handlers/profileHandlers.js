import userProfile from "../data-model/UserProfiles.js";
import asyncHandler from "../utils/asyncHandler.js";
import axios from "axios";
import User from "../data-model/User.js";

export const getUserProfile = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const profile = await userProfile.findOne({ user: userId });

  if (!profile) {
    const err = new Error("Profile not found for this user.");
    err.status = 404;
    throw err;
  }

  res.status(200).json(profile);
});


export const saveUserProfile = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { hustlePeriod, lastJob, resignReason } = req.body;

  let profile = await userProfile.findOne({ user: userId });

  if (profile) {
    profile.hustlePeriod = hustlePeriod;
    profile.lastJob = lastJob;
    profile.resignReason = resignReason;

    await profile.save();
    return res.status(200).json({ message: "Profile updated", profile });
  } else {
    const newProfile = await userProfile.create({
      user: userId,
      hustlePeriod,
      lastJob,
      resignReason,
    });

    return res.status(201).json({ message: "Profile created", profile: newProfile });
  }
});


export const getGithubData = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const user = await User.findById(userId);

  const username = user.githubUsername;

  if (!username) {
     const err = new Error("GitHub username not found in profile.");
      err.status = 404;
      throw err;
 }

  const profileUrl = `https://api.github.com/users/${username}`;
  const reposUrl = `https://api.github.com/users/${username}/repos?per_page=100`;

  const [profileRes, reposRes] = await Promise.all([
    axios.get(profileUrl),
    axios.get(reposUrl),
  ]);

  console.log("✅ GitHub data fetched successfully.");
  const profile = profileRes.data;
  const repos = reposRes.data;

  const languageCount = {};
  repos.forEach(repo => {
    const lang = repo.language;
    if (lang) languageCount[lang] = (languageCount[lang] || 0) + 1;
  });

  console.log("✅ GitHub data fetched. Sending response...");
  res.status(200).json({
    profile: {
      avatar_url: profile.avatar_url,
      name: profile.name,
      bio: profile.bio,
      location: profile.location,
      public_repos: profile.public_repos,
      followers: profile.followers,
      following: profile.following,
      html_url: profile.html_url
    },
    topLanguages: languageCount,
    repoNames: repos.map(repo => ({
      name: repo.name,
      html_url: repo.html_url,
      stars: repo.stargazers_count,
      forks: repo.forks,
      language: repo.language
    }))
  });
});


export const getLeetcodeData = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const user = await User.findById(userId);
  if (!user || !user.leetcodeUsername) {
    return res.status(400).json({ message: 'Leetcode username not set for this user.' });
  }

  const leetcodeUsername = user.leetcodeUsername;

  try {
    const response = await axios.post('https://leetcode.com/graphql', {
      query: `
  query {
    matchedUser(username: "${leetcodeUsername}") {
      username
      profile {
        ranking
        realName
        userAvatar 
        countryName
      }
      submitStats: submitStatsGlobal {
        acSubmissionNum {
          difficulty
          count
        }
      }
    }
  }
`}, {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    res.status(200).json(response.data.data.matchedUser);
  } catch (error) {
    console.error("Leetcode API error:", error?.response?.data || error.message);
    res.status(500).json({ message: 'Failed to fetch LeetCode data' });
  }
});

