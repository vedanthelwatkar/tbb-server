import React, { useEffect, useState } from "react";
import { Button, Flex, Layout, Typography } from "antd";
import "../style/dashboard.css";
import SideBar from "../pages/SideBar";
import { Outlet } from "react-router-dom";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useTheme } from "./ThemeContext";
import logo from "../assets/logo.png";

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const DashboardLayout = () => {
  const isMobile = window.screen.width < 768;
  const [siderOpen, setSiderOpen] = useState(!isMobile);
  const { themeMode } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState();

  useEffect(() => {
    setIsDarkMode(themeMode === "dark");
  }, [themeMode]);

  const handleSider = () => {
    setSiderOpen(!siderOpen);
  };
  return (
    <Layout className="w-[100vw] h-[100vh]">
      <Header
        className="header w-full flex justify-center"
        style={{
          background: isDarkMode ? "#001529" : "#fff",
          borderBottom: isDarkMode
            ? "1px solid rgba(255, 255, 255, 0.12)"
            : "1px solid rgb(240, 240, 240)",
        }}
      >
        <Flex className="items-center gap-2">
          <img src={logo} width={40} height={40} />
          <Title level={4} style={{ margin: 0 }}>
            The Banyan Branch
          </Title>
        </Flex>
      </Header>
      <Layout>
        <Sider
          width="250px"
          className="sider relative"
          collapsed={!siderOpen}
          style={{
            background: isDarkMode ? "#001529" : "#fff",
            borderRight: isDarkMode
              ? "1px solid rgba(255, 255, 255, 0.12)"
              : "1px solid rgb(240, 240, 240)",
          }}
        >
          <SideBar />
          <Flex className="absolute -right-10 bottom-8">
            <Button
              type="text"
              icon={siderOpen ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
              onClick={handleSider}
              className="toggle-button flex h-8 w-8 items-center justify-center rounded-full text-white-600 shadow-lg hover:text-blue-500"
              style={{
                fontSize: "16px",
                transition: "all 0.3s",
              }}
            />
          </Flex>
        </Sider>
        <Content className="content p-12 overflow-auto">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
