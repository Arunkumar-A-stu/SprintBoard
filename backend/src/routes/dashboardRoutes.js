import express from "express";
import { getUserDashboard, getProductivity, getTaskBreakdown } from "../controllers/getUserDashboard.js";

const router = express.Router();

router.get("/dashboard", getUserDashboard);
router.get("/dashboard/productivity", getProductivity);
router.get("/dashboard/task-breakdown", getTaskBreakdown);

export default router;
