import { useState, useEffect, useCallback } from "react";
import { Tabs, Card, Row, Col, Button, message, Tooltip, Badge, Space } from "antd";
import { motion, AnimatePresence } from "framer-motion";
import {
  SaveOutlined,
  RotateLeftOutlined,
  UserOutlined,
  EyeOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { AvatarRenderer } from "./gamification/AvatarBuilder";
import { type AvatarConfig } from "../types/AvatarConfig";

// Avatar parts configuration with metadata
const AVATAR_PARTS = {
  hair: {
    items: ["hair1.png", "hair2.png", "hair3.png"],
    label: "Hairstyle",
    icon: "💇",
    description: "Choose your hairstyle",
  },
  eyes: {
    items: ["eyes1.png", "eyes2.png"],
    label: "Eyes",
    icon: "👁️",
    description: "Select eye style",
  },
  clothes: {
    items: ["shirt1.png", "shirt2.png"],
    label: "Clothing",
    icon: "👔",
    description: "Pick your outfit",
  },
  body: {
    items: ["body1.png", "body2.png"],
    label: "Body",
    icon: "👤",
    description: "Choose body type",
  },
  accessory: {
    items: ["glasses1.png", "sword1.png"],
    label: "Accessories",
    icon: "✨",
    description: "Add accessories",
  },
  background: {
    items: ["bg1.png", "bg2.png"],
    label: "Background",
    icon: "🎨",
    description: "Select background",
  },
} as const;

// Default avatar configuration
const DEFAULT_AVATAR: AvatarConfig = {
  body: "body1.png",
  hair: "hair1.png",
  eyes: "eyes1.png",
  clothes: "shirt1.png",
  accessory: "glasses1.png",
  background: "bg1.png",
};

type AvatarPartKey = keyof typeof AVATAR_PARTS;

export const AvatarBuilderUI = () => {
  const [avatar, setAvatar] = useState<AvatarConfig>(DEFAULT_AVATAR);
  const [activeTab, setActiveTab] = useState<AvatarPartKey>("hair");
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Load saved avatar on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("userAvatar");
      if (saved) {
        const savedAvatar = JSON.parse(saved);
        setAvatar(savedAvatar);
      }
    } catch (error) {
      console.error("Failed to load saved avatar:", error);
      message.error("Could not load saved avatar");
    }
  }, []);

  // Check for changes
  useEffect(() => {
    const saved = localStorage.getItem("userAvatar");
    const savedAvatar = saved ? JSON.parse(saved) : DEFAULT_AVATAR;
    setHasChanges(JSON.stringify(avatar) !== JSON.stringify(savedAvatar));
  }, [avatar]);

  // Update selected part with validation
  const updatePart = useCallback((key: keyof AvatarConfig, value: string) => {
    setAvatar((prev) => ({ ...prev, [key]: value }));
  }, []);

  // Reset to default avatar
  const resetAvatar = useCallback(() => {
    setAvatar(DEFAULT_AVATAR);
    message.info("Avatar reset to default");
  }, []);

  // Save avatar to localStorage
  const saveAvatar = useCallback(async () => {
    setIsSaving(true);
    try {
      localStorage.setItem("userAvatar", JSON.stringify(avatar));
      message.success("Avatar saved successfully!");
      setHasChanges(false);
    } catch (error) {
      console.error("Failed to save avatar:", error);
      message.error("Failed to save avatar");
    } finally {
      setIsSaving(false);
    }
  }, [avatar]);

  // Generate tab items
  const tabItems = Object.entries(AVATAR_PARTS).map(([key, config]) => ({
    key,
    label: (
      <Space>
        <span>{config.icon}</span>
        <span>{config.label}</span>
        {avatar[key as keyof AvatarConfig] !== DEFAULT_AVATAR[key as keyof AvatarConfig] && (
          <Badge dot />
        )}
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
              <Col span={6} key={img}>
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
                      relative overflow-hidden transition-all duration-300
                      ${avatar[key as keyof AvatarConfig] === img
                        ? 'border-2 border-blue-500 shadow-lg shadow-blue-500/20'
                        : 'border-gray-300 hover:border-gray-400'
                      }
                    `}
                    onClick={() => updatePart(key as keyof AvatarConfig, img)}
                    cover={
                      <div className="relative p-2 bg-gray-50">
                        <img
                          src={`/avatar/${key}/${img}`}
                          alt={`${config.label} - ${img}`}
                          className="w-full h-20 object-contain"
                          onError={(e) => {
                            e.currentTarget.src = '/avatar/placeholder.png';
                          }}
                        />
                        {avatar[key as keyof AvatarConfig] === img && (
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
                    }
                  >
                    <Card.Meta
                      title={
                        <span className="text-sm font-medium">
                          {img.replace('.png', '').replace(/\d+/, (match) => ` ${parseInt(match) + 1}`)}
                        </span>
                      }
                    />
                  </Card>
                </motion.div>
              </Col>
            ))}
          </AnimatePresence>
        </Row>
      </motion.div>
    ),
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Avatar Builder
          </h1>
          <p className="text-gray-600">Create your unique avatar</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
                className="shadow-xl"
                extra={
                  <Tooltip title="Preview your avatar">
                    <EyeOutlined className="text-gray-400" />
                  </Tooltip>
                }
              >
                <div className="flex justify-center p-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg">
                  <div className="relative">
                    <AvatarRenderer config={avatar} />
                    {hasChanges && (
                      <motion.div
                        className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        Modified
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 space-y-3">
                  <Button
                    type="primary"
                    size="large"
                    icon={<SaveOutlined />}
                    onClick={saveAvatar}
                    loading={isSaving}
                    disabled={!hasChanges}
                    className="w-full"
                  >
                    {hasChanges ? 'Save Changes' : 'No Changes'}
                  </Button>

                  <Space className="w-full" style={{ width: '100%' }}>
                    <Button
                      icon={<RotateLeftOutlined />}
                      onClick={resetAvatar}
                      disabled={!hasChanges}
                      className="flex-1"
                    >
                      Reset
                    </Button>
                    <Tooltip title="Reset to default avatar">
                      <Button
                        type="text"
                        size="small"
                        icon={<UserOutlined />}
                        onClick={() => setAvatar(DEFAULT_AVATAR)}
                      />
                    </Tooltip>
                  </Space>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Editor Panel */}
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
                    <span>Customize</span>
                  </Space>
                }
                className="shadow-xl"
              >
                <Tabs
                  activeKey={activeTab}
                  onChange={(key) => setActiveTab(key as AvatarPartKey)}
                  items={tabItems}
                  size="large"
                  className="custom-tabs"
                />
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Status Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-6 text-center text-sm text-gray-500"
        >
          {hasChanges ? (
            <span className="text-orange-600 font-medium">⚠️ You have unsaved changes</span>
          ) : (
            <span>✓ All changes saved</span>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};
