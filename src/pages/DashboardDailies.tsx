import { useState, useMemo, useCallback } from "react";
import { Avatar, Card, Progress, Statistic, Row, Col, Typography, message, Skeleton } from "antd";
import { FireOutlined, TrophyOutlined, ThunderboltOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import type { Daily } from "../types/Daily";
import DailiesPage from "./DailiesPage";
import avatarImage from "../assets/avatar.png";
import dummyDailies from "../dummy/dummyDailies";

const { Title } = Typography;

// Types
type CreateDailyInput = Omit<Daily, "_id" | "completedToday" | "streak">;

// Constants
const STATS_CARD_STYLES = {
  borderRadius: 10,
  height: '100%',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 16px rgba(0,0,0,0.1)'
  }
};

export const DashboardDailies = () => {
  const [dailies, setDailies] = useState<Daily[]>(dummyDailies);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Memoized calculations
  const { completedToday, bestStreak, completionRate } = useMemo(() => {
    const completed = dailies.filter((d) => d.completedToday).length;
    const best = dailies.length > 0 ? Math.max(...dailies.map((d) => d.streak || 0)) : 0;
    const rate = dailies.length > 0 ? Math.round((completed / dailies.length) * 100) : 0;
    
    return { completedToday: completed, bestStreak: best, completionRate: rate };
  }, [dailies]);

  const handleAddDaily = useCallback(async (newDaily: CreateDailyInput) => {
    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setDailies(prev => [
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
      message.success('Daily task added successfully!');
    } catch (err) {
      setError('Failed to add daily task');
      message.error('Failed to add daily task');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleUpdateDaily = useCallback(async (id: string, updates: Partial<Omit<Daily, "_id">>) => {
    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setDailies(prev =>
        prev.map((d) => (d._id === id ? { ...d, ...updates } : d))
      );
    } catch (err) {
      setError('Failed to update daily task');
      message.error('Failed to update task');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleDeleteDaily = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setDailies(prev => prev.filter((d) => d._id !== id));
      message.success('Task deleted successfully');
    } catch (err) {
      setError('Failed to delete task');
      message.error('Failed to delete task');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Loading state
  if (isLoading && dailies.length === 0) {
    return (
      <div className="p-6">
        <Skeleton active paragraph={{ rows: 8 }} />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500">{error}</p>
        <button 
          onClick={() => setError(null)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <motion.div
      className="w-full max-w-[2000px] mx-auto p-4 md:p-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Stats Section */}
      <Row gutter={[16, 16]} className="mb-6">
        {/* Player Summary */}
        <Col xs={24} md={10}>
          <Card
            hoverable
            className="h-full"
            style={{
              ...STATS_CARD_STYLES,
              background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
            }}
          >
            <div className="flex flex-col md:flex-row items-center gap-4">
              <Avatar
                size={100}
                src={avatarImage}
                className="border-2 border-green-400 p-1"
              />
              <div className="w-full">
                <Title level={4} className="text-white">Your Adventurer</Title>
                <div className="mt-3 space-y-2">
                  <Statistic
                    title={<span className="text-gray-300">Completion Rate</span>}
                    value={completionRate}
                    suffix="%"
                    className="text-white"
                  />
                  <Progress
                    percent={completionRate}
                    strokeColor="#4ade80"
                    status="active"
                    showInfo={false}
                    className="mb-4"
                  />
                </div>
              </div>
            </div>
          </Card>
        </Col>

        {/* Quick Stats */}
        <Col xs={24} md={14}>
          <Card
            className="h-full"
            style={{
              ...STATS_CARD_STYLES,
              background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
            }}
          >
            <Title level={4} className="text-white mb-6">Daily Stats</Title>
            <Row gutter={[16, 16]}>
              {[
                {
                  title: "Active Streak",
                  value: bestStreak,
                  icon: <FireOutlined className="text-orange-400" />,
                  color: "#ff7e5f"
                },
                {
                  title: "Completed Today",
                  value: completedToday,
                  icon: <CheckCircleOutlined className="text-green-400" />,
                  color: "#4ade80"
                },
                {
                  title: "Total Tasks",
                  value: dailies.length,
                  icon: <TrophyOutlined className="text-yellow-400" />,
                  color: "#facc15"
                }
              ].map((stat) => (
                <Col xs={24} sm={8} key={stat.title}>
                  <Card
                    className="text-center h-full"
                    style={{
                      background: `linear-gradient(135deg, ${stat.color}33, ${stat.color}11)`,
                      border: `1px solid ${stat.color}33`,
                      ...STATS_CARD_STYLES
                    }}
                  >
                    <Statistic
                      title={<span className="text-gray-300">{stat.title}</span>}
                      value={stat.value}
                      prefix={stat.icon}
                      valueStyle={{ color: 'white' }}
                    />
                  </Card>
                </Col>
              ))}
            </Row>
          </Card>
        </Col>
      </Row>

      {/* Dailies List */}
      <DailiesPage
        dailies={dailies}
        onAddDaily={handleAddDaily}
        onUpdateDaily={handleUpdateDaily}
        onDeleteDaily={handleDeleteDaily}
        loading={isLoading}
      />
    </motion.div>
  );
};