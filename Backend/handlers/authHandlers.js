import User from "../data-model/User.js";
import { signToken } from "../utils/jwt.js";
import bcrypt from "bcryptjs";
import asyncHandler from "../utils/asyncHandler.js";

export const register = asyncHandler(async (req, res) => {

  const { name, email, password, githubUsername, leetcodeUsername} = req.body;
  if (!name || !email || !password || !githubUsername || !leetcodeUsername) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(409).json({ message: "Email already exists" });

  const existingGithubUser = await User.findOne({ githubUsername });
  if (existingGithubUser) return res.status(409).json({ message: "Github username already exists" });

  const existingLeetcodeUser = await User.findOne({ leetcodeUsername });
  if (existingLeetcodeUser) return res.status(409).json({ message: "Leetcode username already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);
  
  const user = await User.create({ ...req.body, password: hashedPassword });

  const token = signToken({ id: user._id });

  res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 1 * 24 * 60 * 60 * 1000, 
    })
    .status(201)
    .json({ message: "User registered successfully" });
});



export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Incorrect Password" });

  const token = signToken({ id: user._id });

  console.log("Login successful");
  res.cookie("token", token, {
      httpOnly: false,
      sameSite: "strict",
      maxAge: 1 * 24 * 60 * 60 * 1000,
    })
    .status(200)
    .json({ message: "Login successful" });
});

export const logout = asyncHandler(async (req, res) => {
 
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });
    res.status(200).json({ message: "Logged out successfully" });
  });
  
