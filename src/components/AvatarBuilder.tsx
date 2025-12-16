// src/components/AvatarBuilder.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { Tabs, Card, Row, Col, Button, message, Tooltip, Badge, Space, Spin } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SaveOutlined,
  RotateLeftOutlined,
  UserOutlined,
  EyeOutlined,
  CheckOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import { AvatarRenderer } from './gamification/AvatarBuilder';
import type { AvatarConfig, AvatarPartKey, AvatarPartConfig } from '../AvatarConfig';

// Avatar parts configuration with metadata
const AVATAR_PARTS: Record<AvatarPartKey, AvatarPartConfig> = {
  hair: {
    items: ['hair1.png', 'hair2.png', 'hair3.png'],
    label: 'Hairstyle',
    icon: '💇',
    description: 'Choose your hairstyle',
  },
  eyes: {
    items: ['eyes1.png', 'eyes2.png'],
    label: 'Eyes',
    icon: '👁️',
    description: 'Select eye style',
  },
  clothes: {
    items: ['shirt1.png', 'shirt2.png'],
    label: 'Clothing',
    icon: '👔',
    description: 'Pick your outfit',
  },
  body: {
    items: ['body1.png', 'body2.png'],
    label: 'Body',
    icon: '👤',
    description: 'Choose body type',
  },
  accessory: {
    items: ['glasses1.png', 'sword1.png'],
    label: 'Accessories',
    icon: '✨',
    description: 'Add accessories',
  },
  background: {
    items: ['bg1.png', 'bg2.png'],
    label: 'Background',
    icon: '🎨',
    description: 'Select background',
  },
};

// Default avatar configuration
const DEFAULT_AVATAR: AvatarConfig = {
  body: 'body1.png',
  hair: 'hair1.png',
  eyes: 'eyes1.png',
  clothes: 'shirt1.png',
  accessory: 'glasses1.png',
  background: 'bg1.png',
};

