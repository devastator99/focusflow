import { Modal, Form, Input, DatePicker, Select, Switch } from "antd";

interface AddDailyModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export default function AddDailyModal({ open, onClose, onSubmit }: AddDailyModalProps) {
  const [form] = Form.useForm();

  const handleOk = () => {
    form.validateFields().then(values => {
      onSubmit(values);
      form.resetFields();
      onClose();
    });
  };

  return (
    <Modal
      title="Add Daily Task"
      open={open}
      onOk={handleOk}
      onCancel={onClose}
      okText="Add"
    >
      <Form layout="vertical" form={form}>
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please enter a title" }]}
        >
          <Input placeholder="Ex: Study for 1 hour" />
        </Form.Item>

        <Form.Item label="Difficulty" name="difficulty">
          <Select
            defaultValue="easy"
            options={[
              { label: "Easy", value: "easy" },
              { label: "Medium", value: "medium" },
              { label: "Hard", value: "hard" }
            ]}
          />
        </Form.Item>

        <Form.Item label="Repeat" name="repeat">
          <Select
            mode="multiple"
            placeholder="Select days"
            options={[
              { label: "Mon", value: "mon" },
              { label: "Tue", value: "tue" },
              { label: "Wed", value: "wed" },
              { label: "Thu", value: "thu" },
              { label: "Fri", value: "fri" },
              { label: "Sat", value: "sat" },
              { label: "Sun", value: "sun" }
            ]}
          />
        </Form.Item>

        <Form.Item label="Start Date" name="startDate">
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label="Auto Streak" name="autoStreak">
          <Switch defaultChecked />
        </Form.Item>
      </Form>
    </Modal>
  );
}
