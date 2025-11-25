// components/AvatarHeader.tsx
import { Card, Avatar, Tooltip } from "antd";
import { motion } from "framer-motion";
import { HeartFilled, ThunderboltFilled, TrophyFilled } from "@ant-design/icons";
import { ProgressBar } from "./ProgressBar";

export const AvatarHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card
        bordered={false}
        className="rounded-xl shadow-md bg-gradient-to-br from-gray-900 to-gray-800 text-white"
      >
        <div className="flex items-center gap-4">
          <Avatar
            size={90}
            src="/avatar.png"
            style={{ border: "2px solid #1677ff" }}
          />
          <div className="flex-1">
            <h2 className="text-lg font-semibold mb-2">Your Adventurer</h2>

            <div className="space-y-3">
              <Tooltip title="Health represents your consistency.">
                <div>
                  <p className="text-xs mb-1 flex items-center gap-1">
                    <HeartFilled style={{ color: "#f5222d" }} /> Health
                  </p>
                  <ProgressBar value={70} color="from-red-500 to-pink-400" />
                </div>
              </Tooltip>

              <Tooltip title="XP increases as you complete more habits.">
                <div>
                  <p className="text-xs mb-1 flex items-center gap-1">
                    <ThunderboltFilled style={{ color: "#faad14" }} /> XP
                  </p>
                  <ProgressBar value={40} color="from-yellow-400 to-orange-300" />
                </div>
              </Tooltip>

              <Tooltip title="Progress toward your next level.">
                <div>
                  <p className="text-xs mb-1 flex items-center gap-1">
                    <TrophyFilled style={{ color: "#1890ff" }} /> Level
                  </p>
                  <ProgressBar value={20} color="from-blue-500 to-cyan-400" />
                </div>
              </Tooltip>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
