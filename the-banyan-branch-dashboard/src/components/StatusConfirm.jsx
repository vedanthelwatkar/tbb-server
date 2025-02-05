import React from "react";
import { Modal, Typography } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const { Text } = Typography;

const StatusConfirm = ({ isOpen, onClose, onConfirm, currentStatus }) => {
  const title = currentStatus ? "Deactivate System" : "Activate System";

  const message = currentStatus
    ? "Are you sure you want to deactivate the system? This will temporarily disable all operations."
    : "Are you sure you want to activate the system? This will enable all operations.";

  return (
    <Modal
      title={
        <div className="flex items-center gap-2">
          <ExclamationCircleOutlined className="text-yellow-500" />
          <Text strong>{title}</Text>
        </div>
      }
      centered
      open={isOpen}
      onCancel={onClose}
      onOk={onConfirm}
      okText={currentStatus ? "Deactivate" : "Activate"}
      cancelText="Cancel"
      okButtonProps={{
        danger: currentStatus,
        type: currentStatus ? "primary" : "default",
      }}
    >
      <Text>{message}</Text>
    </Modal>
  );
};

export default StatusConfirm;
