import { Tag, Button, Tooltip, Badge } from "antd";
import { CheckCircle2, Clock, Tag as TagIcon, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import type { Todo } from "../types/Todo";
import { Card } from "./Card";

interface TodoItemProps {
  todo: Todo;
  onComplete: () => void;
  onDelete?: () => void;
  onEdit?: () => void;
}

export default function TodoItem({
  todo,
  onComplete,
  onDelete,
  onEdit,
}: TodoItemProps) {
  const isOverdue =
    todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed;
  const difficultyColor = {
    easy: "green",
    medium: "orange",
    hard: "red",
  }[todo.difficulty];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        className={`my-2 ${todo.completed ? "opacity-60" : ""}`}
        bordered={true}
      >
        <div className="flex justify-between items-start mb-3">
          <h3
            className={`text-lg font-semibold ${
              todo.completed ? "line-through text-gray-400" : "text-white"
            }`}
          >
            {todo.title}
          </h3>
          <div className="flex gap-2">
            {onEdit && (
              <Tooltip title="Edit todo">
                <Button size="small" onClick={onEdit}>
                  Edit
                </Button>
              </Tooltip>
            )}
            {onDelete && (
              <Tooltip title="Delete todo">
                <Button size="small" danger onClick={onDelete}>
                  Delete
                </Button>
              </Tooltip>
            )}
            <Tooltip
              title={todo.completed ? "Mark as incomplete" : "Mark as complete"}
            >
              <Button
                type="primary"
                icon={<CheckCircle2 size={16} />}
                onClick={onComplete}
                className={todo.completed ? "bg-gray-500" : ""}
              >
                {todo.completed ? "Undo" : "Complete"}
              </Button>
            </Tooltip>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          <Badge color={difficultyColor} text={todo.difficulty.toUpperCase()} />

          {todo.tags && todo.tags.length > 0 && (
            <div className="flex items-center gap-1">
              <TagIcon size={14} className="text-gray-400" />
              {todo.tags.map((tag) => (
                <Tag key={tag} color="blue">
                  {tag}
                </Tag>
              ))}
            </div>
          )}
        </div>

        {todo.dueDate && (
          <div
            className={`flex items-center gap-2 text-sm ${
              isOverdue ? "text-red-400" : "text-gray-400"
            }`}
          >
            <Calendar size={14} />
            <span>Due: {new Date(todo.dueDate).toLocaleDateString()}</span>
            {isOverdue && <Badge status="error" text="Overdue" />}
          </div>
        )}

        {todo.completed && (
          <div className="mt-2">
            <Badge status="success" text="Completed" />
          </div>
        )}
      </Card>
    </motion.div>
  );
}
