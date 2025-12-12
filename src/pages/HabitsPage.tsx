// src/pages/HabitsPage.tsx
import { useState } from "react";
import {
  Button,
  Card,
  Empty,
  Space,
  Tooltip,
  Typography,
  FloatButton,
  message,
} from "antd";
import { motion, AnimatePresence } from "framer-motion";
import { FireOutlined, PlusOutlined } from "@ant-design/icons";
import HabitCard from "../components/HabitCard";
import { AddHabitModal } from "../components/AddHabitModal";
import type { Difficulty } from "../types/Habit";
import type { Habit } from "../types/Habit";
import type { HabitInput } from "../types/Habit";
import { useHabits } from "../hooks/useHabits";

const { Text } = Typography;

interface HabitsPageProps {
  habits: Habit[];
  onAddHabit: (habit: HabitInput) => Promise<void>;
  onUpdateHabit: (id: string, updates: Partial<Habit>) => Promise<void>;
  onDeleteHabit: (id: string) => Promise<void>;
}

export const HabitsPage = ({
  habits,
  onAddHabit,
  onUpdateHabit,
  onDeleteHabit,
}: HabitsPageProps) => {
  const {
    loading,
    addHabit,
    updateHabit,
    deleteHabit,
    getHabitStrength,
  } = useHabits();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddHabit = async (values: {
    name: string;
    notes?: string;
    difficulty?: Difficulty;
    positive?: boolean;
    negative?: boolean;
  }) => {
    try {
      await addHabit({
        title: values.name,
        notes: values.notes,
        difficulty: values.difficulty || "medium",
        positive: values.positive ?? true, // Default to true if not provided
        negative: values.negative ?? false, // Default to false if not provided
      });
      message.success("Habit added successfully!");
      setIsModalOpen(false);
    } catch (error) {
      message.error("Failed to add habit. Please try again.");
    }
  };

  const handleUpdateHabit = async (id: string, updates: any) => {
    try {
      await updateHabit(id, updates);
    } catch (error) {
      message.error("Failed to update habit. Please try again.");
      throw error;
    }
  };

  const handleDeleteHabit = async (id: string) => {
    try {
      await deleteHabit(id);
      message.success("Habit deleted successfully!");
    } catch (error) {
      message.error("Failed to delete habit. Please try again.");
    }
  };

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
            aria-label="Add new habit"
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
        {loading && habits.length === 0 ? (
          <div className="text-center py-12 text-gray-500" aria-live="polite">
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
                  aria-label="Add your first habit"
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
              <HabitCard
                key={habit._id}
                id={habit._id!}
                habit={{
                  name: habit.title,
                  notes: habit.notes,
                  difficulty: habit.difficulty as "easy" | "medium" | "hard",
                  counter: habit.counter || 0,
                  strength: getHabitStrength(habit.counter || 0),
                }}
                onDelete={() => handleDeleteHabit(habit._id!)}
                onIncrement={() =>
                  handleUpdateHabit(habit._id!, {
                    counter: (habit.counter || 0) + 1,
                  })
                }
                onDecrement={() =>
                  handleUpdateHabit(habit._id!, {
                    counter: Math.max((habit.counter || 0) - 1, 0),
                  })
                }
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <FloatButton
        shape="circle"
        type="primary"
        icon={<PlusOutlined />}
        tooltip="Add new habit"
        onClick={() => setIsModalOpen(true)}
        style={{
          right: 40,
          bottom: 40,
          boxShadow: "0 4px 12px rgba(24,144,255,0.5)",
        }}
        aria-label="Add new habit"
      />

      <AddHabitModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddHabit}
      />
    </Card>
  );
};
