import { useState, useCallback } from "react";
import { message } from "antd";
import { HabitsPage } from "./HabitsPage";
import type { Habit } from "../types/Habit";

type Difficulty = "easy" | "medium" | "hard";
// Import Difficulty type from Habit
type HabitInput = Omit<Habit, '_id' | 'id' | 'createdAt' | 'updatedAt'>;

// Default values for new habits
const DEFAULT_HABIT_VALUES = {
  counter: 0,
  positive: true,
  negative: false,
  difficulty: "medium" as const,
};

export const HabitsContainer = () => {
  const [habits, setHabits] = useState<Habit[]>([
    {
      _id: "1",
      title: "Drink Water",
      notes: "Stay hydrated",
      counter: 5,
      positive: true,
      negative: false,
      difficulty: "medium",
      createdAt: new Date().toISOString(),
    },
    {
      _id: "2",
      title: "Meditate",
      notes: "5 minutes meditation",
      counter: 12,
      positive: true,
      negative: false,
      difficulty: "medium",
      createdAt: new Date().toISOString(),
    },
  ]);

  const handleAddHabit = useCallback(async (habit: HabitInput) => {
    try {
      const newHabit: Habit = {
        _id: Date.now().toString(),
        title: habit.name,
        notes: habit.notes,
        counter: 0,
        positive: habit.positive ?? DEFAULT_HABIT_VALUES.positive,
        negative: habit.negative ?? DEFAULT_HABIT_VALUES.negative,
        difficulty: habit.difficulty ?? DEFAULT_HABIT_VALUES.difficulty,
        createdAt: new Date().toISOString(),
      };

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setHabits(prev => [...prev, newHabit]);
      message.success('Habit added successfully!');
    } catch (error) {
      console.error('Error adding habit:', error);
      message.error('Failed to add habit');
    }
  }, []);

  const handleUpdateHabit = useCallback(async (id: string, updates: Partial<Habit>) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setHabits(prev =>
        prev.map((h) => (h._id === id ? { ...h, ...updates, updatedAt: new Date().toISOString() } : h))
      );
      message.success('Habit updated successfully!');
    } catch (error) {
      console.error('Error updating habit:', error);
      message.error('Failed to update habit');
    }
  }, []);

  const handleDeleteHabit = useCallback(async (id: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setHabits(prev => {
        const newHabits = prev.filter((h) => h._id !== id);
        if (newHabits.length === prev.length) {
          throw new Error('Habit not found');
        }
        return newHabits;
      });
      message.success('Habit deleted successfully!');
    } catch (error) {
      console.error('Error deleting habit:', error);
      message.error('Failed to delete habit');
    }
  }, []);

  return (
    <HabitsPage
      habits={habits}
      onAddHabit={handleAddHabit}
      onUpdateHabit={handleUpdateHabit}
      onDeleteHabit={handleDeleteHabit}
    />
  );
};