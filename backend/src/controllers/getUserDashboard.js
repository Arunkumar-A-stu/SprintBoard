import Project from "../models/Project.js";
import Task from "../models/Task.js";

export const getUserDashboard = async (req, res) => {
  try {
    const userId = req.user._id; 


    const projectCount = await Project.countDocuments({
      $or: [
        { createdBy: userId },
        { members: userId }
      ]
    });


    const userTasks = await Task.find({ assignee: userId });

    const totalTasks = userTasks.length;


    const tasksDone = userTasks.filter(t => t.status === "Done").length;


    const now = new Date();
    const overdueTasks = userTasks.filter(t => t.dueDate && new Date(t.dueDate) < now).length;

    res.json({
      projectCount,
      totalTasks,
      tasksDone,
      overdueTasks
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// GET /api/dashboard/task-breakdown
export const getTaskBreakdown = async (req, res) => {
  const userId = req.user._id;

  const tasks = await Task.find({ assignee: userId });

  const breakdown = {
    todo: 0,
    inProgress: 0,
    inReview: 0,
    done: 0
  };

  tasks.forEach(task => {
    switch (task.status) {
      case "To Do":
        breakdown.todo++;
        break;
      case "In Progress":
        breakdown.inProgress++;
        break;
      case "In Review":
        breakdown.inReview++;
        break;
      case "Done":
        breakdown.done++;
        break;
    }
  });

  res.json(breakdown);
};

// GET /api/dashboard/productivity
export const getProductivity = async (req, res) => {
  const userId = req.user._id;

  // tasks completed by user in last 7 days
  const tasks = await Task.aggregate([
    { $match: { assignee: userId, status: "Done" } },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$updatedAt" } },
        count: { $sum: 1 }
      }
    },
    { $sort: { _id: 1 } }
  ]);

  res.json(tasks);
};


