import { Button } from "antd";
import { useState } from "react";
import AddTodoModal from "../components/AddTodoModal";
import TodoList from "../components/TodoList";
import type { Todo } from "../types/Todo";

export default function TodoPage() {
  const [open, setOpen] = useState(false);

  const [todos, setTodos] = useState<Todo[]>([
    { id: "1", title: "Finish project", difficulty: "hard", tags: ["work"], dueDate: "2025-01-18" }
  ]);

  const handleAdd = (todo: any) => {
    setTodos([...todos, { id: Date.now().toString(), ...todo }]);
  };

  const handleComplete = (id: string) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  return (
    <div className="p-4">
      <Button type="primary" onClick={() => setOpen(true)}>Add To-Do</Button>

      <AddTodoModal open={open} onClose={() => setOpen(false)} onSubmit={handleAdd} />

      <div className="mt-4">
        <TodoList todos={todos} onComplete={handleComplete} />
      </div>
    </div>
  );
}
