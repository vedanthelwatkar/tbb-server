import { Router } from "express";
import { updateStatus, getStatus } from "../controllers/statusController.js";

const router = Router();

router.put("/", updateStatus);
router.get("/", getStatus);

export default router;
