import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  githubUsername: { type: String, unique: true },
  leetcodeUsername: {type: String, unique: true, },
  
}, { timestamps: true });


export default mongoose.model("User", UserSchema);
