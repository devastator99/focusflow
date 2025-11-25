// components/UI/ProgressBar.tsx
import { motion } from "framer-motion";

type ProgressBarProps = {
  value: number; // 0–100
  color?: string; // tailwind or custom gradient
  height?: number;
};

export const ProgressBar = ({
  value,
  color = "from-blue-500 to-blue-300",
  height = 8,
}: ProgressBarProps) => {
  return (
    <div
      className="w-full bg-gray-800 rounded-full overflow-hidden"
      style={{ height }}
    >
      <motion.div
        className={`h-full bg-gradient-to-r ${color}`}
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{
          duration: 0.8,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};
