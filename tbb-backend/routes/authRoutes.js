import express from "express";
import { signin, signup } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", signin);

router.get("/", (req, res) => {
  res.send("Connected Successfully");
});

export default router;
