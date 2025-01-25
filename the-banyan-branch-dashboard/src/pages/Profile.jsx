import React, { useEffect, useState } from "react";
import {
  Card,
  Avatar,
  Typography,
  Row,
  Col,
  Flex,
  Input,
  Button,
  Tooltip,
  Form,
  notification,
} from "antd";
import { UserOutlined, EditOutlined, SaveOutlined } from "@ant-design/icons";
import CardTitle from "../components/CardTitle";
import { getProfile, updateProfile } from "../redux/slice/ProfileSlice";
import { useDispatch, useSelector } from "react-redux";
import { profileSelector } from "../redux/selector/selectors";
import { openNotificationWithIcon } from "../helper";
import { resetUpdateBranding } from "../redux/slice/BrandingSlice";

const { Text } = Typography;

const Profile = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [api, contextHolder] = notification.useNotification({ maxCount: 1 });
  const { profileData, updateProfileSuccess, updateProfileError } =
    useSelector(profileSelector);
  const isMobile = window.screen.width < 768;

  const handleSave = () => {
    form.validateFields().then((values) => {
      dispatch(updateProfile(values));
      setIsEditing(false);
    });
  };

  useEffect(() => {
    dispatch(getProfile());
    dispatch(resetUpdateBranding());
  }, [dispatch]);

  useEffect(() => {
    if (profileData) {
      form.setFieldsValue(profileData);
    }
  }, [profileData, form]);

  useEffect(() => {
    if (updateProfileSuccess) {
      openNotificationWithIcon(api, "success", "Profile updated", "Profile");
    }
    if (updateProfileError) {
      openNotificationWithIcon(
        api,
        "error",
        "Profile update failed",
        "Profile"
      );
    }
  }, [updateProfileSuccess, updateProfileError]);

  return (
    <Flex
      style={{
        height: "50%",
        width: "100%",
      }}
      vertical
    >
      {contextHolder}
      <Card
        title={<CardTitle title="Profile" />}
        extra={
          <Tooltip title={isEditing ? "Save changes" : "Edit profile"}>
            <Button
              type="text"
              icon={isEditing ? <SaveOutlined /> : <EditOutlined />}
              onClick={isEditing ? handleSave : () => setIsEditing(true)}
            />
          </Tooltip>
        }
      >
        <Form form={form} className={isEditing ? "" : "hide-asterisk"}>
          <Row gutter={[16, 16]} align="middle">
            {!isMobile && (
              <Col xs={24} sm={8} style={{ textAlign: "center" }}>
                <Avatar size={200} icon={<UserOutlined />} />
              </Col>
            )}
            <Col xs={24} sm={16}>
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Please input your name!" }]}
              >
                {isEditing ? (
                  <Input size="large" placeholder="Enter Name" />
                ) : (
                  <Text className="text-base">
                    {" - "}
                    {form.getFieldValue("name")}
                  </Text>
                )}
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: "Please input a valid email!",
                  },
                ]}
              >
                {isEditing ? (
                  <Input size="large" placeholder="Email" />
                ) : (
                  <Text className="text-base">
                    {" - "}
                    {form.getFieldValue("email")}
                  </Text>
                )}
              </Form.Item>
              <Form.Item
                label="Phone Number"
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                ]}
              >
                {isEditing ? (
                  <Input size="large" placeholder="Phone" />
                ) : (
                  <Text className="text-base">
                    {" - "}
                    {form.getFieldValue("phone")}
                  </Text>
                )}
              </Form.Item>
              <Form.Item
                label="Address"
                name="address"
                rules={[
                  {
                    required: true,
                    message: "Please input your address number!",
                  },
                ]}
              >
                {isEditing ? (
                  <Input size="large" placeholder="Address" />
                ) : (
                  <Text className="text-base">
                    {" - "}
                    {form.getFieldValue("address")}
                  </Text>
                )}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>

      <div className="w-full py-3 text-white-600 text-center text-sm">
        <Text
          className={`${isMobile} ? "text-base" : "text-sm"`}
          type="secondary"
        >
          The information displayed in this profile will be visible to clients.
          Please ensure all details are accurate and professional.
        </Text>
      </div>
    </Flex>
  );
};

export default Profile;
