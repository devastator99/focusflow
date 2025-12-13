import { FireOutlined } from '@ant-design/icons';
import { Badge, Tooltip } from 'antd';

interface HabitStreakCounterProps {
  currentStreak: number;
  longestStreak: number;
}

export const HabitStreakCounter = ({
  currentStreak,
  longestStreak,
}: HabitStreakCounterProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Tooltip title={`Current streak: ${currentStreak} days`}>
        <Badge
          count={
            <span className="flex items-center">
              <FireOutlined className="text-orange-500" />
              <span className="ml-1">{currentStreak}</span>
            </span>
          }
          className="bg-white shadow-sm rounded-full p-1"
        />
      </Tooltip>
      {longestStreak > 0 && (
        <span className="text-sm text-gray-500">
          Best: {longestStreak} days
        </span>
      )}
    </div>
  );
};
