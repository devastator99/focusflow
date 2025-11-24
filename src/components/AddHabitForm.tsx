import { useState } from "react";

export default function AddHabitForm({ onAdd }: { onAdd: (title: string) => void }) {
  const [title, setTitle] = useState("");
  return (
    <form onSubmit={e => { e.preventDefault(); if (title) { onAdd(title); setTitle(""); } }}>
      <input className="border p-2 rounded mr-2" placeholder="New habit..." value={title} onChange={e => setTitle(e.target.value)} />
      <button className="bg-blue-500 text-white px-3 py-2 rounded">Add</button>
    </form>
  );
}
