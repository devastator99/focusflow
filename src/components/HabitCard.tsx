import type { Habit } from "../types/Habit";

export default function HabitCard({ habit, onComplete, onDelete }: {
  habit: Habit; onComplete: () => void; onDelete: () => void;
}) {
  return (
    <div className="bg-white shadow-md rounded p-4 flex justify-between items-center mb-2">
      <div>
        <h3 className="font-semibold">{habit.title}</h3>
        <p className="text-sm text-gray-500">🔥 Streak: {habit.streak}</p>
      </div>
      <div className="space-x-2">
        <button onClick={onComplete} className="bg-green-500 text-white px-2 py-1 rounded">Done</button>
        <button onClick={onDelete} className="bg-red-500 text-white px-2 py-1 rounded">X</button>
      </div>
    </div>
  );
}
