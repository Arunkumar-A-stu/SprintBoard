import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
  assignee: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: { type: String, enum: ["To Do", "In Progress", "In Review", "Done"], default: "To Do" },
  priority: { type: String, enum: ["Low", "Normal", "High", "Urgent"], default: "Normal" },
  dueDate: Date,
  progress: { type: Number, default: 0 },
  order: { type: Number, default: 0 }, // for Kanban drag/drop
}, { timestamps: true });

export default mongoose.model("Task", taskSchema);
