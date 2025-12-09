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
  FireOutlined,
  PlusOutlined,
  CheckOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { HabitCard } from "../components/HabitCard";
import { AddHabitModal } from "../components/AddHabitModal";
import type { Habit } from "../types/Habit";

const { Text } = Typography;

interface HabitsPageProps {
  habits: Habit[];
  onAddHabit: (
    habit: Omit<Habit, "_id" | "id" | "createdAt" | "updatedAt">
  ) => void;
  onUpdateHabit: (id: string, updates: Partial<Habit>) => void;
  onDeleteHabit: (id: string) => void;
  loading?: boolean;
}
export const HabitsPage = ({
  habits,
  onAddHabit,
  onUpdateHabit,
  onDeleteHabit,
  loading = false,
}: HabitsPageProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Card
      bordered={false}
      title={
        <Space>
          <FireOutlined style={{ color: "#fa541c" }} />
          <span className="font-semibold text-lg">Your Habits</span>
        </Space>
      }
      extra={
        <Tooltip title="Add new habit">
          <Button
            type="primary"
            shape="round"
            icon={<PlusOutlined />}
            onClick={() => setIsModalOpen(true)}
          >
            New Habit
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
          <div className="text-center py-12 text-gray-500">
            Loading habits...
          </div>
        ) : habits.length === 0 ? (
          <Empty
            description={
              <div className="flex flex-col items-center">
                <Text className="text-gray-500 mb-2">
                  No habits yet. Add your first habit to get started!
                </Text>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => setIsModalOpen(true)}
                >
                  Add Habit
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
            {habits.map((habit) => (
              <motion.div
                key={habit._id}
                layout
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -15, opacity: 0 }}
                transition={{ type: "spring", stiffness: 100 }}
              >
                <HabitCard
                  id={habit._id!}
                  name={habit.title}
                  notes={habit.notes}
                  difficulty={"medium"}
                  counter={habit.counter || 0}
                  strength={(habit.counter || 0) > 10 ? "strong" : "weak"}
                  onIncrement={() =>
                    onUpdateHabit(habit._id!, {
                      counter: (habit.counter || 0) + 1,
                    })
                  }
                  onDecrement={() =>
                    onUpdateHabit(habit._id!, {
                      counter: Math.max((habit.counter || 0) - 1, 0),
                    })
                  }
                  onDelete={() => onDeleteHabit(habit._id!)}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating add button (for mobile) */}
      <FloatButton
        shape="circle"
        type="primary"
        icon={<PlusOutlined />}
        tooltip={<div>Add new habit</div>}
        onClick={() => setIsModalOpen(true)}
        style={{
          right: 40,
          bottom: 40,
          boxShadow: "0 4px 12px rgba(24,144,255,0.5)",
        }}
      />

      {/* Modal */}
      <AddHabitModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={(values) => {
          onAddHabit({
            title: values.name, // Map 'name' to 'title'
            notes: values.notes,
            difficulty: values.difficulty,
            positive: true, // Default value
            negative: false, // Default value
            counter: 0, // Default value
          });
        }}
      />
    </Card>
  );
};
