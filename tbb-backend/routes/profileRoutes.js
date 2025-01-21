import { getProfile, updateProfile } from "../controllers/profileController.js";
import express from "express";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.put("/updateProfile", verifyToken, updateProfile);
router.get("/", getProfile);

export default router;
