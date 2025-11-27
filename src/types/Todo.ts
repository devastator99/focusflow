export interface Todo {
  id: string;
  title: string;
  difficulty: "easy" | "medium" | "hard";
  tags?: string[];
  dueDate?: string;
  completed?: boolean;
}