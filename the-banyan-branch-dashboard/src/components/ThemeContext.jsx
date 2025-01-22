import React, { createContext, useState, useContext } from "react";
import { ConfigProvider, theme } from "antd";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState(
    localStorage.getItem("theme") || "light"
  );

  const toggleTheme = (mode) => {
    const newTheme = mode || (themeMode === "light" ? "dark" : "light");
    setThemeMode(newTheme);
    localStorage.setItem("theme", newTheme);

    const sider = document.getElementsByClassName("sider")[0];
    const header = document.getElementsByClassName("header")[0];
    const toggleButton = document.getElementsByClassName("toggle-button")[0];

    if (sider) {
      sider.style.backgroundColor = newTheme === "light" ? "#fff" : "#001529";
      sider.style.borderRight =
        newTheme === "light"
          ? "1px solid rgb(240, 240, 240)"
          : "1px solid rgba(255, 255, 255, 0.12)";
    }

    if (header) {
      header.style.backgroundColor = newTheme === "light" ? "#fff" : "#001529";
      header.style.borderBottom =
        newTheme === "light"
          ? "1px solid rgb(240, 240, 240)"
          : "1px solid rgba(255, 255, 255, 0.12)";
    }

    if (toggleButton) {
      toggleButton.style.backgroundColor =
        newTheme === "light" ? "#fff" : "#001529";
    }
  };

  const themeState =
    themeMode === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm;

  return (
    <ThemeContext.Provider value={{ themeState, toggleTheme, themeMode }}>
      <ConfigProvider
        theme={{
          token: {},
          algorithm: themeState,
        }}
      >
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