export const AvatarBuilder: React.FC = () => {
  const [avatar, setAvatar] = useState<AvatarConfig>(DEFAULT_AVATAR);
  const [activeTab, setActiveTab] = useState<AvatarPartKey>('hair');
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasChanges, setHasChanges] = useState(false);

  // Load saved avatar on mount
  useEffect(() => {
    const loadAvatar = async () => {
      try {
        const saved = localStorage.getItem('userAvatar');
        if (saved) {
          const savedAvatar = JSON.parse(saved) as AvatarConfig;
          // Validate loaded avatar
          const validAvatar = Object.entries(savedAvatar).reduce((acc, [key, value]) => {
            const part = key as AvatarPartKey;
            if (AVATAR_PARTS[part]?.items.includes(value)) {
              acc[part] = value;
            } else {
              acc[part] = DEFAULT_AVATAR[part];
            }
            return acc;
          }, {} as AvatarConfig);
          setAvatar(validAvatar);
        }
      } catch (error) {
        console.error('Failed to load saved avatar:', error);
        message.error('Could not load saved avatar');
      } finally {
        setIsLoading(false);
      }
    };

    loadAvatar();
  }, []);

  // Check for changes
  useEffect(() => {
    const saved = localStorage.getItem('userAvatar');
    const savedAvatar = saved ? (JSON.parse(saved) as AvatarConfig) : DEFAULT_AVATAR;
    setHasChanges(JSON.stringify(avatar) !== JSON.stringify(savedAvatar));
  }, [avatar]);

  // Update selected part with validation
  const updatePart = useCallback((key: AvatarPartKey, value: string) => {
    setAvatar((prev) => ({ ...prev, [key]: value }));
  }, []);

  // Reset to default avatar
  const resetAvatar = useCallback(() => {
    setAvatar(DEFAULT_AVATAR);
    message.info('Avatar reset to default');
  }, []);

  // Save avatar to localStorage
  const saveAvatar = useCallback(async () => {
    setIsSaving(true);
    try {
      localStorage.setItem('userAvatar', JSON.stringify(avatar));
      message.success('Avatar saved successfully!');
      setHasChanges(false);
    } catch (error) {
      console.error('Failed to save avatar:', error);
      message.error('Failed to save avatar');
    } finally {
      setIsSaving(false);
    }
  }, [avatar]);

  // Handle image loading errors
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.src = '/avatar/placeholder.png';
  };

  // Generate tab items
  const tabItems = Object.entries(AVATAR_PARTS).map(([key, config]) => {
    const part = key as AvatarPartKey;
    return {
      key: part,
      label: (
        <Space>
          <span>{config.icon}</span>
          <span>{config.label}</span>
          {avatar[part] !== DEFAULT_AVATAR[part] && <Badge dot />}
        </Space>
      ),
      children: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="mb-4">
            <p className="text-gray-600 text-sm">{config.description}</p>
          </div>
          <Row gutter={[12, 12]}>
            <AnimatePresence mode="popLayout">
              {config.items.map((img, index) => (
                <Col xs={12} sm={8} md={6} key={img}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Card
                      hoverable
                      className={`
                        relative overflow-hidden transition-all duration-300 h-full
                        ${
                          avatar[part] === img
                            ? 'border-2 border-blue-500 shadow-lg shadow-blue-500/20'
                            : 'border-gray-300 hover:border-gray-400'
                        }
                      `}
                      onClick={() => updatePart(part, img)}
                      bodyStyle={{ padding: '12px' }}
                    >
                      <div className="relative h-32 bg-gray-50 rounded-md mb-2 overflow-hidden">
                        <img
                          src={`/avatar/${part}/${img}`}
                          alt={`${config.label} - ${img}`}
                          className="w-full h-full object-contain"
                          onError={handleImageError}
                          loading="lazy"
                        />
                        {avatar[part] === img && (
                          <motion.div
                            className="absolute top-1 right-1 bg-blue-500 text-white rounded-full p-1"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.2 }}
                          >
                            <CheckOutlined className="text-xs" />
                          </motion.div>
                        )}
                      </div>
                      <div className="text-center">
                        <span className="text-sm font-medium">
                          {img
                            .replace('.png', '')
                            .replace(/\d+$/, (match) => ` ${parseInt(match) + 1}`)}
                        </span>
                      </div>
                    </Card>
                  </motion.div>
                </Col>
              ))}
            </AnimatePresence>
          </Row>
        </motion.div>
      ),
    };
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Avatar Builder
          </h1>
          <p className="text-gray-600">Create your unique avatar</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Preview Panel */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card
                title={
                  <Space>
                    <UserOutlined />
                    <span>Preview</span>
                  </Space>
                }
                className="shadow-xl h-full"
                extra={
                  <Tooltip title="Preview your avatar">
                    <EyeOutlined className="text-gray-400" />
                  </Tooltip>
                }
              >
                <div className="flex flex-col h-full">
                  <div className="flex-1 flex items-center justify-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg mb-4">
                    <div className="relative w-48 h-48">
                      <AvatarRenderer config={avatar} />
                    </div>
                  </div>
                  <div className="mt-auto pt-4 border-t border-gray-200">
                    <div className="flex flex-col space-y-2">
                      <Button
                        type="primary"
                        icon={<SaveOutlined />}
                        onClick={saveAvatar}
                        loading={isSaving}
                        disabled={!hasChanges}
                        block
                      >
                        {isSaving ? 'Saving...' : 'Save Avatar'}
                      </Button>
                      <Button
                        icon={<RotateLeftOutlined />}
                        onClick={resetAvatar}
                        disabled={!hasChanges}
                        block
                      >
                        Reset to Default
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Customization Panel */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card
                title={
                  <Space>
                    <span>🎨</span>
                    <span>Customization</span>
                  </Space>
                }
                className="shadow-xl"
              >
                <Tabs
                  activeKey={activeTab}
                  onChange={(key) => setActiveTab(key as AvatarPartKey)}
                  items={tabItems}
                  size="large"
                  tabPosition="top"
                  tabBarExtraContent={
                    hasChanges && (
                      <div className="text-sm text-orange-500">
                        You have unsaved changes
                      </div>
                    )
                  }
                />
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};