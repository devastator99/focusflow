import { useState } from "react";
import {
  Avatar,
  Card,
  Progress,
  Statistic,
  Row,
  Col,
  Typography,
  message,
} from "antd";
import {
  FireOutlined,
  TrophyOutlined,
  CheckCircleOutlined,
  CheckSquareOutlined,
  ClockCircleOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import type { Todo } from "../types/Todo";
import avatarImage from "../assets/avatar.png";
import TodoPage from "../components/TodoPage";
import { v4 as uuidv4 } from "uuid";
import { dummyTodos } from "../dummy/dummyTodos";

const { Title } = Typography;

type TodoStats = {
  total: number;
  completed: number;
  pending: number;
  completionRate: number;
};

export const TodoDash = () => {
  const [todos, setTodos] = useState<Todo[]>(dummyTodos);
  const [loading] = useState(false);

  const handleAddTodo = (newTodo: Omit<Todo, "id" | "completed">) => {
    setTodos((prev) => [
      ...prev,
      { ...newTodo, id: uuidv4(), completed: false },
    ]);
  };

  const handleCompleteTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDeleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  // Calculate stats
  const completedCount = todos.filter((t) => t.completed).length;
  const pendingCount = todos.length - completedCount;
  const completionRate =
    todos.length > 0 ? Math.round((completedCount / todos.length) * 100) : 0;

  const stats: TodoStats = {
    total: todos.length,
    completed: completedCount,
    pending: pendingCount,
    completionRate: completionRate,
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <motion.div
      className="w-full max-w-[2000px] mx-auto p-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* HEADER */}
      <Row gutter={[16, 16]} className="mb-6">
        {/* Player Summary */}
        <Col xs={24} md={10}>
          <Card
            hoverable
            style={{
              borderRadius: 12,
              boxShadow: "0 4px 12px rgba(208, 6, 6, 0.1)",
              height: "100%",
            }}
          >
            <div className="flex items-center gap-4">
              <Avatar
                size={100}
                src={avatarImage}
                style={{
                  border: "2px solid #b9de00ff",
                  borderRadius: "50%",
                  backgroundColor: "transparent",
                  padding: 4,
                }}
              />
              <div className="w-full">
                <Title level={4}>Your Adventurer</Title>
                <div className="mt-3 space-y-1">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Health</span>
                      <span>70%</span>
                    </div>
                    <Progress
                      percent={70}
                      strokeColor="#ff4757"
                      status="active"
                      size="small"
                      showInfo={false}
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>XP</span>
                      <span>40%</span>
                    </div>
                    <Progress
                      percent={40}
                      strokeColor="#287ff1ff"
                      status="active"
                      size="small"
                      showInfo={false}
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Level</span>
                      <span>20%</span>
                    </div>
                    <Progress
                      percent={20}
                      strokeColor="#2ed573"
                      size="small"
                      showInfo={false}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </Col>

        {/* Quick Stats */}
        <Col xs={24} md={14}>
          <Card
            style={{
              borderRadius: 12,
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              height: "100%",
            }}
          >
            <Title level={4} style={{ marginBottom: 30 }}>
              Quick Stats
            </Title>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={8}>
                <Card
                  className="text-center"
                  style={{
                    borderRadius: 10,
                    background: "linear-gradient(135deg,#e0f7ff,#bae7ff)",
                  }}
                >
                  <Statistic
                    title="Total Tasks"
                    value={stats.total}
                    prefix={
                      <CheckSquareOutlined style={{ color: "#1677ff" }} />
                    }
                  />
                </Card>
              </Col>

              <Col xs={24} sm={8}>
                <Card
                  className="text-center"
                  style={{
                    borderRadius: 10,
                    background: "linear-gradient(135deg,#d9f7be,#b7eb8f)",
                  }}
                >
                  <Statistic
                    title="Completed"
                    value={stats.completed}
                    suffix={`/ ${stats.total}`}
                    prefix={
                      <CheckCircleOutlined style={{ color: "#52c41a" }} />
                    }
                  />
                </Card>
              </Col>

              <Col xs={24} sm={8}>
                <Card
                  className="text-center"
                  style={{
                    borderRadius: 10,
                    background: "linear-gradient(135deg,#fff7e6,#ffe7ba)",
                  }}
                >
                  <Statistic
                    title="Completion"
                    value={stats.completionRate}
                    suffix="%"
                    prefix={<StarOutlined style={{ color: "#fa8c16" }} />}
                  />
                </Card>
              </Col>

              <Col xs={24}>
                <Card
                  className="text-center"
                  style={{
                    borderRadius: 10,
                    background: "linear-gradient(135deg,#f6ffed,#f4ffeb",
                  }}
                >
                  <Progress
                    percent={stats.completionRate}
                    status={stats.completionRate === 100 ? "success" : "active"}
                    format={() => `${stats.pending} tasks remaining`}
                  />
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      {/* Todo List */}
      <div className="mt-8">
        <TodoPage />
      </div>
    </motion.div>
  );
};
