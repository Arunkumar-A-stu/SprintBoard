import Project from "../models/Project.js";

export const checkProjectMember = async (req, res, next) => {
  try {
    const projectId = req.params.projectId || req.body.project;
    if (!projectId) {
      return res.status(400).json({ message: "Project ID missing" });
    }

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // check if current user is in project.members OR createdBy
    const isMember = project.members.map(String).includes(String(req.user._id));
    const isCreator = String(project.createdBy) === String(req.user._id);

    if (!isMember && !isCreator) {
      return res.status(403).json({ message: "Forbidden: not a project member" });
    }

    // attach project to request (optional, so we don’t re-fetch later)
    req.project = project;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error in project membership check" });
  }
};
