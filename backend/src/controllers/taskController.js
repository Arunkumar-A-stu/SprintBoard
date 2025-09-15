import Task from "../models/Task.js";
import Project from "../models/Project.js";
import User from "../models/User.js";

/** push notification helper */
const pushNotification = async ({ userId, message, projectId, taskId }) => {
  if (!userId) return;
  await User.findByIdAndUpdate(userId, {
    $push: { notifications: { message, project: projectId, task: taskId } }
  });
};

export const createTask = async (req, res) => {
  // req.io is available (attached in server)
  const io = req.io;
  const { title, description, project: projectId, assignee, dueDate, priority, order } = req.body;
  const project = await Project.findById(projectId);
  if (!project) return res.status(404).json({ message: "Project not found" });

  const task = await Task.create({ title, description, project: projectId, assignee, dueDate, priority, order });
  project.tasks.push(task._id);
  await project.save();

  if (assignee) {
    await pushNotification({
      userId: assignee,
      message: `Assigned to task "${task.title}" in project "${project.name}"`,
      projectId,
      taskId: task._id
    });
    if (io) io.to(String(assignee)).emit("notification", { message: `Assigned: ${task.title}`, task });
  }

  // broadcast task created to project room
  if (io) io.to(String(projectId)).emit("task:created", task);
  res.status(201).json(task);
};

export const updateTask = async (req, res) => {
  const io = req.io;
  const { taskId } = req.params;
  const updates = req.body;

  let task = await Task.findById(taskId);
  if (!task) return res.status(404).json({ message: "Task not found" });

  // Validate membership (load project to check members)
  const project = await Project.findById(task.project);
  if (!project) return res.status(404).json({ message: "Project not found" });

  const isMember = project.members.map(String).includes(String(req.user._id));
  const isCreator = String(project.createdBy) === String(req.user._id);
  if (!isMember && !isCreator) {
    return res.status(403).json({ message: "Forbidden: not a project member" });
  }

  const prevStatus = task.status;
  const prevAssignee = task.assignee ? String(task.assignee) : null;

  // apply updates
  Object.assign(task, updates);
  await task.save();

  // 🔹 if status changed, we notify frontend to move task between columns
  if (updates.status && updates.status !== prevStatus) {
    if (io) {
      io.to(String(task.project)).emit("task:statusChanged", {
        taskId: task._id,
        prevStatus,
        newStatus: task.status,
        task
      });
    }
  }

  // 🔹 notify if assignee changed
  if (updates.assignee && String(updates.assignee) !== prevAssignee) {
    await pushNotification({
      userId: updates.assignee,
      message: `Assigned to task "${task.title}"`,
      projectId: task.project,
      taskId: task._id
    });
    if (io) io.to(String(updates.assignee)).emit("notification", { message: `Assigned: ${task.title}`, task });
  }

  if (prevAssignee && updates.assignee && prevAssignee !== String(updates.assignee)) {
    await pushNotification({
      userId: prevAssignee,
      message: `Unassigned from task "${task.title}"`,
      projectId: task.project,
      taskId: task._id
    });
    if (io) io.to(prevAssignee).emit("notification", { message: `Unassigned: ${task.title}`, task });
  }

  // 🔹 always broadcast generic task update
  if (io) io.to(String(task.project)).emit("task:updated", task);

  res.json(task);
};


export const getTasksByProject = async (req, res) => {
  const { projectId } = req.params;
  const tasks = await Task.find({ project: projectId }).populate("assignee", "name email").lean();
  
  const grouped = {
    todo: [],
    inProgress: [],
    inReview: [],
    done: []
  };

  tasks.foeEach(task => {
    switch (task.status) {
      case "To Do":
        grouped.todo.push(task);
        break;
      case "In Progress":
        grouped.inProgress.push(task);
        break;
      case "In Review":
        grouped.inReview.push(task);
        break;
      case "Done":
        grouped.done.push(task);
        break;
      default:
        grouped.todo.push(task);
    }
  });
  
  res.json(grouped);
};
