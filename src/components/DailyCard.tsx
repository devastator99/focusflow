import { Tag, Popconfirm, Space, Typography, Button, Tooltip, Badge } from "antd";
import {
  CheckOutlined,
  DeleteOutlined,
  CloseOutlined,
  FireOutlined,
  CalendarOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import { Card } from "./Card";
import type { Daily } from "../types/Daily";

const { Text } = Typography;

export const DailyCard = ({
  daily,
  onUpdate,
  onDelete,
}: {
  daily: Daily;
  onUpdate: (id: string, updates: Partial<Daily>) => void;
  onDelete: (id: string) => void;
}) => {
  const getStreakColor = (streak: number) => {
    if (streak >= 30) return "#ff4d4f";
    if (streak >= 14) return "#fa8c16";
    if (streak >= 7) return "#fadb14";
    if (streak >= 3) return "#52c41a";
    return "#1890ff";
  };

  const getStreakLevel = (streak: number) => {
    if (streak >= 30) return "Legendary";
    if (streak >= 14) return "Expert";
    if (streak >= 7) return "Pro";
    if (streak >= 3) return "Rising";
    return "Beginner";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ 
        duration: 0.4, 
        ease: "easeOut",
        layout: { duration: 0.3 }
      }}
      whileHover={{ y: -2, scale: 1.02 }}
      layout
    >
      <Card
        hoverable
        className={`
          relative overflow-hidden transition-all duration-300
          ${daily.completedToday 
            ? 'bg-gradient-to-br from-green-900/40 to-emerald-900/40 border-green-700/50 shadow-lg shadow-green-900/20' 
            : 'bg-gradient-to-br from-gray-900/90 to-gray-800/90 border-gray-700/70 shadow-lg'
          }
          p-5 hover:shadow-xl
        `}
      >
        {/* Streak indicator background */}
        {daily.streak > 0 && (
          <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
            <FireOutlined 
              style={{ 
                fontSize: '80px', 
                color: getStreakColor(daily.streak),
                transform: 'rotate(15deg)'
              }} 
            />
          </div>
        )}

        <div className="flex justify-between items-start relative z-10">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Text 
                strong 
                className={`
                  text-lg transition-colors duration-300
                  ${daily.completedToday ? 'text-green-400' : 'text-white'}
                `}
              >
                {daily.title}
              </Text>
              {daily.completedToday && (
                <Badge 
                  status="success" 
                  text="Completed" 
                  className="text-green-400"
                />
              )}
            </div>

            {daily.notes && (
              <p className="text-gray-400 text-sm mt-2 mb-3 line-clamp-2">
                {daily.notes}
              </p>
            )}

            {/* Streak section */}
            <div className="flex items-center gap-4 mt-3">
              <div className="flex items-center gap-2">
                <FireOutlined 
                  style={{ 
                    color: getStreakColor(daily.streak),
                    fontSize: '16px'
                  }} 
                />
                <span 
                  className="text-sm font-medium"
                  style={{ color: getStreakColor(daily.streak) }}
                >
                  {daily.streak} day streak
                </span>
                {daily.streak >= 3 && (
                  <Tag 
                    color={getStreakColor(daily.streak)}
                    className="text-xs px-2 py-0.5"
                  >
                    {getStreakLevel(daily.streak)}
                  </Tag>
                )}
              </div>
            </div>

            {/* Progress indicator */}
            {daily.streak > 0 && (
              <div className="mt-3 flex items-center gap-2">
                <div className="flex-1 bg-gray-700/50 rounded-full h-1.5 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: getStreakColor(daily.streak) }}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(daily.streak * 3, 100)}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </div>
                <span className="text-xs text-gray-500">
                  {Math.min(daily.streak * 3, 100)}%
                </span>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2 ml-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {daily.completedToday ? (
                <Tooltip title="Mark as incomplete">
                  <Button
                    type="default"
                    icon={<CloseOutlined />}
                    onClick={() =>
                      onUpdate(daily._id, { completedToday: false })
                    }
                    className="bg-gray-700/50 border-gray-600 hover:bg-gray-600/50"
                  />
                </Tooltip>
              ) : (
                <Tooltip title="Complete today's task">
                  <Button
                    type="primary"
                    icon={<CheckOutlined />}
                    onClick={() =>
                      onUpdate(daily._id, {
                        completedToday: true,
                        streak: daily.streak + 1,
                      })
                    }
                    className="bg-green-600 hover:bg-green-500 border-green-500"
                  />
                </Tooltip>
              )}
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Popconfirm
                title="Delete this daily task?"
                description="This action cannot be undone."
                okText="Delete"
                cancelText="Cancel"
                okButtonProps={{ danger: true }}
                onConfirm={() => onDelete(daily._id)}
              >
                <Tooltip title="Delete task">
                  <Button 
                    danger 
                    icon={<DeleteOutlined />} 
                    className="bg-red-900/30 border-red-800/50 hover:bg-red-900/50"
                  />
                </Tooltip>
              </Popconfirm>
            </motion.div>
          </div>
        </div>

        {/* Achievement badges */}
        {daily.streak >= 7 && (
          <div className="absolute top-2 left-2 flex gap-1">
            {daily.streak >= 30 && (
              <Tooltip title="Legendary Streak (30+ days)">
                <TrophyOutlined className="text-yellow-500 text-xs" />
              </Tooltip>
            )}
            {daily.streak >= 14 && daily.streak < 30 && (
              <Tooltip title="Expert Streak (14+ days)">
                <TrophyOutlined className="text-orange-500 text-xs" />
              </Tooltip>
            )}
            {daily.streak >= 7 && daily.streak < 14 && (
              <Tooltip title="Pro Streak (7+ days)">
                <TrophyOutlined className="text-green-500 text-xs" />
              </Tooltip>
            )}
          </div>
        )}
      </Card>
    </motion.div>
  );
};
