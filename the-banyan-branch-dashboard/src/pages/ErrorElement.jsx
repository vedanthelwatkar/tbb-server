import React from "react";
import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { BackwardFilled } from "@ant-design/icons";

const ErrorElement = () => {
  const navigate = useNavigate();

  return (
    <div className="error-page flex items-center justify-center min-h-screen bg-gray-100">
      <Result
        status="error"
        title="Oops! Something went wrong"
        subTitle="We apologize for the inconvenience. Please try again or go back to the home page."
        extra={[
          <Button
            key="home"
            type="primary"
            onClick={() => {
              navigate(-1);
            }}
          >
            <BackwardFilled />
            Back
          </Button>,
        ]}
      />
    </div>
  );
};

export default ErrorElement;
