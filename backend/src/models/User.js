import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  message: String,
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
  task: { type: mongoose.Schema.Types.ObjectId, ref: "Task" },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["projectHead", "member"], default: "member" },
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
    notifications: [notificationSchema]
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
