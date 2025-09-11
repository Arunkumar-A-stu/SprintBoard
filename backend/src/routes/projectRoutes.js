import express from "express";
import { createProject, getProjectsForUser, addMember } from "../controllers/projectController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";
import { checkProjectMember } from "../middleware/projectMiddleware.js";

const router = express.Router();

router.post("/", protect, createProject);
router.get("/", protect, getProjectsForUser);
router.post("/:projectId/add-member", protect, checkProjectMember, authorizeRoles("projectHead"), addMember);

export default router;
