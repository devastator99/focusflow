// components/AddHabitForm.tsx
import { useState } from "react";
import { Input, Button, Space } from "antd";
import { motion } from "framer-motion";
import { PlusOutlined } from "@ant-design/icons";

interface AddHabitFormProps {
  onAdd: (title: string) => void;
}

export default function AddHabitForm({ onAdd }: AddHabitFormProps) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title.trim());
    setTitle("");
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Space.Compact style={{ width: "100%" }}>
        <Input
          size="large"
          placeholder="Add a new habit..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          allowClear
        />
        <Button
          type="primary"
          size="large"
          icon={<PlusOutlined />}
          htmlType="submit"
        >
          Add
        </Button>
      </Space.Compact>
    </motion.form>
  );
}
