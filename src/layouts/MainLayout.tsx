import { Layout, Menu } from "antd";
import {
  AppstoreOutlined,
  UserOutlined,
  FireOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  StarOutlined,
} from "@ant-design/icons";

const { Sider, Content } = Layout;

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sider
        width={220}
        style={{
          background: "#001529",
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          height: "100vh",
          overflowY: "auto",
        }}
      >
        <div className="p-4 text-center text-white text-xl font-bold h-16 flex items-center justify-center">
          Habit Mania
        </div>

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            { key: "1", icon: <FireOutlined />, label: "Habits" },
            { key: "2", icon: <CalendarOutlined />, label: "Dailies" },
            { key: "3", icon: <CheckCircleOutlined />, label: "To-Dos" },
            { key: "4", icon: <StarOutlined />, label: "Rewards" },
            { key: "5", icon: <UserOutlined />, label: "Profile" },
            { key: "6", icon: <AppstoreOutlined />, label: "Inventory" },
          ]}
        />
      </Sider>

      {/* Main Content */}
      <Layout style={{ marginLeft: 220, background: "#f5f5f5" }}>
        <Content
          style={{
            padding: "24px",
            minHeight: "100vh",
            width: "calc(100vw - 220px)",
            background: "#f5f5f5",
          }}
        >
          <div className="max-w-[2000px] mx-auto">{children}</div>
        </Content>
      </Layout>
    </Layout>
  );
};
