import express from "express";
import { createTask, updateTask, getTasksByProject } from "../controllers/taskController.js";
import { protect } from "../middleware/authMiddleware.js";
import { checkProjectMember } from "../middleware/projectMiddleware.js";

const router = express.Router();

// create (controller uses req.io)
router.post("/", protect, checkProjectMember,createTask);

// update
router.put("/:taskId", protect, updateTask);

// list by project
router.get("/project/:projectId", protect, checkProjectMember, getTasksByProject);

export default router;
