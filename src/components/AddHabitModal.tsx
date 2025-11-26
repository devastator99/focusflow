// components/AddHabitModal.tsx
import { useEffect } from "react";
import {
  Modal,
  Input,
  Form,
  Select,
  Typography,
  Divider,
  Space,
} from "antd";
import { motion, AnimatePresence } from "framer-motion";
import {
  FireFilled,
  SmileFilled,
  FrownFilled,
  ThunderboltFilled,
} from "@ant-design/icons";

const { Text } = Typography;

interface AddHabitModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (habit: {
    name: string;
    notes?: string;
    difficulty: "easy" | "medium" | "hard";
  }) => void;
}

export const AddHabitModal = ({
  open,
  onClose,
  onSave,
}: AddHabitModalProps) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open) form.resetFields();
  }, [open, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      onSave(values);
      form.resetFields();
      onClose();
    } catch {
      // AntD handles validation errors automatically
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="addHabitModal"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <Modal
            open={open}
            title={
              <Space align="center">
                <ThunderboltFilled style={{ color: "#1677ff" }} />
                <Text strong>Add New Habit</Text>
              </Space>
            }
            centered
            onCancel={onClose}
            onOk={handleOk}
            okText="Save"
            cancelText="Cancel"
            destroyOnClose
            bodyStyle={{
              background: "linear-gradient(135deg,#0a0a0a,#141414)",
              borderRadius: 12,
              color: "#fff",
            }}
            style={{
              borderRadius: 12,
              overflow: "hidden",
            }}
            okButtonProps={{
              style: {
                background:
                  "linear-gradient(90deg, #1677ff 0%, #69c0ff 100%)",
                border: "none",
                fontWeight: 600,
              },
            }}
          >
            <Form
              form={form}
              layout="vertical"
              requiredMark={false}
              style={{ background: "#ffffff" }}
              initialValues={{ difficulty: "medium" }}
            >
              <Form.Item
                name="name"
                label={<Text strong>Habit Name</Text>}
                rules={[
                  { required: true, message: "Please enter a habit name" },
                ]}
              >
                <Input
                  placeholder="e.g. Drink water, Morning jog"
                  maxLength={50}
                  showCount
                  allowClear
                />
              </Form.Item>

              <Form.Item 
                name="notes" 
                label={<Text strong>Notes</Text>}
              >
                <Input.TextArea
                  rows={3}
                  placeholder="Add notes, goals, or reminders..."
                  maxLength={200}
                  showCount
                />
              </Form.Item>

              <Divider style={{ background: "#333" }} />

              <Form.Item
                name="difficulty"
                label={<Text strong>Difficulty Level</Text>}
                rules={[
                  { required: true, message: "Please select difficulty" },
                ]}
              >
                <Select
                  size="large"
                  options={[
                    {
                      value: "easy",
                      label: (
                        <Space>
                          <SmileFilled style={{ color: "#73d13d" }} />
                          Easy
                        </Space>
                      ),
                    },
                    {
                      value: "medium",
                      label: (
                        <Space>
                          <FireFilled style={{ color: "#faad14" }} />
                          Medium
                        </Space>
                      ),
                    },
                    {
                      value: "hard",
                      label: (
                        <Space>
                          <FrownFilled style={{ color: "#ff4d4f" }} />
                          Hard
                        </Space>
                      ),
                    },
                  ]}
                />
              </Form.Item>
            </Form>
          </Modal>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
