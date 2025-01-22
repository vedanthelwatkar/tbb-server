import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Typography,
  Flex,
  Checkbox,
  notification,
} from "antd";
import {
  UserOutlined,
  LockOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUser,
  clearLoginError,
  resetSignUp,
} from "../redux/slice/AuthSlice";
import { authSelector } from "../redux/selector/selectors";
import { openNotificationWithIcon } from "../helper";

const { Title, Text } = Typography;

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification({ maxCount: 1 });
  const [showPassword, setShowPassword] = useState(false);
  const { loginLoading, loginData, loginSuccess, loginError, signUpSuccess } =
    useSelector(authSelector);

  const onFinish = (values) => {
    dispatch(loginUser(values));
  };

  const handleInputChange = () => {
    if (loginError) {
      dispatch(clearLoginError());
    }
  };

  useEffect(() => {
    let token = sessionStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [sessionStorage]);

  useEffect(() => {
    if (loginSuccess && loginData) {
      sessionStorage.setItem("token", loginData.token);
      sessionStorage.setItem("user", loginData.user.name);
      navigate("/");
    }
  }, [loginSuccess]);

  useEffect(() => {
    if (signUpSuccess) {
      openNotificationWithIcon(
        api,
        "success",
        "User created successfully!",
        "Signup"
      );
      dispatch(resetSignUp());
    }
  }, [signUpSuccess]);

  useEffect(() => {
    return () => {
      if (loginError) {
        dispatch(clearLoginError());
      }
    };
  }, []);

  return (
    <>
      {contextHolder}
      <Flex className="min-h-screen items-center justify-center bg-gray-50">
        <Flex
          vertical
          className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-lg"
        >
          <Flex vertical align="center" className="space-y-2">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <UserOutlined className="text-2xl text-blue-600" />
            </div>
            <Title
              level={2}
              className="text-3xl font-extrabold text-center text-gray-900 m-0"
            >
              Welcome Back
            </Title>
            <Text className="text-gray-500 text-center">
              Please enter your credentials to continue
            </Text>
          </Flex>

          <Form
            form={form}
            name="normal_login"
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
                  {
                    min: 3,
                    message: "Username must be at least 3 characters!",
                  },
                ]}
                style={{
                  marginBottom: "12px",
                }}
                validateTrigger={["onBlur", "onChange"]}
              >
                <Input
                  prefix={<UserOutlined className="text-gray-400" />}
                  placeholder="Username"
                  size="large"
                  className="rounded-lg"
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your Password!" },
                  {
                    min: 6,
                    message: "Password must be at least 6 characters!",
                  },
                ]}
                style={{
                  margin: 0,
                }}
                validateTrigger={["onBlur", "onChange"]}
              >
                <Input
                  prefix={<LockOutlined className="text-gray-400" />}
                  suffix={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeInvisibleOutlined />
                      ) : (
                        <EyeOutlined />
                      )}
                    </button>
                  }
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  size="large"
                  className="rounded-lg"
                />
              </Form.Item>

              {loginError && (
                <div className="bg-red-50 p-3 rounded-lg">
                  <Typography.Text type="danger" className="text-sm">
                    {loginError?.response?.data?.message || "An error occurred"}
                  </Typography.Text>
                </div>
              )}

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full rounded-lg h-10"
                  loading={loginLoading}
                >
                  Sign in
                </Button>
              </Form.Item>
            </Flex>
          </Form>

          <Flex justify="center" className="border-t pt-6">
            <Text className="text-gray-600">
              Don't have an account?{" "}
              <Button
                type="link"
                className="p-0"
                onClick={() => navigate("/signup")}
              >
                Sign up now
              </Button>
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default Login;
