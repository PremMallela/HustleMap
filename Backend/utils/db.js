import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI,{ dbName: "career_gap_db"});
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1); // Stop the server if DB connection fails
  }
};

export default connectDB;

