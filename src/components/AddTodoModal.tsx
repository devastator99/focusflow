import { Modal, Form, Input, Select, DatePicker } from "antd";

interface AddTodoModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (todo: any) => void;
}

export default function AddTodoModal({ open, onClose, onSubmit }: AddTodoModalProps) {
  const [form] = Form.useForm();

  const handleOk = () => {
    form.validateFields().then(values => {
      onSubmit(values);
      form.resetFields();
      onClose();
    });
  };

  return (
    <Modal open={open} onOk={handleOk} onCancel={onClose} title="Add To-Do" okText="Create">
      <Form form={form} layout="vertical">
        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
          <Input placeholder="Ex: Finish math assignment" />
        </Form.Item>

        <Form.Item name="difficulty" label="Difficulty" initialValue="easy">
          <Select
            options={[
              { label: "Easy", value: "easy" },
              { label: "Medium", value: "medium" },
              { label: "Hard", value: "hard" }
            ]}
          />
        </Form.Item>

        <Form.Item name="dueDate" label="Due Date">
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item name="tags" label="Tags">
          <Select
            mode="tags"
            placeholder="Press enter to add tags"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
