import { useEffect, useState } from "react";
import { getHabits, addHabit, updateHabit, deleteHabit } from "../api/habitApi";
import type { Habit } from "../types/Habit";
import AddHabitForm from "../components/AddHabitForm";
import HabitCard from "../components/HabitCard";

export default function Dashboard() {
  const [habits, setHabits] = useState<Habit[]>([]);

  useEffect(() => { getHabits().then(res => setHabits(res.data)); }, []);

  const handleAdd = (title: string) => {
    const newHabit = { title, streak: 0, datesCompleted: [] };
    addHabit(newHabit).then(res => setHabits([...habits, res.data]));
  };

  const handleComplete = (habit: Habit) => {
    const today = new Date().toISOString().split("T")[0];
    if (!habit.datesCompleted.includes(today)) {
      const updated = { ...habit, datesCompleted: [...habit.datesCompleted, today], streak: habit.streak + 1 };
      updateHabit(habit._id!, updated).then(res => {
        setHabits(habits.map(h => h._id === habit._id ? res.data : h));
      });
    }
  };

  const handleDelete = (id: string) => deleteHabit(id).then(() => setHabits(habits.filter(h => h._id !== id)));

  return (
    <div className="max-w-xl mx-auto mt-10">
      <AddHabitForm onAdd={handleAdd} />
      <div className="mt-4">
        {habits.map(h => (
          <HabitCard key={h._id} habit={h} onComplete={() => handleComplete(h)} onDelete={() => handleDelete(h._id!)} />
        ))}
      </div>
    </div>
  );
}
