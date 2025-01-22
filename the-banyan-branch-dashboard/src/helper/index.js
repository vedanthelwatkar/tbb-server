export const openNotificationWithIcon = (api, type, message, title) => {
  if (["success", "error"].includes(type)) {
    api[type]({
      message: title,
      description: message,
      duration: 3,
    });
  } else {
    console.error("Invalid notification type:", type);
  }
};
