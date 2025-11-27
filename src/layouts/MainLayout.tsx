import { Layout, Menu } from "antd";
import {
  AppstoreOutlined,
  UserOutlined,
  FireOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Sider, Content } = Layout;

export const MainLayout = ({ children }: { children: React.ReactNode }) => {

  const navigate = useNavigate();

  const handleMenuClick = (info: any) => {
    navigate(info.key); // key holds the route path
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sider
        width={220}
        style={{
          background: "#000000",
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
          onClick={handleMenuClick}
          defaultSelectedKeys={["/"]}
          items={[
            { key: "/", icon: <FireOutlined />, label: "Habits" },
            { key: "/daily", icon: <CalendarOutlined />, label: "Dailies" },
            { key: "/todo", icon: <CheckCircleOutlined />, label: "To-Dos" },
            { key: "/avatar", icon: <StarOutlined />, label: "Avatar Builder" },
            { key: "/profile", icon: <UserOutlined />, label: "Profile" },
            { key: "/inventory", icon: <AppstoreOutlined />, label: "Inventory" },
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
            background: "#353535ff",
          }}
        >
          <div className="max-w-[2000px] mx-auto">{children}</div>
        </Content>
      </Layout>
    </Layout>
  );
};
