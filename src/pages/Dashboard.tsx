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
  ThunderboltOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import type { Habit } from "../types/Habit";
import avatarImage from "../assets/avatar.png";
import { HabitsPage } from "./HabitsPage";

// Dummy data
const dummyHabits: Habit[] = [
  {
    _id: "1",
    title: "Morning Run",
    positive: true,
    counter: 5,
    difficulty: "medium",
    negative: false,
    datesCompleted: [
      new Date(Date.now() - 86400000).toISOString().split("T")[0],
      new Date(Date.now() - 2 * 86400000).toISOString().split("T")[0],
      new Date().toISOString().split("T")[0],
    ],
  },
  {
    _id: "2",
    title: "Read 10 pages",
    positive: true,
    counter: 3,
    negative: false,
    difficulty: "easy",
    datesCompleted: [
      new Date(Date.now() - 2 * 86400000).toISOString().split("T")[0],
      new Date().toISOString().split("T")[0],
    ],
  },
  {
    _id: "3",
    title: "No Sugar",
    positive: false,
    negative: true,
    counter: 7,
    difficulty: "hard",
    datesCompleted: [new Date().toISOString().split("T")[0]],
  },
];

const { Title } = Typography;

export const Dashboard = () => {
  const [habits, setHabits] = useState<Habit[]>(dummyHabits);
  const [loading] = useState(false);

  // --- CRUD operations ---
  // In Dashboard.tsx, update the function:
  const handleAddHabit = async (newHabit: {
    name: string;
    notes?: string;
    difficulty?: string;
  }) => {
    const newHabitWithId: Habit = {
      title: newHabit.name, // Map name to title if needed
      difficulty:"meduim",
      positive: false, // Default values
      negative: false, // Default values
      ...newHabit,
      _id: Date.now().toString(),
      counter: 0,
      datesCompleted: [],
      streak: 0,
    };
    setHabits((prev) => [...prev, newHabitWithId]);
    message.success("Habit added successfully!");
  };

  const handleUpdateHabit = async (id: string, updates: Partial<Habit>) => {
    setHabits((prev) =>
      prev.map((habit) => (habit._id === id ? { ...habit, ...updates } : habit))
    );
    message.success("Habit updated successfully!");
  };

  const handleDeleteHabit = async (id: string) => {
    setHabits((prev) => prev.filter((habit) => habit._id !== id));
    message.success("Habit deleted successfully!");
  };

  // --- Stats ---
  const completedToday = habits.filter((h) =>
    h.datesCompleted?.includes(new Date().toISOString().split("T")[0])
  ).length;

  const bestStreak =
    habits.length > 0 ? Math.max(...habits.map((h) => h.counter || 0)) : 0;

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
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
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
                    <Progress percent={20} strokeColor="#2ed573" size="small" showInfo={false} />
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
            <Title level={4} style={{ marginBottom: 30 }}>Quick Stats</Title>
            <Row gutter={16}>
              <Col xs={24} sm={8}>
                <Card
                  className="text-center"
                  style={{
                    borderRadius: 10,
                    background: "linear-gradient(135deg,#e0f7ff,#bae7ff)",
                  }}
                >
                  <Statistic
                    title="Coins"
                    value={120}
                    prefix={
                      <ThunderboltOutlined style={{ color: "#1677ff" }} />
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
                    title="Done Today"
                    value={completedToday}
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
                    background: "linear-gradient(135deg,#efdbff,#d3adf7)",
                  }}
                >
                  <Statistic
                    title="Best Streak"
                    value={bestStreak}
                    suffix="days"
                    prefix={<TrophyOutlined style={{ color: "#722ed1" }} />}
                  />
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      {/* HABITS PAGE (child) */}
      <HabitsPage
        habits={habits}
        onAddHabit={handleAddHabit}
        onUpdateHabit={handleUpdateHabit}
        onDeleteHabit={handleDeleteHabit}
        loading={loading}
      />
    </motion.div>
  );
};
