// components/HabitCard.tsx
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

const { Text } = Typography;

interface HabitCardProps {
  id: string;
  name: string;
  notes?: string;
  strength: "weak" | "strong";
  difficulty?: "easy" | "medium" | "hard";
  counter?: number;
  onDelete: (id: string) => void;
  onIncrement?: (id: string) => void;
  onDecrement?: (id: string) => void;
}

export const HabitCard = ({
  id,
  name,
  notes,
  strength,
  difficulty = "medium",
  counter = 0,
  onDelete,
  onIncrement,
  onDecrement,
}: HabitCardProps) => {
  // --- Difficulty Color Map ---
  const getDifficultyColor = () => {
    switch (difficulty) {
      case "easy":
        return { color: "green", gradient: "from-green-500 to-green-300" };
      case "medium":
        return { color: "gold", gradient: "from-yellow-500 to-yellow-300" };
      case "hard":
        return { color: "red", gradient: "from-red-500 to-pink-400" };
      default:
        return { color: "blue", gradient: "from-blue-500 to-cyan-400" };
    }
  };

  const { color, gradient } = getDifficultyColor();

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, type: "spring" }}
    >
      <Card
        hoverable
        className={`transition-all duration-300 bg-gray-900/80 border border-gray-700 hover:border-${color}-400`}
      >
        <div className="flex flex-col gap-2">
          {/* --- Header Row --- */}
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

            {/* --- Delete Button --- */}
            <Popconfirm
              title="Delete this habit?"
              okText="Yes"
              cancelText="No"
              onConfirm={() => onDelete(id)}
            >
              <Tooltip title="Delete habit" >
                <Button
                  className="text-red-400 hover:text-black-500 transition-all duration-200"
                  style={{background: "white"}}
                  variant="outlined"
                  size="large"
                  aria-label={`Delete ${name}`}
                >
                  <DeleteOutlined />
                </Button>
              </Tooltip>
            </Popconfirm>
          </div>

          <Divider style={{ margin: "8px 0", background: "#333" }} />

          {/* --- Counter Buttons --- */}
          <div className="flex justify-between items-center mt-1">
            <div className="flex gap-2">
              <Tooltip title="Decrease counter">
                <Button
                  icon={<MinusCircleOutlined />}
                  shape="circle"
                  size="small"
                  type="text"
                  onClick={() => onDecrement?.(id)}
                  disabled={counter <= 0}
                  className="hover:text-red-400 text-gray-400 transition-all"
                />
              </Tooltip>
              <Tooltip title="Increase counter">
                <Button
                  icon={<PlusCircleOutlined />}
                  shape="circle"
                  size="small"
                  type="text"
                  onClick={() => onIncrement?.(id)}
                  className="hover:text-green-400 text-gray-400 transition-all"
                />
              </Tooltip>
            </div>

            {/* --- Progress Display --- */}
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
