import { Flex, Menu } from "antd";
import React, { useEffect, useState } from "react";
import {
  CalendarOutlined,
  HomeFilled,
  HomeOutlined,
  LineChartOutlined,
  LogoutOutlined,
  MoonFilled,
  OrderedListOutlined,
  SettingOutlined,
  SunFilled,
  TeamOutlined,
  ToolOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../components/ThemeContext";
import { useDispatch } from "react-redux";
import { resetAuth } from "../redux/slice/AuthSlice";

const menuItems = [
  {
    key: "",
    label: "Home",
    icon: <HomeOutlined />,
  },
  {
    key: "analytics",
    label: "Analytics",
    icon: <LineChartOutlined />,
  },
  {
    key: "branding",
    label: "Branding",
    icon: <SettingOutlined />,
  },
  {
    key: "configure",
    label: "Configure",
    icon: <ToolOutlined />,
  },
  {
    key: "profile",
    label: "Profile",
    icon: <UserOutlined />,
  },
  {
    key: "appointments",
    label: "Appointments",
    icon: <CalendarOutlined />,
  },
];

const SideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [activeKey, setActiveKey] = useState();
  const { toggleTheme, themeMode } = useTheme();

  const otherItems = [
    {
      key: "mode",
      label:
        themeMode == "dark" ? "Switch to Light Theme" : " Switch to Dark Theme",
      icon: themeMode == "dark" ? <SunFilled /> : <MoonFilled />,
    },
    {
      key: "logout",
      label: <span style={{ color: "var(--color-error)" }}>Logout</span>,
      icon: <LogoutOutlined style={{ color: "var(--color-error)" }} />,
    },
  ];

  const handleMenuClick = ({ key }) => {
    if (key == "mode") {
      toggleTheme();
      return;
    }
    if (key == "logout") {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
      toggleTheme("light");
      navigate("/login");
      dispatch(resetAuth());
      return;
    }
    navigate(`/${key}`);
    setActiveKey(key);
  };

  useEffect(() => {
    const path = location.pathname.split("/").pop();
    if (path) {
      setActiveKey(path);
    } else {
      setActiveKey("");
    }
  }, [location]);

  return (
    <Flex vertical className="w-full h-full justify-between">
      <Flex vertical className="mt-4">
        <Menu
          onClick={handleMenuClick}
          className="flex flex-col bg-transparent"
          style={{
            borderInlineEnd: "none",
          }}
          mode="inline"
          items={menuItems}
          selectedKeys={[activeKey]}
        />
      </Flex>
      <Flex vertical className="mb-6">
        <Menu
          onClick={handleMenuClick}
          className="flex flex-col bg-transparent"
          style={{
            borderInlineEnd: "none",
          }}
          mode="inline"
          items={otherItems}
          selectedKeys={[activeKey]}
        />
      </Flex>
    </Flex>
  );
};

export default SideBar;
