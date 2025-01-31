import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getConstants } from "./redux/slice/GetConstantsSlice.js";
import { getConstantsSelector } from "./redux/selector/selectors.js";
import Analytics from "./pages/Analytics.jsx";
import Branding from "./pages/Branding.jsx";
import Configure from "./pages/Configure.jsx";
import Profile from "./pages/Profile.jsx";
import ErrorElement from "./pages/ErrorElement.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import WelcomePage from "./pages/WelcomePage.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Appointments from "./pages/Appointments.jsx";

function setRootProperty(property, value) {
  if (value) {
    document.documentElement.style.setProperty(property, value);
  }
}

const AppRoutes = () => {
  const dispatch = useDispatch();
  const { data } = useSelector(getConstantsSelector);

  useEffect(() => {
    dispatch(getConstants({ isDashboard: 1 }));
  }, [dispatch]);

  useEffect(() => {
    if (data?.brandTheme) {
      setRootProperty(
        "--color-primary",
        data.brandTheme.themeColors?.primary_color
      );
      setRootProperty(
        "--color-secondary",
        data.brandTheme.themeColors?.secondary_color
      );
      setRootProperty(
        "--color-tertiary",
        data.brandTheme.themeColors?.tertiary_color
      );
      setRootProperty("--font-family", data.brandTheme.theme_font);
    }
  }, [data]);

  return (
    <Routes>
      <Route
        path="/login"
        element={<Login />}
        errorElement={<ErrorElement />}
      />
      <Route
        path="/signup"
        element={<Signup />}
        errorElement={<ErrorElement />}
      />
      <Route path="/" element={<Dashboard />} errorElement={<ErrorElement />}>
        <Route
          path=""
          element={<WelcomePage />}
          errorElement={<ErrorElement />}
        />
        <Route
          path="analytics"
          element={<Analytics />}
          errorElement={<ErrorElement />}
        />
        <Route
          path="branding"
          element={<Branding />}
          errorElement={<ErrorElement />}
        />
        <Route
          path="configure"
          element={<Configure />}
          errorElement={<ErrorElement />}
        />
        <Route
          path="profile"
          element={<Profile />}
          errorElement={<ErrorElement />}
        />
        <Route
          path="appointments"
          element={<Appointments />}
          errorElement={<ErrorElement />}
        />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
