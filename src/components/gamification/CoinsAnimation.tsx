import { motion } from "framer-motion";

export const CoinsAnimation = () => {
  return (
    <motion.div
      className="text-yellow-500 text-xl font-bold"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: -10 }}
      transition={{ duration: 0.4 }}
    >
      +5 Coins
    </motion.div>
  );
};
