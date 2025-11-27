import { Tag, Popconfirm, Space, Typography, Button } from "antd";
import {
  CheckOutlined,
  DeleteOutlined,
  CloseOutlined,
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
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        hoverable
        className="bg-gray-900/80 border border-gray-700 p-4"
      >
        <div className="flex justify-between items-start">
          <div>
            <Text strong className="text-white text-lg">
              {daily.title}
            </Text>

            {daily.notes && (
              <p className="text-gray-400 text-sm mt-1">{daily.notes}</p>
            )}

            <div className="mt-2 text-xs text-gray-400">
              Streak: {daily.streak} days
            </div>
          </div>

          <Space>
            {daily.completedToday ? (
              <Button
                type="default"
                icon={<CloseOutlined />}
                onClick={() =>
                  onUpdate(daily._id, { completedToday: false })
                }
              />
            ) : (
              <Button
                type="primary"
                icon={<CheckOutlined />}
                onClick={() =>
                  onUpdate(daily._id, {
                    completedToday: true,
                    streak: daily.streak + 1,
                  })
                }
              />
            )}

            <Popconfirm
              title="Delete daily?"
              okText="Yes"
              cancelText="No"
              onConfirm={() => onDelete(daily._id)}
            >
              <Button danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </Space>
        </div>
      </Card>
    </motion.div>
  );
};
