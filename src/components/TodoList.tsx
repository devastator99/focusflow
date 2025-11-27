import TodoItem from "./TodoItem";
import type { Todo } from "../types/Todo";

export default function TodoList({
  todos,
  onComplete,
}: {
  todos: Todo[];
  onComplete: (id: string) => void;
}) {
  return (
    <div>
      {todos.map((t) => (
        <TodoItem key={t.id} todo={t} onComplete={() => onComplete(t.id)} />
      ))}
    </div>
  );
}
