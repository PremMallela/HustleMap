import User from "../data-model/User.js";
import { signToken } from "../utils/jwt.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).json({ message: "Email already exists" });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({...req.body, password: hashedPassword});

  const token = signToken({ id: user._id });

  res.status(201).json({ token });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if(!user) return res.status(401).json({ message: "email address not registered" });
  
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });


  const token = signToken({ id: user._id });
  res.json({ token });
};
