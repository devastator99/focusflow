import { Button, Dropdown, Menu, Space } from 'antd';
import { FilterOutlined } from '@ant-design/icons';
import type { Difficulty } from '../types/Habit';

interface HabitFilterProps {
  onFilterChange: (filters: {
    type: 'all' | 'positive' | 'negative';
    difficulty: Difficulty | 'all';
  }) => void;
  activeFilters: {
    type: 'all' | 'positive' | 'negative';
    difficulty: Difficulty | 'all';
  };
}

export const HabitFilter = ({ onFilterChange, activeFilters }: HabitFilterProps) => {
  const typeMenu = (
    <Menu
      selectedKeys={[activeFilters.type]}
      onClick={({ key }) => onFilterChange({ ...activeFilters, type: key as any })}
      items={[
        { key: 'all', label: 'All Types' },
        { key: 'positive', label: 'Positive Habits' },
        { key: 'negative', label: 'Negative Habits' },
      ]}
    />
  );

  const difficultyMenu = (
    <Menu
      selectedKeys={[activeFilters.difficulty]}
      onClick={({ key }) => onFilterChange({ ...activeFilters, difficulty: key as any })}
      items={[
        { key: 'all', label: 'All Difficulties' },
        { key: 'easy', label: 'Easy' },
        { key: 'medium', label: 'Medium' },
        { key: 'hard', label: 'Hard' },
      ]}
    />
  );

  return (
    <Space wrap>
      <Dropdown overlay={typeMenu} trigger={['click']}>
        <Button>
          <Space>
            {activeFilters.type === 'all' ? 'All Types' : activeFilters.type === 'positive' ? 'Positive' : 'Negative'}
            <FilterOutlined />
          </Space>
        </Button>
      </Dropdown>
      
      <Dropdown overlay={difficultyMenu} trigger={['click']}>
        <Button>
          <Space>
            {activeFilters.difficulty === 'all' 
              ? 'All Difficulties' 
              : activeFilters.difficulty.charAt(0).toUpperCase() + activeFilters.difficulty.slice(1)
            }
            <FilterOutlined />
          </Space>
        </Button>
      </Dropdown>
    </Space>
  );
};
