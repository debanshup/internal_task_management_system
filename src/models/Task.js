import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Task name
  description: { type: String, required: true }, // Task description
  status: {
    type: String,
    required: true,
    enum: ["pending", "in-progress", "completed"],
    default: "pending",
  }, // Task status
  assignee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }, // Reference to the user assigned
  assignedAt: { type: Date, required: true, default: Date.now }, // Timestamp for task assignment
  deadline: { type: Date, required: true }, // Deadline for the task
  createdAt: { type: Date, default: Date.now }, // Timestamp for task creation
  updatedAt: { type: Date, default: Date.now }, // Timestamp for task updates
});

export default mongoose.models.Task || mongoose.model("Task", TaskSchema);
