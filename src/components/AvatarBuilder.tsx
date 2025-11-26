import { Card, Row, Col, Select, Button, Slider, Avatar } from "antd";
import { motion } from "framer-motion";
import avatar from "../assets/avatar.png";

export const AvatarBuilder = () => {
  return (
    <motion.div
      className="p-6 max-w-5xl mx-auto"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="text-2xl font-bold mb-6">Customize Your Adventurer</h1>

      <Row gutter={[16, 16]}>
        {/* Left: Avatar Preview */}
        <Col xs={24} md={10}>
          <Card className="text-center" style={{ borderRadius: 12 }}>
            <Avatar
              src={avatar}
              size={150}
              style={{ border: "3px solid #bce200" }}
            />
            <p className="mt-3 text-gray-600">Live Preview</p>
          </Card>
        </Col>

        {/* Right: Customization Options */}
        <Col xs={24} md={14}>
          <Card style={{ borderRadius: 12 }}>
            <h3 className="font-semibold mb-4">Appearance</h3>

            <div className="space-y-4">
              <div>
                <label className="font-medium">Body Type</label>
                <Select className="w-full" defaultValue="normal">
                  <Select.Option value="normal">Normal</Select.Option>
                  <Select.Option value="slim">Slim</Select.Option>
                  <Select.Option value="muscular">Muscular</Select.Option>
                </Select>
              </div>

              <div>
                <label className="font-medium">Skin Color</label>
                <Slider defaultValue={30} max={100} />
              </div>

              <div>
                <label className="font-medium">Hair Style</label>
                <Select className="w-full" defaultValue="short">
                  <Select.Option value="short">Short</Select.Option>
                  <Select.Option value="long">Long</Select.Option>
                  <Select.Option value="spiky">Spiky</Select.Option>
                </Select>
              </div>

              <div>
                <label className="font-medium">Outfit</label>
                <Select className="w-full" defaultValue="robe">
                  <Select.Option value="robe">Mage Robe</Select.Option>
                  <Select.Option value="armor">Warrior Armor</Select.Option>
                  <Select.Option value="leather">Ranger Leather</Select.Option>
                </Select>
              </div>
            </div>

            <Button type="primary" className="mt-6 w-full">
              Save Avatar
            </Button>
          </Card>
        </Col>
      </Row>
    </motion.div>
  );
};
