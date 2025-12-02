import { useState, useMemo, useCallback } from "react";
import {
  Button,
  Card,
  Empty,
  Space,
  Tooltip,
  Typography,
  FloatButton,
  Input,
  Select,
  Badge,
  Statistic,
  Row,
  Col,
  Divider,
  Tag,
  Progress,
  Dropdown,
  type MenuProps,
} from "antd";
import { motion, AnimatePresence } from "framer-motion";
import {
  ThunderboltOutlined,
  PlusOutlined,
  CheckOutlined,
  DeleteOutlined,
  SearchOutlined,
  FilterOutlined,
  SortAscendingOutlined,
  TrophyOutlined,
  FireOutlined,
  CalendarOutlined,
  BulbOutlined,
  RocketOutlined,
  StarOutlined,
  MenuOutlined,
  CheckSquareOutlined,
} from "@ant-design/icons";
import type { Daily } from "../types/Daily";
import { DailyCard } from "../components/DailyCard";
import AddDailyModal from "../components/AddDailyModal";

const { Text, Title } = Typography;
const { Search } = Input;

interface DailiesPageProps {
  dailies: Daily[];
  onAddDaily: (daily: any) => void;
  onUpdateDaily: (id: string, updates: Partial<Daily>) => void;
  onDeleteDaily: (id: string) => void;
  loading?: boolean;
}

type SortOption = 'title' | 'streak' | 'difficulty' | 'created';
type FilterOption = 'all' | 'completed' | 'pending' | 'easy' | 'medium' | 'hard';

