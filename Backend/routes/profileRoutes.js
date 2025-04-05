import express from "express";
import {getUserProfile,saveUserProfile} from "../handlers/profileHandlers.js";

const router = express.Router();

router.get("/" , getUserProfile);
router.post("/save" , saveUserProfile);

export default router;