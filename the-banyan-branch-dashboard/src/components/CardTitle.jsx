import { Typography } from "antd";
import React from "react";

const CardTitle = ({ title }) => {
  return (
    <Typography.Title style={{ margin: 0 }} level={4}>
      {title}
    </Typography.Title>
  );
};

export default CardTitle;
