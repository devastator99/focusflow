import { useState } from "react";
import { Tabs, Card, Row, Col, Button } from "antd";
import { motion } from "framer-motion";
import { AvatarRenderer } from "../components/gamification/AvatarBuilder";
const parts = {
  hair: ["hair1.png", "hair2.png", "hair3.png"],
  eyes: ["eyes1.png", "eyes2.png"],
  clothes: ["shirt1.png", "shirt2.png"],
  body: ["body1.png", "body2.png"],
  accessory: ["glasses1.png", "sword1.png"],
  background: ["bg1.png", "bg2.png"],
};

export const AvatarBuilderUI = () => {
  const [avatar, setAvatar] = useState({
    body: "body1.png",
    hair: "hair1.png",
    eyes: "eyes1.png",
    clothes: "shirt1.png",
    accessory: "glasses1.png",
    background: "bg1.png",
  });

  const updatePart = (key: string, value: string) => {
    setAvatar((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Customize Your Avatar</h1>

      <div className="flex gap-8">
        {/* Preview */}
        <div className="border rounded-lg p-4 shadow">
          <AvatarRenderer config={avatar} />
        </div>

        {/* Editor */}
        <div className="flex-1">
          <Tabs
            items={(Object.keys(parts) as Array<keyof typeof parts>).map(
              (category) => ({
                key: category,
                label: category.toUpperCase(),
                children: (
                  <Row gutter={[16, 16]}>
                    {parts[category].map((img) => (
                      <Col span={6} key={img}>
                        <Card
                          hoverable
                          style={{
                            border:
                              avatar[category] === img
                                ? "2px solid #1677ff"
                                : undefined,
                          }}
                          onClick={() => updatePart(category, img)}
                          cover={
                            <motion.img
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3 }}
                              src={`/src/assets/char/${category}/${img}`}
                              className="p-2"
                            />
                          }
                        ></Card>
                      </Col>
                    ))}
                  </Row>
                ),
              })
            )}
          />

          <Button type="primary" size="large" className="mt-4">
            Save Avatar
          </Button>
        </div>
      </div>
    </div>
  );
};
