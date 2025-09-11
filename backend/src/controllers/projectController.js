import Project from "../models/Project.js";
import User from "../models/User.js";

export const createProject = async (req, res) => {
  const { name, description, members = [] } = req.body;
  const createdBy = req.user._id;

  const project = await Project.create({ name, description, createdBy, members: [createdBy, ...members] });

  // add project reference to members
  await User.updateMany(
    { _id: { $in: project.members } },
    { $addToSet: { projects: project._id } }
  );

  res.status(201).json(project);
};

export const getProjectsForUser = async (req, res) => {
  const userId = req.user._id;
  const projects = await Project.find({ members: userId })
    .populate("createdBy", "name email")
    .populate("members", "name email")
    .lean();
  res.json(projects);
};

export const addMember = async (req, res) => {
  const { projectId } = req.params;
  const { userId } = req.body;

  const project = await Project.findById(projectId);
  if (!project) return res.status(404).json({ message: "Project not found" });

  if (!project.members.includes(userId)) {
    project.members.push(userId);
    await project.save();
    await User.findByIdAndUpdate(userId, { $addToSet: { projects: projectId } });
  }

  res.json({ message: "Member added", project });
};