export default function DailiesPage({
  dailies,
  onAddDaily,
  onUpdateDaily,
  onDeleteDaily,
  loading = false,
}: DailiesPageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('streak');
  const [filterBy, setFilterBy] = useState<FilterOption>('all');
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [selectedDailies, setSelectedDailies] = useState<string[]>([]);

  // Calculate statistics
  const stats = useMemo(() => {
    const completedToday = dailies.filter(d => d.completedToday).length;
    const totalStreak = dailies.reduce((sum, d) => sum + d.streak, 0);
    const completionRate = dailies.length > 0 ? Math.round((completedToday / dailies.length) * 100) : 0;
    const highStreakCount = dailies.filter(d => d.streak >= 7).length;
    const perfectWeek = dailies.filter(d => d.streak >= 7).length;
    
    return {
      completedToday,
      totalStreak,
      completionRate,
      highStreakCount,
      perfectWeek,
      totalTasks: dailies.length
    };
  }, [dailies]);

  // Filter and sort dailies
  const filteredAndSortedDailies = useMemo(() => {
    let filtered = [...dailies];

    // Apply search
    if (searchTerm) {
      filtered = filtered.filter(daily => 
        daily.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        daily.notes?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply filter
    switch (filterBy) {
      case 'completed':
        filtered = filtered.filter(d => d.completedToday);
        break;
      case 'pending':
        filtered = filtered.filter(d => !d.completedToday);
        break;
      case 'easy':
      case 'medium':
      case 'hard':
        filtered = filtered.filter(d => d.difficulty === filterBy);
        break;
    }

    // Apply sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'streak':
          return b.streak - a.streak;
        case 'difficulty':
          const difficultyOrder = { hard: 3, medium: 2, easy: 1 };
          return difficultyOrder[b.difficulty] - difficultyOrder[a.difficulty];
        default:
          return 0;
      }
    });

    return filtered;
  }, [dailies, searchTerm, sortBy, filterBy]);

  // Bulk actions
  const handleSelectAll = useCallback(() => {
    if (selectedDailies.length === filteredAndSortedDailies.length) {
      setSelectedDailies([]);
    } else {
      setSelectedDailies(filteredAndSortedDailies.map(d => d._id));
    }
  }, [selectedDailies.length, filteredAndSortedDailies]);

  const handleCompleteAll = useCallback(() => {
    filteredAndSortedDailies.forEach(daily => {
      if (!daily.completedToday) {
        onUpdateDaily(daily._id, {
          completedToday: true,
          streak: daily.streak + 1
        });
      }
    });
    setSelectedDailies([]);
  }, [filteredAndSortedDailies, onUpdateDaily]);

  const handleDeleteSelected = useCallback(() => {
    selectedDailies.forEach(id => onDeleteDaily(id));
    setSelectedDailies([]);
  }, [selectedDailies, onDeleteDaily]);

  const getMotivationalMessage = useCallback(() => {
    const messages = [
      "Keep up the great work! 💪",
      "Every day counts! 🌟",
      "You're building amazing habits! 🎯",
      "Consistency is key! 🔑",
      "Small steps, big results! 📈"
    ];
    
    if (stats.completionRate === 100 && stats.totalTasks > 0) {
      return "Perfect day! All tasks completed! 🎉";
    }
    if (stats.completionRate >= 80) {
      return "Amazing progress today! 🔥";
    }
    if (stats.completionRate >= 50) {
      return "You're doing great! Keep going! 👍";
    }
    return messages[Math.floor(Math.random() * messages.length)];
  }, [stats]);

  const sortOptions: MenuProps['items'] = [
    { key: 'streak', label: 'Sort by Streak', icon: <FireOutlined /> },
    { key: 'title', label: 'Sort by Title', icon: <SortAscendingOutlined /> },
    { key: 'difficulty', label: 'Sort by Difficulty', icon: <TrophyOutlined /> },
  ];

  const filterOptions: MenuProps['items'] = [
    { key: 'all', label: 'All Tasks' },
    { type: 'divider' },
    { key: 'completed', label: 'Completed Today' },
    { key: 'pending', label: 'Pending' },
    { type: 'divider' },
    { key: 'easy', label: 'Easy' },
    { key: 'medium', label: 'Medium' },
    { key: 'hard', label: 'Hard' },
  ];

  return (
    <div className="space-y-6">
      {/* Statistics Dashboard */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card
          bordered={false}
          className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 backdrop-blur-sm"
          style={{ borderRadius: 16 }}
        >
          <div className="mb-4">
            <Space className="items-center">
              <ThunderboltOutlined style={{ color: "#1677ff", fontSize: 24 }} />
              <Title level={3} className="!mb-0 text-white">Your Dailies</Title>
              <Badge 
                count={stats.totalTasks} 
                style={{ backgroundColor: '#52c41a' }}
                className="ml-2"
              />
            </Space>
            <Text className="text-gray-300 text-sm mt-1 block">
              {getMotivationalMessage()}
            </Text>
          </div>

          <Row gutter={[16, 16]}>
            <Col xs={12} sm={8} md={6}>
              <Statistic
                title={<span className="text-gray-300">Today's Progress</span>}
                value={stats.completionRate}
                suffix="%"
                valueStyle={{ color: stats.completionRate === 100 ? '#52c41a' : '#1677ff' }}
                prefix={<CheckSquareOutlined />}
              />
            </Col>
            <Col xs={12} sm={8} md={6}>
              <Statistic
                title={<span className="text-gray-300">Total Streak</span>}
                value={stats.totalStreak}
                valueStyle={{ color: '#fa8c16' }}
                prefix={<FireOutlined />}
              />
            </Col>
            <Col xs={12} sm={8} md={6}>
              <Statistic
                title={<span className="text-gray-300">Completed</span>}
                value={stats.completedToday}
                suffix={`/ ${stats.totalTasks}`}
                valueStyle={{ color: '#52c41a' }}
                prefix={<CheckOutlined />}
              />
            </Col>
            <Col xs={12} sm={8} md={6}>
              <Statistic
                title={<span className="text-gray-300">High Streaks</span>}
                value={stats.highStreakCount}
                valueStyle={{ color: '#722ed1' }}
                prefix={<TrophyOutlined />}
              />
            </Col>
          </Row>

          {stats.totalTasks > 0 && (
            <div className="mt-4">
              <Progress
                percent={stats.completionRate}
                strokeColor={{
                  '0%': '#108ee9',
                  '100%': '#52c41a',
                }}
                trailColor="rgba(255,255,255,0.1)"
                format={(percent) => `${percent}% Complete`}
              />
            </div>
          )}
        </Card>
      </motion.div>

      {/* Controls Section */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card bordered={false} style={{ borderRadius: 12 }}>
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <Search
                placeholder="Search dailies..."
                allowClear
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                prefix={<SearchOutlined />}
                className="w-full"
              />
            </div>

            {/* Filters and Sort */}
            <Space className="flex-wrap">
              <Dropdown
                menu={{
                  items: filterOptions,
                  onClick: ({ key }) => setFilterBy(key as FilterOption),
                  selectedKeys: [filterBy]
                }}
                trigger={['click']}
              >
                <Button icon={<FilterOutlined />}>
                  Filter: {filterBy.charAt(0).toUpperCase() + filterBy.slice(1)}
                </Button>
              </Dropdown>

              <Dropdown
                menu={{
                  items: sortOptions,
                  onClick: ({ key }) => setSortBy(key as SortOption),
                  selectedKeys: [sortBy]
                }}
                trigger={['click']}
              >
                <Button icon={<SortAscendingOutlined />}>
                  Sort: {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}
                </Button>
              </Dropdown>

              {filteredAndSortedDailies.length > 0 && (
                <Button
                  icon={<CheckSquareOutlined />}
                  onClick={handleCompleteAll}
                  type="primary"
                  ghost
                >
                  Complete All
                </Button>
              )}

              <Tooltip title="Add new daily task">
                <Button
                  type="primary"
                  shape="round"
                  icon={<PlusOutlined />}
                  onClick={() => setIsModalOpen(true)}
                >
                  New Daily
                </Button>
              </Tooltip>
            </Space>
          </div>

          {/* Active filters display */}
          {(searchTerm || filterBy !== 'all') && (
            <div className="mt-3 flex flex-wrap gap-2">
              {searchTerm && (
                <Tag
                  closable
                  onClose={() => setSearchTerm('')}
                  color="blue"
                >
                  Search: {searchTerm}
                </Tag>
              )}
              {filterBy !== 'all' && (
                <Tag
                  closable
                  onClose={() => setFilterBy('all')}
                  color="purple"
                >
                  Filter: {filterBy}
                </Tag>
              )}
            </div>
          )}
        </Card>
      </motion.div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card
          bordered={false}
          style={{
            borderRadius: 12,
            minHeight: 400,
          }}
        >
          <AnimatePresence mode="wait">
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <div className="text-gray-500 mt-4">Loading your dailies...</div>
              </div>
            ) : filteredAndSortedDailies.length === 0 ? (
              <Empty
                description={
                  <div className="flex flex-col items-center max-w-md">
                    <div className="text-6xl mb-4">🎯</div>
                    <Title level={4} className="!mb-2">
                      {searchTerm || filterBy !== 'all' 
                        ? 'No dailies found' 
                        : 'Start building better habits'
                      }
                    </Title>
                    <Text className="text-gray-500 text-center mb-4">
                      {searchTerm || filterBy !== 'all'
                        ? 'Try adjusting your search or filters'
                        : 'Create your first daily task to begin tracking your progress and building streaks!'
                      }
                    </Text>
                    <Space>
                      {(searchTerm || filterBy !== 'all') && (
                        <Button onClick={() => {
                          setSearchTerm('');
                          setFilterBy('all');
                        }}>
                          Clear Filters
                        </Button>
                      )}
                      <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => setIsModalOpen(true)}
                      >
                        Add Daily
                      </Button>
                    </Space>
                  </div>
                }
                image={null}
                style={{ padding: "3rem 0" }}
              />
            ) : (
              <div>
                {/* Results count */}
                <div className="mb-4 flex justify-between items-center">
                  <Text className="text-gray-500">
                    Showing {filteredAndSortedDailies.length} of {dailies.length} tasks
                  </Text>
                  {selectedDailies.length > 0 && (
                    <Space>
                      <Text className="text-gray-500">
                        {selectedDailies.length} selected
                      </Text>
                      <Button size="small" onClick={handleDeleteSelected} danger>
                        Delete Selected
                      </Button>
                    </Space>
                  )}
                </div>

                <motion.div
                  layout
                  className="space-y-4"
                >
                  {filteredAndSortedDailies.map((daily, index) => (
                    <motion.div
                      key={daily._id}
                      layout
                      initial={{ y: 15, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -15, opacity: 0 }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 100,
                        delay: index * 0.05
                      }}
                    >
                      <DailyCard
                        daily={daily}
                        onUpdate={onUpdateDaily}
                        onDelete={onDeleteDaily}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </Card>
      </motion.div>

      {/* Floating Action Button */}
      <FloatButton.Group
        trigger="click"
        type="primary"
        icon={<PlusOutlined />}
        tooltip={<div>Quick Actions</div>}
        style={{ right: 24, bottom: 24 }}
      >
        <FloatButton
          tooltip="Add Daily"
          icon={<PlusOutlined />}
          onClick={() => setIsModalOpen(true)}
        />
        <FloatButton
          tooltip="Complete All"
          icon={<CheckOutlined />}
          onClick={handleCompleteAll}
        />
      </FloatButton.Group>

      {/* Modal */}
      <AddDailyModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={onAddDaily}
      />
    </div>
  );
}
