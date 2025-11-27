import { useState } from "react";
import {
  Button,
  Card,
  Empty,
  Space,
  Tooltip,
  Typography,
  FloatButton,
} from "antd";
import { motion, AnimatePresence } from "framer-motion";
import {
  ThunderboltOutlined,
  PlusOutlined,
  CheckOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import type { Daily } from "../types/Daily";
import { DailyCard } from "../components/DailyCard";
import  AddDailyModal  from "../components/AddDailyModal";

const { Text } = Typography;

interface DailiesPageProps {
  dailies: Daily[];
  onAddDaily: (daily: any) => void;
  onUpdateDaily: (id: string, updates: Partial<Daily>) => void;
  onDeleteDaily: (id: string) => void;
  loading?: boolean;
}

export default function DailiesPage({
  dailies,
  onAddDaily,
  onUpdateDaily,
  onDeleteDaily,
  loading = false,
}: DailiesPageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Card
      bordered={false}
      title={
        <Space>
          <ThunderboltOutlined style={{ color: "#1677ff" }} />
          <span className="font-semibold text-lg">Your Dailies</span>
        </Space>
      }
      extra={
        <Tooltip title="Add new daily task">
          <Button
            type="primary"
            shape="round"
            icon={<PlusOutlined />}
            onClick={() => setIsModalOpen(true)}
          >
            New Daily
          </Button>
        </Tooltip>
      }
      style={{
        borderRadius: 12,
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      }}
    >
      <AnimatePresence mode="wait">
        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading...</div>
        ) : dailies.length === 0 ? (
          <Empty
            description={
              <div className="flex flex-col items-center">
                <Text className="text-gray-500 mb-2">
                  No dailies yet. Add one to begin!
                </Text>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => setIsModalOpen(true)}
                >
                  Add Daily
                </Button>
              </div>
            }
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            style={{ padding: "2rem 0" }}
          />
        ) : (
          <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {dailies.map((daily) => (
              <motion.div
                key={daily._id}
                layout
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -15, opacity: 0 }}
                transition={{ type: "spring", stiffness: 100 }}
              >
                <DailyCard
                  daily={daily}
                  onUpdate={onUpdateDaily}
                  onDelete={onDeleteDaily}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <FloatButton
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setIsModalOpen(true)}
        tooltip={<div>Add new daily</div>}
        style={{ right: 40, bottom: 40 }}
      />

      <AddDailyModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={onAddDaily}
      />
    </Card>
  );
}
