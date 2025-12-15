import { useState } from 'react';
import { Card, Row, Col, Avatar, Progress, Button, Typography, Tabs, Badge, List, Tag, Statistic } from 'antd';
import { EditOutlined, TrophyOutlined, FireOutlined, StarOutlined, CheckCircleOutlined } from '@ant-design/icons';
import avatar from '../assets/avatar.png';
import TextArea from 'antd/es/input/TextArea';
import { motion } from 'framer-motion';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

type Achievement = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
  date?: string;
};

const achievements: Achievement[] = [
  {
    id: '1',
    title: 'First Steps',
    description: 'Complete your first task',
    icon: <CheckCircleOutlined className="text-green-500" />,
    unlocked: true,
    date: '2023-12-01',
  },
  {
    id: '2',
    title: 'Habit Master',
    description: 'Maintain a 7-day streak',
    icon: <FireOutlined className="text-orange-500" />,
    unlocked: false,
  },
  {
    id: '3',
    title: 'Early Bird',
    description: 'Complete 5 tasks before 9 AM',
    icon: <StarOutlined className="text-yellow-500" />,
    unlocked: false,
  },
];

export const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState('Productivity enthusiast and habit builder. On a journey to become the best version of myself!');

  const unlockedAchievements = achievements.filter(a => a.unlocked);
  const level = 5;
  const xp = 1250;
  const xpToNextLevel = 1500;
  const xpPercentage = Math.min(100, Math.round((xp % 1000) / 10));

  const stats = [
    { title: 'Tasks Completed', value: 42, color: '#1890ff' },
    { title: 'Current Streak', value: '7 days', color: '#52c41a' },
    { title: 'Habits Tracked', value: 5, color: '#722ed1' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Title level={2} className="m-0">My Profile</Title>
          <Button 
            type="primary" 
            icon={<EditOutlined />}
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </Button>
        </div>

        {/* Profile Header */}
        <Card className="mb-6 rounded-xl shadow-sm border-0">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="relative">
              <Avatar 
                size={120} 
                src={avatar} 
                className="border-4 border-white shadow-md"
              />
              <div className="absolute -bottom-2 -right-2 bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
                {level}
              </div>
            </div>
            
            <div className="flex-1 w-full">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                <div>
                  <Title level={3} className="m-0">Alex Johnson</Title>
                  <Text type="secondary" className="text-base">Productivity Enthusiast</Text>
                </div>
                <div className="mt-2 md:mt-0">
                  <Tag color="blue" className="text-sm py-1 px-3">Pro Member</Tag>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <Text type="secondary">XP to Next Level</Text>
                    <Text strong>{xp} / {xpToNextLevel} XP</Text>
                  </div>
                  <Progress 
                    percent={xpPercentage} 
                    showInfo={false} 
                    strokeColor="#1890ff" 
                    trailColor="#f0f0f0"
                    className="m-0"
                  />
                </div>
              </div>
              
              {isEditing && (
                <div className="mt-4">
                  <TextArea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell us about yourself..."
                    autoSize={{ minRows: 3, maxRows: 5 }}
                    className="w-full"
                  />
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Stats Overview */}
        <Row gutter={[16, 16]} className="mb-6">
          {stats.map((stat) => (
            <Col xs={24} sm={8} key={stat.title}>
              <Card className="rounded-xl shadow-sm border-0 h-full">
                <Statistic
                  title={stat.title}
                  value={stat.value}
                  valueStyle={{ color: stat.color }}
                  className="text-center"
                />
              </Card>
            </Col>
          ))}
        </Row>

        {/* Main Content Tabs */}
        <Tabs 
          activeKey={activeTab} 
          onChange={setActiveTab}
          className="bg-white rounded-xl shadow-sm p-4"
        >
          <TabPane 
            tab={
              <span>
                <TrophyOutlined />
                <span className="ml-2">Achievements</span>
                {unlockedAchievements.length > 0 && (
                  <Badge 
                    count={unlockedAchievements.length} 
                    style={{ backgroundColor: '#52c41a', marginLeft: 8 }} 
                  />
                )}
              </span>
            } 
            key="achievements"
          >
            <List
              itemLayout="horizontal"
              dataSource={achievements}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <div className={`p-3 rounded-full ${item.unlocked ? 'bg-green-50' : 'bg-gray-100'}`}>
                        {item.unlocked ? item.icon : <StarOutlined className="text-gray-400" />}
                      </div>
                    }
                    title={
                      <div className="flex items-center">
                        <span className={item.unlocked ? 'font-medium' : 'text-gray-400'}>
                          {item.title}
                        </span>
                        {item.unlocked && (
                          <Tag color="green" className="ml-2 text-xs">
                            Unlocked
                          </Tag>
                        )}
                      </div>
                    }
                    description={
                      <div className={!item.unlocked ? 'text-gray-400' : ''}>
                        {item.description}
                        {item.date && (
                          <div className="text-xs text-gray-500 mt-1">
                            Unlocked on {new Date(item.date).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </TabPane>
          
          <TabPane 
            tab={
              <span>
                <FireOutlined />
                <span className="ml-2">Activity</span>
              </span>
            } 
            key="activity"
          >
            <div className="text-center py-12">
              <FireOutlined className="text-4xl text-orange-400 mb-4" />
              <Title level={4} className="text-gray-600">Your activity will appear here</Title>
              <Text type="secondary">Complete tasks and build habits to see your progress</Text>
            </div>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};
