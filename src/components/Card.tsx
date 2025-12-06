// components/UI/Card.tsx
import { Card as AntCard } from "antd";
import { motion } from "framer-motion";
import React from "react";

interface AppCardProps {
  children: React.ReactNode;
  hoverable?: boolean;
  bordered?: boolean;
  className?: string;
  onClick?: () => void;
}

export const Card = ({
  children,
  hoverable = false,
  bordered = false,
  className = "",
  onClick,
}: AppCardProps) => {
  return (
    <motion.div
      whileHover={hoverable ? { scale: 1.02 } : {}}
      whileTap={hoverable ? { scale: 0.98 } : {}}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      style={{ borderRadius: 12 }}
    >
      <AntCard
        className={`rounded-xl shadow-md bg-gradient-to-br from-gray-90 to-gray-800 text-white ${className}`}
        onClick={onClick}
      >
        {children}
      </AntCard>
    </motion.div>
  );
};
