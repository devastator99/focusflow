// src/components/HabitCard.tsx
import {
  Tag,
  Tooltip,
  Popconfirm,
  Space,
  Typography,
  Button,
  Divider,
} from "antd";
import {
  DeleteOutlined,
  FireFilled,
  ThunderboltFilled,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import { Card } from "./Card";
import { DIFFICULTY_LEVELS } from "../constants/habits";
import React from "react";

const { Text } = Typography;

interface HabitCardProps {
  id: string;
  habit: {
    name: string;
    notes?: string;
    difficulty?: "easy" | "medium" | "hard";
    counter?: number;
    strength?: "weak" | "strong";
  };
  onDelete: (id: string) => void;
  onIncrement: () => void;
  onDecrement: () => void;
}

const HabitCard = ({
  id,
  habit: { name, notes, difficulty = "medium", counter = 0, strength = "weak" },
  onDelete,
  onIncrement,
  onDecrement,
}: HabitCardProps) => {
  const { color, gradient } = DIFFICULTY_LEVELS[difficulty] || DIFFICULTY_LEVELS.medium;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, type: "spring" }}
      data-testid="habit-card"
    >
      <Card
        hoverable
        className={`transition-all duration-300 bg-gray-900/80 border border-gray-700 hover:border-${color}-400`}
        aria-label={`Habit: ${name}`}
      >
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <Space align="center" size="small">
                <Text strong className="text-lg text-white">
                  {name}
                </Text>
                <Tag color={color}>{difficulty}</Tag>
              </Space>

              {notes && (
                <Text type="secondary" className="text-gray-400">
                  {notes}
                </Text>
              )}

              <div className="flex items-center gap-3 text-xs text-gray-400 mt-2">
                <span>
                  <FireFilled style={{ color: "#fa8c16" }} /> {counter} days
                </span>
                {strength === "strong" && (
                  <span className="flex items-center gap-1 text-green-400">
                    <ThunderboltFilled /> Strong habit
                  </span>
                )}
              </div>
            </div>

            <Popconfirm
              title="Delete this habit?"
              okText="Yes"
              cancelText="No"
              onConfirm={() => onDelete(id)}
            >
              <Tooltip title="Delete habit">
                <Button
                  className="text-red-400 hover:text-black-500 transition-all duration-200"
                  style={{ background: "white" }}
                  variant="outlined"
                  size="large"
                  aria-label={`Delete ${name}`}
                  icon={<DeleteOutlined />}
                />
              </Tooltip>
            </Popconfirm>
          </div>

          <Divider style={{ margin: "8px 0", background: "#333" }} />

          <div className="flex justify-between items-center mt-1">
            <div className="flex gap-2">
              <Tooltip title="Decrease counter">
                <Button
                  icon={<MinusCircleOutlined />}
                  shape="circle"
                  size="small"
                  type="text"
                  onClick={onDecrement}
                  disabled={counter <= 0}
                  className="hover:text-red-400 text-gray-400 transition-all"
                  aria-label={`Decrease counter for ${name}`}
                />
              </Tooltip>
              <Tooltip title="Increase counter">
                <Button
                  icon={<PlusCircleOutlined />}
                  shape="circle"
                  size="small"
                  type="text"
                  onClick={onIncrement}
                  className="hover:text-green-400 text-gray-400 transition-all"
                  aria-label={`Increase counter for ${name}`}
                />
              </Tooltip>
            </div>

            <span
              className={`text-sm bg-gradient-to-r ${gradient} text-black font-semibold px-3 py-0.5 rounded-full`}
            >
              {counter} XP
            </span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default React.memo(HabitCard);