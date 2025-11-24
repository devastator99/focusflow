import express from "express";
import Habit from "../models/Habit.js";

const router = express.Router();

// GET all habits
router.get("/", async (_, res) => res.json(await Habit.find()));

// POST create habit
router.post("/", async (req, res) => {
  const habit = await Habit.create(req.body);
  res.json(habit);
});

// PATCH update habit
router.patch("/:id", async (req, res) => {
  const habit = await Habit.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(habit);
});

// DELETE habit
router.delete("/:id", async (req, res) => {
  await Habit.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

export default router;
