import { useState } from "react";
import { HabitsPage } from "./HabitsPage";
import type { Habit } from "../types/Habit";

export const HabitsContainer = () => {
  const [habits, setHabits] = useState<Habit[]>([
    {
      _id: "1",
      title: "Drink Water",
      notes: "Stay hydrated",
      counter: 5,
      positive: true, // Added missing required property
      negative: false, // Added missing required property
      difficulty: "medium", // Added missing required property
    },
    {
      _id: "2",
      title: "Meditate",
      notes: "5 minutes meditation",
      counter: 12,
      positive: true, // Added missing required property
      negative: false, // Added missing required property
      difficulty: "medium", // Added missing required property
    },
  ]);

  const handleAddHabit = (habit: {
    name: string;
    notes?: string;
    difficulty?: string;
  }) => {
    setHabits((prev) => [
      ...prev,
      {
        _id: String(Date.now()),
        title: habit.name,
        notes: habit.notes,
        difficulty: habit.difficulty || "medium",
        counter: 0,
        positive: true, // Default to true for new habits
        negative: false, // Default to false for new habits
      },
    ]);
  };

  const handleUpdateHabit = (id: string, updates: Partial<Habit>) => {
    setHabits((prev) =>
      prev.map((h) => (h._id === id ? { ...h, ...updates } : h))
    );
  };

  const handleDeleteHabit = (id: string) => {
    setHabits((prev) => prev.filter((h) => h._id !== id));
  };

  return (
    <HabitsPage
      habits={habits}
      onAddHabit={handleAddHabit}
      onUpdateHabit={handleUpdateHabit}
      onDeleteHabit={handleDeleteHabit}
    />
  );
};
