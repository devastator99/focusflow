import { Card, Progress, Space, Tag, Tooltip, Typography } from 'antd';
import { CheckCircleOutlined, ClockCircleOutlined, FireOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface HabitStatsProps {
  totalHabits: number;
  completedToday: number;
  completionRate: number;
}

export const HabitStats = ({ totalHabits, completedToday, completionRate }: HabitStatsProps) => {
  return (
    <Card className="shadow-sm">
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <Text type="secondary" className="block text-sm mb-1">
            Total Habits
          </Text>
          <Text strong className="text-lg">
            {totalHabits}
          </Text>
        </div>
        
        <div className="text-center">
          <Text type="secondary" className="block text-sm mb-1">
            Today
          </Text>
          <Space>
            <CheckCircleOutlined className="text-green-500" />
            <Text strong className="text-lg">
              {completedToday}/{totalHabits}
            </Text>
          </Space>
        </div>
        
        <div className="text-center">
          <Text type="secondary" className="block text-sm mb-1">
            Completion
          </Text>
          <Tooltip title={`${Math.round(completionRate)}% of habits completed`}>
            <Progress
              type="circle"
              percent={completionRate}
              width={40}
              strokeWidth={12}
              format={() => null}
              className="flex items-center justify-center"
            />
          </Tooltip>
        </div>
      </div>
    </Card>
  );
};
