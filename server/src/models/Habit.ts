import mongoose from "mongoose";

const habitSchema = new mongoose.Schema({
  title: { type: String, required: true },
  datesCompleted: { type: [String], default: [] },
  streak: { type: Number, default: 0 },
});

export default mongoose.model("Habit", habitSchema);
