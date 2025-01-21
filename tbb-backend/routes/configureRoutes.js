import express from "express";
import {
  deleteDetails,
  getAllDetails,
  getDetails,
  updateDetails,
} from "../controllers/configureController.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.get("/details", verifyToken, getDetails);
router.get("/allDetails", getAllDetails);
router.delete("/remove", verifyToken, deleteDetails);
router.put("/update", verifyToken, updateDetails);

export default router;
