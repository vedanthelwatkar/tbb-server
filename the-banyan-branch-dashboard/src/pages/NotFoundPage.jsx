import React from "react";
import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { BackwardFilled } from "@ant-design/icons";
import { useTheme } from "../components/ThemeContext";

const NotFoundPage = () => {
  const navigate = useNavigate();
  const { themeMode } = useTheme();

  return (
    <div
      className="not-found-page flex items-center justify-center min-h-screen"
      style={{
        background: themeMode == "light" ? "#fff" : "#001529",
      }}
    >
      <Result
        status="404"
        title="Page Not Found"
        subTitle="Sorry, the page you visited does not exist."
        extra={[
          <Button key="home" type="primary" onClick={() => navigate(-1)}>
            <BackwardFilled />
            Back
          </Button>,
        ]}
      />
    </div>
  );
};

export default NotFoundPage;
