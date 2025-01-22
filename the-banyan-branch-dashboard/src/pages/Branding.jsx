import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  Flex,
  ColorPicker,
  Button,
  Form,
  notification,
  Space,
} from "antd";
import CardTitle from "../components/CardTitle";
import {
  getBranding,
  resetUpdateBranding,
  updateBranding,
} from "../redux/slice/BrandingSlice";
import { useDispatch, useSelector } from "react-redux";
import { brandingSelector } from "../redux/selector/selectors";
import { openNotificationWithIcon } from "../helper";
import FontPicker from "../components/FontPicker";
import { ReloadOutlined } from "@ant-design/icons";

const Branding = () => {
  const isMobile = window.screen.width < 768;
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const {
    brandingData,
    updateBrandingSuccess,
    updateBrandingError,
    updateBrandingLoading,
  } = useSelector(brandingSelector);

  const [primaryColor, setPrimaryColor] = useState("");
  const [secondaryColor, setSecondaryColor] = useState("");
  const [tertiaryColor, setTertiaryColor] = useState("");
  const [textBaseColor, setTextBaseColor] = useState("");
  const [textSecondaryColor, setTextSecondaryColor] = useState("");
  const [themeFont, setThemeFont] = useState("");

  const [api, contextHolder] = notification.useNotification({ maxCount: 1 });

  const iframeRef = useRef(null);

  const handleReload = () => {
    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src;
    }
  };

  const handleSubmit = (values) => {
    dispatch(updateBranding(values));
    handleReload();
  };

  const handleColorChange = (color, field) => {
    const hexColor = color.toHexString();
    form.setFieldsValue({ [field]: hexColor });
    switch (field) {
      case "primary_color":
        setPrimaryColor(hexColor);
        break;
      case "secondary_color":
        setSecondaryColor(hexColor);
        break;
      case "tertiary_color":
        setTertiaryColor(hexColor);
        break;
      case "text_base_color":
        setTextBaseColor(hexColor);
        break;
      case "text_secondary_color":
        setTextSecondaryColor(hexColor);
        break;
    }
  };

  const handleFontChange = (font) => {
    form.setFieldValue("theme_font", font);
    setThemeFont(font);
  };

  useEffect(() => {
    dispatch(getBranding());
  }, [dispatch]);

  useEffect(() => {
    if (brandingData?.brandTheme) {
      const {
        primary_color,
        secondary_color,
        tertiary_color,
        text_base_color,
        text_secondary_color,
        theme_font,
      } = brandingData.brandTheme;
      form.setFieldsValue(brandingData.brandTheme);
      setPrimaryColor(primary_color);
      setSecondaryColor(secondary_color);
      setTertiaryColor(tertiary_color);
      setTextBaseColor(text_base_color);
      setTextSecondaryColor(text_secondary_color);
      setThemeFont(theme_font);
    }
  }, [brandingData, form]);

  useEffect(() => {
    if (updateBrandingSuccess) {
      openNotificationWithIcon(api, "success", "Branding updated", "Branding");
      dispatch(resetUpdateBranding());
    }
    if (updateBrandingError) {
      openNotificationWithIcon(
        api,
        "error",
        "Branding update failed",
        "Branding"
      );
    }
  }, [updateBrandingSuccess, updateBrandingError]);

  return (
    <>
      {contextHolder}
      <Card
        bordered
        title={<CardTitle title="Branding" />}
        extra={
          <Button
            type="primary"
            onClick={() => form.submit()}
            disabled={updateBrandingLoading}
          >
            Save
          </Button>
        }
      >
        <Flex gap={24} className="w-full" vertical={isMobile}>
          <Form
            name="brandTheme"
            onFinish={handleSubmit}
            form={form}
            className="flex-1"
          >
            <Space direction="vertical" size="large" className="w-full">
              <Flex gap={16} wrap="wrap">
                <ColorPickerItem
                  name="primary_color"
                  title="Primary Color"
                  value={primaryColor}
                  onChange={(color) =>
                    handleColorChange(color, "primary_color")
                  }
                />
                <ColorPickerItem
                  name="secondary_color"
                  title="Secondary Color"
                  value={secondaryColor}
                  onChange={(color) =>
                    handleColorChange(color, "secondary_color")
                  }
                />
                <ColorPickerItem
                  name="tertiary_color"
                  title="Tertiary Color"
                  value={tertiaryColor}
                  onChange={(color) =>
                    handleColorChange(color, "tertiary_color")
                  }
                />
                <ColorPickerItem
                  name="text_base_color"
                  title="Text Base Color"
                  value={textBaseColor}
                  onChange={(color) =>
                    handleColorChange(color, "text_base_color")
                  }
                />
                <ColorPickerItem
                  name="text_secondary_color"
                  title="Text Secondary Color"
                  value={textSecondaryColor}
                  onChange={(color) =>
                    handleColorChange(color, "text_secondary_color")
                  }
                />
              </Flex>
              <Form.Item
                rules={[{ required: true, message: "Please select a font" }]}
                name="theme_font"
              >
                <Card hoverable type="inner" title="Font Family">
                  <FontPicker value={themeFont} onChange={handleFontChange} />
                </Card>
              </Form.Item>
            </Space>
          </Form>
          <Card
            className="flex-1"
            title="Preview"
            extra={
              <Button
                icon={<ReloadOutlined />}
                onClick={handleReload}
                type="primary"
              >
                Reload
              </Button>
            }
          >
            <iframe
              ref={iframeRef}
              src="https://the-banyan-branch.vercel.app/"
              title="Website Preview"
              className="w-full h-[600px] border-0"
            />
          </Card>
        </Flex>
      </Card>
    </>
  );
};

const ColorPickerItem = ({ name, title, value, onChange }) => (
  <Form.Item
    rules={[
      { required: true, message: `Please select a ${title.toLowerCase()}` },
    ]}
    name={name}
    className="flex-1 min-w-[200px]"
  >
    <Card hoverable type="inner" title={title}>
      <ColorPicker size="large" showText value={value} onChange={onChange} />
    </Card>
  </Form.Item>
);

export default Branding;
