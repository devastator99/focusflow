import { Modal } from "antd";

interface LevelUpModalProps {
  open: boolean;
  onClose: () => void;
  level: number;
}

export const LevelUpModal = ({ open, onClose, level }: LevelUpModalProps) => {
  return (
    <Modal open={open} onCancel={onClose} footer={false}>
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Level Up!</h1>
        <p className="text-lg">You reached level {level}</p>
      </div>
    </Modal>
  );
};
