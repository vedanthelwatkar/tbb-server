import React, { useEffect, useState } from "react";
import { Layout, Typography, Card, Row, Col, Button } from "antd";
import {
  StockOutlined,
  FormatPainterOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { useTheme } from "../components/ThemeContext";
import { useNavigate } from "react-router-dom";
import { resetUpdateProfile } from "../redux/slice/ProfileSlice";
import { resetUpdateConfiguration } from "../redux/slice/ConfigurationSlice";
import { resetUpdateBranding } from "../redux/slice/BrandingSlice";

const { Content } = Layout;
const { Title, Text } = Typography;

const WelcomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { themeMode } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState();

  useEffect(() => {
    setIsDarkMode(themeMode === "dark");
  }, [dispatch, themeMode]);

  useEffect(() => {
    dispatch(resetUpdateBranding());
    dispatch(resetUpdateProfile());
    dispatch(resetUpdateConfiguration());
  }, []);

  return (
    <Layout className={`therapy-dashboard ${isDarkMode ? "dark" : "light"}`}>
      <Content className="dashboard-content">
        <div className="dashboard-container">
          <Title level={2} className="welcome-message">
            Welcome back, {sessionStorage.getItem("user") || "Client"}
          </Title>
          <Text className="subheading">
            Your journey to wellness continues here.
          </Text>
          <Row gutter={[16, 16]} className="dashboard-cards">
            <Col xs={24} sm={8}>
              <Card className="dashboard-card">
                <FormatPainterOutlined className="card-icon" />
                <Title level={3}>Branding</Title>
                <Button type="primary" onClick={() => navigate("branding")}>
                  Update Themes
                </Button>
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card className="dashboard-card">
                <StockOutlined className="card-icon" />
                <Title level={3}>Analytics</Title>
                <Button type="primary" nonClick={() => navigate("analytics")}>
                  Check Analytics
                </Button>
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card className="dashboard-card">
                <EditOutlined className="card-icon" />
                <Title level={3}>Configure</Title>
                <Button type="primary" onClick={() => navigate("configure")}>
                  Update Sections
                </Button>
              </Card>
            </Col>
          </Row>
          <Text className="footer-text">
            Remember, every step forward is progress. Take care of yourself
            today.
          </Text>
        </div>
      </Content>
    </Layout>
  );
};

export default WelcomePage;
