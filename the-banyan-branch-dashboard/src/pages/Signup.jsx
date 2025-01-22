import React, { useEffect, useState } from "react";
import { Form, Input, Button, Typography, Flex, Checkbox } from "antd";
import {
  UserOutlined,
  LockOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
  MailOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signUpUser, clearSignUpError } from "../redux/slice/AuthSlice";
import { authSelector } from "../redux/selector/selectors";

const { Title, Text } = Typography;

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [showPassword, setShowPassword] = useState(false);
  const { signUpLoading, signUpSuccess, signUpError } =
    useSelector(authSelector);

  const onFinish = (values) => {
    dispatch(signUpUser(values));
  };

  const handleInputChange = () => {
    if (signUpError) {
      dispatch(clearSignUpError());
    }
  };

  useEffect(() => {
    let token = sessionStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [sessionStorage]);

  useEffect(() => {
    if (signUpSuccess) {
      navigate("/login");
    }
  }, [signUpSuccess]);

  useEffect(() => {
    return () => {
      if (signUpError) {
        dispatch(clearSignUpError());
      }
    };
  }, []);

  return (
    <Flex className="min-h-screen items-center justify-center bg-gray-50">
      <Flex
        vertical
        className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-lg"
      >
        <Flex vertical align="center" className="space-y-2">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <UserAddOutlined className="text-2xl text-green-600" />
          </div>
          <Title
            level={2}
            className="text-3xl font-extrabold text-center text-gray-900 m-0"
          >
            Create an Account
          </Title>
          <Text className="text-gray-500 text-center">
            Please fill in your details to sign up
          </Text>
        </Flex>

        <Form
          form={form}
          name="normal_signup"
          className="space-y-6"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onValuesChange={handleInputChange}
        >
          <Flex vertical className="space-y-4">
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your Username!" },
                { min: 3, message: "Username must be at least 3 characters!" },
              ]}
              validateTrigger={["onBlur", "onChange"]}
              style={{ marginBottom: "12px" }}
            >
              <Input
                prefix={<UserOutlined className="text-gray-400" />}
                placeholder="Username"
                size="large"
                className="rounded-lg"
              />
            </Form.Item>

            <Form.Item
              name="name"
              rules={[
                { required: true, message: "Please input your Name!" },
                { min: 2, message: "Name must be at least 2 characters!" },
              ]}
              validateTrigger={["onBlur", "onChange"]}
              style={{ marginBottom: "12px" }}
            >
              <Input
                prefix={<UserOutlined className="text-gray-400" />}
                placeholder="Full Name"
                size="large"
                className="rounded-lg"
              />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please input your Email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
              validateTrigger={["onBlur", "onChange"]}
              style={{ marginBottom: "12px" }}
            >
              <Input
                prefix={<MailOutlined className="text-gray-400" />}
                placeholder="Email"
                size="large"
                className="rounded-lg"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
                { min: 8, message: "Password must be at least 8 characters!" },
              ]}
              validateTrigger={["onBlur", "onChange"]}
              style={{ marginBottom: "12px" }}
            >
              <Input
                prefix={<LockOutlined className="text-gray-400" />}
                suffix={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                  </button>
                }
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                size="large"
                className="rounded-lg"
              />
            </Form.Item>

            {signUpError && (
              <div className="bg-red-50 p-3 rounded-lg">
                <Typography.Text type="danger" className="text-sm">
                  {signUpError?.response?.data?.message || "An error occurred"}
                </Typography.Text>
              </div>
            )}

            <Form.Item style={{ marginBottom: 0 }}>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full rounded-lg h-10"
                loading={signUpLoading}
              >
                Sign up
              </Button>
            </Form.Item>
          </Flex>
        </Form>

        <Flex justify="center" className="border-t pt-6">
          <Text className="text-gray-600">
            Already have an account?{" "}
            <Button
              type="link"
              className="p-0"
              onClick={() => navigate("/login")}
            >
              Sign in
            </Button>
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Signup;
