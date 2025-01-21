import express from "express";
import {
  bookAppointment,
  getAppointments,
} from "../controllers/bookController.js";

const router = express.Router();

router.post("/", bookAppointment);
router.get("/", getAppointments);

export default router;
