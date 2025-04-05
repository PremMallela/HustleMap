import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./utils/db.js";
import cookieParser from "cookie-parser";
import timelineRoutes from "./routes/timelineRoutes.js";
import errorHandler from "./middleware/errorMiddleware.js";
import authRoutes from "./routes/authRoutes.js";
import { authorize } from "./middleware/authMiddleware.js";
import profileRoutes from "./routes/profileRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors({credentials: true, origin: "http://localhost:5173"}));
app.use(express.json());

app.use(cookieParser());

app.use(morgan("dev"));

app.use("/api/users", authRoutes);

app.use("/api/timeline",authorize, timelineRoutes);

app.use("/api/profile",authorize ,profileRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
