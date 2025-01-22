import React, { useEffect, useState } from "react";
import {
  Layout,
  Card,
  Row,
  Col,
  Statistic,
  Table,
  Radio,
  DatePicker,
  Typography,
  Space,
} from "antd";
import {
  UserOutlined,
  ReloadOutlined,
  EyeOutlined,
  CompressOutlined,
} from "@ant-design/icons";
import { Column } from "@ant-design/plots";
import { useDispatch, useSelector } from "react-redux";
import { getAnalytics } from "../redux/slice/AnalyticsSlice";
import { analyticsSelector } from "../redux/selector/selectors";

const { Content } = Layout;
const { Title } = Typography;
const { RangePicker } = DatePicker;

const Analytics = () => {
  const [timeRange, setTimeRange] = useState("month");
  const dispatch = useDispatch();
  const { analyticsData: analytics } = useSelector(analyticsSelector);
  console.log("analytics: ", analytics);

  useEffect(() => {
    dispatch(getAnalytics());
  }, []);

  const analyticsData = [
    {
      key: "1",
      date: "2023-05-01",
      uniqueUsers: 100,
      repeatedVisits: 50,
      totalVisits: 150,
      serviceClicks: 75,
    },
    {
      key: "2",
      date: "2023-05-02",
      uniqueUsers: 120,
      repeatedVisits: 60,
      totalVisits: 180,
      serviceClicks: 90,
    },
  ];

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Unique Users",
      dataIndex: "uniqueUsers",
      key: "uniqueUsers",
      sorter: (a, b) => a.uniqueUsers - b.uniqueUsers,
    },
    {
      title: "Repeated Visits",
      dataIndex: "repeatedVisits",
      key: "repeatedVisits",
      sorter: (a, b) => a.repeatedVisits - b.repeatedVisits,
    },
    {
      title: "Total Visits",
      dataIndex: "totalVisits",
      key: "totalVisits",
      sorter: (a, b) => a.totalVisits - b.totalVisits,
    },
    {
      title: "Service Clicks",
      dataIndex: "serviceClicks",
      key: "serviceClicks",
      sorter: (a, b) => a.serviceClicks - b.serviceClicks,
    },
  ];

  const visitsChartData = analyticsData
    .map((item) => ({
      date: item.date,
      value: item.totalVisits,
      category: "Total Visits",
    }))
    .concat(
      analyticsData.map((item) => ({
        date: item.date,
        value: item.uniqueUsers,
        category: "Unique Users",
      }))
    );

  const visitsChartConfig = {
    data: visitsChartData,
    xField: "date",
    yField: "value",
    seriesField: "category",
    isGroup: true,
    columnStyle: {
      radius: [20, 20, 0, 0],
    },
  };

  return (
    <Layout className="min-h-screen">
      <Content>
        <Title level={2} className="mb-6">
          Analytics
        </Title>

        <Row gutter={[16, 16]} className="mb-6">
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="Unique Users"
                value={analyticsData.reduce(
                  (sum, item) => sum + item.uniqueUsers,
                  0
                )}
                prefix={<UserOutlined style={{ marginRight: "12px" }} />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="Repeated Visits"
                value={analyticsData.reduce(
                  (sum, item) => sum + item.repeatedVisits,
                  0
                )}
                prefix={<ReloadOutlined style={{ marginRight: "12px" }} />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="Total Visits"
                value={analyticsData.reduce(
                  (sum, item) => sum + item.totalVisits,
                  0
                )}
                prefix={<EyeOutlined style={{ marginRight: "12px" }} />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="Service Clicks"
                value={analyticsData.reduce(
                  (sum, item) => sum + item.serviceClicks,
                  0
                )}
                prefix={<CompressOutlined style={{ marginRight: "12px" }} />}
              />
            </Card>
          </Col>
        </Row>

        <Card className="mb-6">
          <Space direction="vertical" size="middle" style={{ display: "flex" }}>
            <Space>
              <Radio.Group
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
              >
                <Radio.Button value="day">Day</Radio.Button>
                <Radio.Button value="week">Week</Radio.Button>
                <Radio.Button value="month">Month</Radio.Button>
              </Radio.Group>
              <RangePicker />
            </Space>
            <Column {...visitsChartConfig} />
          </Space>
        </Card>

        <Card title="Detailed Analytics">
          <Table
            dataSource={analyticsData}
            columns={columns}
            scroll={{ x: true }}
          />
        </Card>
      </Content>
    </Layout>
  );
};

export default Analytics;
