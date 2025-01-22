import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Flex,
  Form,
  Input,
  Modal,
  Select,
  notification,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import {
  getConfiguration,
  deleteConfiguration,
  updateConfiguration,
} from "../redux/slice/ConfigurationSlice.js";
import CardTitle from "../components/CardTitle.jsx";
import { configurationSelector } from "../redux/selector/selectors.js";
import { openNotificationWithIcon } from "../helper/index.js";

const { TextArea } = Input;

const options = [
  { key: "home", value: "home", label: "Home" },
  { key: "about", value: "about", label: "About" },
  { key: "services", value: "services", label: "Services" },
  { key: "book", value: "book", label: "Book" },
];

const Configure = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [api, contextHolder] = notification.useNotification({ maxCount: 1 });
  const [currentPage, setCurrentPage] = useState("home");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const { configurationData } = useSelector(configurationSelector);

  useEffect(() => {
    dispatch(getConfiguration("home"));
  }, []);

  useEffect(() => {
    if (configurationData?.result) {
      const formValues = {
        pageName: currentPage,
        contents: configurationData.result.map((item) => ({
          id: item.id,
          title: item.title,
          description: item.description,
        })),
      };
      form.setFieldsValue(formValues);
    }
  }, [configurationData, form]);

  const handleTableSelect = (value) => {
    dispatch(getConfiguration(value));
    setCurrentPage(value);
  };

  const handleSubmit = async (values) => {
    try {
      const updatedData = values.contents.map((item) => ({
        id: item.id,
        title: item.title,
        description: item.description,
      }));

      await dispatch(
        updateConfiguration({ page: currentPage, data: updatedData })
      ).unwrap();

      openNotificationWithIcon(
        api,
        "success",
        "Configuration updated successfully",
        "Configuration"
      );
      dispatch(getConfiguration(currentPage));
    } catch (error) {
      openNotificationWithIcon(
        api,
        "error",
        "Failed to update configuration",
        "Configuration"
      );
    }
  };

  const handleDelete = (remove, index, id) => {
    setItemToDelete({ remove, index, id });
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      if (itemToDelete.id) {
        await dispatch(
          deleteConfiguration({
            id: itemToDelete.id,
            page: currentPage,
          })
        ).unwrap();
        openNotificationWithIcon(
          api,
          "success",
          "Section deleted successfully",
          "Configuration"
        );
      }
      itemToDelete.remove(itemToDelete.index);
      setIsDeleteModalOpen(false);
    } catch (error) {
      openNotificationWithIcon(
        api,
        "error",
        "Failed to delete section",
        "Configuration"
      );
    }
  };

  return (
    <>
      {contextHolder}
      <Card
        title={<CardTitle title="Configure" />}
        className="w-full"
        extra={
          <Button type="primary" onClick={() => form.submit()}>
            Save
          </Button>
        }
      >
        <Form
          layout="vertical"
          className="w-full"
          onFinish={handleSubmit}
          form={form}
        >
          <Form.Item
            label="Page Name"
            name="pageName"
            rules={[{ required: true, message: "This field is required" }]}
          >
            <Select
              className="w-full"
              options={options}
              onChange={handleTableSelect}
              placeholder="Select Table"
              size="large"
              defaultValue="contact"
            />
          </Form.Item>

          <Form.List name="contents">
            {(fields, { add, remove }) => (
              <div className="space-y-4">
                {fields.map(({ key, name, ...restField }, index) => (
                  <Card
                    key={key}
                    title={`Section ${index + 1}`}
                    type="inner"
                    extra={
                      <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() =>
                          handleDelete(
                            remove,
                            name,
                            form.getFieldValue("contents")[index]?.id
                          )
                        }
                      />
                    }
                  >
                    <Flex vertical className="gap-4">
                      <Form.Item
                        {...restField}
                        name={[name, "id"]}
                        hidden={true}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        label="Title"
                        name={[name, "title"]}
                        rules={[
                          { required: true, message: "Title is required" },
                        ]}
                        className="mb-2"
                      >
                        <Input placeholder="Enter Title" size="large" />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        label="Description"
                        name={[name, "description"]}
                        rules={[
                          {
                            required: true,
                            message: "Description is required",
                          },
                        ]}
                      >
                        <TextArea
                          placeholder="Enter Description"
                          style={{ height: "240px" }}
                        />
                      </Form.Item>
                    </Flex>
                  </Card>
                ))}
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add Section
                </Button>
              </div>
            )}
          </Form.List>
        </Form>

        <Modal
          centered
          title="Confirm Delete"
          open={isDeleteModalOpen}
          onOk={confirmDelete}
          onCancel={() => setIsDeleteModalOpen(false)}
          okText="Yes, delete"
          cancelText="Cancel"
          okButtonProps={{ danger: true }}
        >
          <p>Are you sure you want to delete this section?</p>
          <p>This action cannot be undone.</p>
        </Modal>
      </Card>
    </>
  );
};

export default Configure;
