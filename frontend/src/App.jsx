import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getConstants } from "./redux/slice/BrandingSlice";
import { brandingSelector } from "./redux/selector/selector";
import { applyTheme } from "./helper/applyTheme";
import Home from "./Home";
import { getConfiguration } from "./redux/slice/ConfigurationSlice";
import { getContacts } from "./redux/slice/ContactsSlice";
import { getAppointments } from "./redux/slice/BookSlice";

function App() {
  const dispatch = useDispatch();
  const { brandingData } = useSelector(brandingSelector);

  useEffect(() => {
    dispatch(getConstants());
    dispatch(getConfiguration());
    dispatch(getContacts());
    dispatch(getAppointments());
  }, [dispatch]);

  useEffect(() => {
    if (brandingData.brandTheme) {
      applyTheme(brandingData.brandTheme);
    }
  }, [brandingData]);

  return (
    <div className="min-h-screen bg-tertiary text-textBase font-body">
      <Home />
    </div>
  );
}

export default App;
