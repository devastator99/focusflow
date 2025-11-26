import { Card, Row, Col, Avatar, Progress, Button, Typography } from "antd";
import { EditOutlined } from "@ant-design/icons";
import avatar from "../assets/avatar.png";

export const ProfilePage = () => {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Your Profile</h1>

      <Row gutter={[16, 16]}>
        {/* Avatar + Stats */}
        <Col xs={24} md={10}>
          <Card style={{ borderRadius: 12 }}>
            <div className="flex items-center gap-4">
              <Avatar size={120} src={avatar} />
              <div>
                <Typography.Title level={4}>Adventurer</Typography.Title>

                <div className="mt-3 space-y-3">
                  <div>
                    <div className="flex justify-between text-xs">
                      <span>Health</span>
                      <span>70%</span>
                    </div>
                    <Progress percent={70} status="exception" showInfo={false} />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs">
                      <span>XP</span>
                      <span>40%</span>
                    </div>
                    <Progress percent={40} status="active" showInfo={false} />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs">
                      <span>Level</span>
                      <span>20%</span>
                    </div>
                    <Progress percent={20} showInfo={false} />
                  </div>
                </div>
              </div>
            </div>

            <Button type="default" className="mt-4 w-full">
              Edit Profile <EditOutlined />
            </Button>
          </Card>
        </Col>

        {/* Additional Info */}
        <Col xs={24} md={14}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Card style={{ borderRadius: 12 }}>
                <Typography.Title level={5}>Bio</Typography.Title>
                <p className="text-gray-600">Write about yourself...</p>
              </Card>
            </Col>

            <Col span={24}>
              <Card style={{ borderRadius: 12 }}>
                <Typography.Title level={5}>Achievements</Typography.Title>
                <p className="text-gray-600">Unlocked: 0</p>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};
