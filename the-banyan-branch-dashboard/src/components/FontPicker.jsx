import React, { useEffect, useState } from "react";
import { Flex, Select } from "antd";
import axios from "axios";
import { appconfig } from "../../appConfig";

const FontPicker = ({ value, onChange }) => {
  const [options, setOptions] = useState([]);
  const fontApi = appconfig.FONT_API;

  useEffect(() => {
    getFonts();
  }, []);

  const getFonts = async () => {
    try {
      const result = await axios.get(
        `https://www.googleapis.com/webfonts/v1/webfonts?key=${fontApi}`
      );

      const selectOptions = result.data.items.map((item) => ({
        label: item.family,
        value: item.family,
      }));
      setOptions(selectOptions);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Flex className="flex-col gap-4">
      <Flex>Select from an array of Google Fonts</Flex>
      <Select
        size="large"
        showSearch
        options={options}
        placeholder="Select"
        value={value}
        onChange={(value) => {
          onChange(value);
        }}
      />
    </Flex>
  );
};

export default FontPicker;
