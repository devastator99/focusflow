import { Card, Tag, Button } from "antd";
import type { Todo } from "../types/Todo";

export default function TodoItem({ todo, onComplete }: { todo: Todo; onComplete: () => void }) {
  return (
    <Card
      className="my-2"
      bordered={true}
      title={todo.title}
      extra={<Button type="primary" onClick={onComplete}>Complete</Button>}
    >
      <div className="flex gap-2 mb-2">
        <Tag color="blue">{todo.difficulty.toUpperCase()}</Tag>

        {todo.tags?.map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>

      {todo.dueDate && (
        <p className="text-gray-500">Due: {todo.dueDate}</p>
      )}
    </Card>
  );
}
