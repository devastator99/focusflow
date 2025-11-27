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
import dummyDailies from "../dummy/dummyDailies";
import DailiesPage from "./DailiesPage";
import type { Daily } from "../types/Daily";

const { Title } = Typography;

type CreateDailyInput = {
  title: string;
  notes?: string;
  difficulty: "easy" | "medium" | "hard";
  days: Daily['days'];
};

export const DashboardDailies = () => {
  const [dailies, setDailies] = useState<Daily[]>(dummyDailies);
  const [loading] = useState(false);

  const handleAddDaily = (
    newDaily: CreateDailyInput
  ) => {
    setDailies((prev) => [
      ...prev,
      {
        ...newDaily,
        _id: Date.now().toString(),
        completedToday: false,
        streak: 0,
        days: {
          mon: false,
          tue: false,
          wed: false,
          thu: false,
          fri: false,
          sat: false,
          sun: false,
        },
      } as Daily,
    ]);
  };

  const handleUpdateDaily = (
    id: string,
    updates: Partial<Omit<Daily, "_id">>
  ) => {
    setDailies((prev) =>
      prev.map((d) => (d._id === id ? { ...d, ...updates } : d))
    );
  };

  const handleDeleteDaily = (id: string) => {
    setDailies((prev) => prev.filter((d) => d._id !== id));
  };


  // --- Stats ---
  const completedToday = dailies.filter((d) => d.completedToday).length;
  const bestStreak =
    dailies.length > 0 ? Math.max(...dailies.map((d) => d.streak || 0)) : 0;

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

      {/* Dailies PAGE (child) */}
      <DailiesPage
        dailies={dummyDailies}
        onAddDaily={handleAddDaily}
        onUpdateDaily={handleUpdateDaily}
        onDeleteDaily={handleDeleteDaily}
      />
    </motion.div>
  );
};
