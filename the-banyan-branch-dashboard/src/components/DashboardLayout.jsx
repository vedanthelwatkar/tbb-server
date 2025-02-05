import React, { useEffect, useState } from "react";
import { Button, Flex, Layout, Switch, Typography } from "antd";
import "../style/dashboard.css";
import SideBar from "../pages/SideBar";
import { Outlet } from "react-router-dom";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useTheme } from "./ThemeContext";
import logo from "../assets/logo.png";
import {
  getConstantsSelector,
  statusSelector,
} from "../redux/selector/selectors";
import { useDispatch, useSelector } from "react-redux";
import StatusConfirm from "./StatusConfirm";
import { getStatus, updateStatus } from "../redux/slice/StatusSlice";

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const DashboardLayout = () => {
  const dispatch = useDispatch();
  const isMobile = window.screen.width < 768;
  const [siderOpen, setSiderOpen] = useState(!isMobile);
  const { themeMode } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState();
  const [isActive, setIsActive] = useState(false);
  const { statusData } = useSelector(statusSelector);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);

  const handleStatusClick = () => {
    setIsStatusModalOpen(true);
  };

  const handleSider = () => {
    setSiderOpen(!siderOpen);
  };

  const handleStatusConfirm = () => {
    dispatch(updateStatus({ isActive: Number(!isActive) }));
    setIsStatusModalOpen(false);
    setTimeout(() => {
      dispatch(getStatus());
    }, [200]);
  };

  useEffect(() => {
    dispatch(getStatus());
  }, []);

  useEffect(() => {
    setIsDarkMode(themeMode === "dark");
  }, [themeMode]);

  useEffect(() => {
    setIsActive(statusData?.isActive);
  }, [statusData]);

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
          <Flex gap={8} className="absolute right-8">
            <Typography.Text>Status</Typography.Text>
            <Switch value={isActive} onChange={handleStatusClick} />
          </Flex>
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
          <div
            style={{
              height: "100%",
              overflowY: "auto",
            }}
          >
            <SideBar />
          </div>
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
      <StatusConfirm
        isOpen={isStatusModalOpen}
        onClose={() => setIsStatusModalOpen(false)}
        onConfirm={handleStatusConfirm}
        currentStatus={isActive}
      />
    </Layout>
  );
};

export default DashboardLayout;
