import express from "express";
import { updateBranding } from "../controllers/brandingController.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.put("/updateBranding", verifyToken, updateBranding);

export default router;
