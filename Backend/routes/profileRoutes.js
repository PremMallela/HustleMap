import express from "express";
import {getUserProfile,saveUserProfile,getGithubData,getLeetcodeData} from "../handlers/profileHandlers.js";

const router = express.Router();

router.get("/" , getUserProfile);
router.post("/save" , saveUserProfile);
router.get("/github", getGithubData);
router.get("/leetcode", getLeetcodeData);

export default router;