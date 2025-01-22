import { combineReducers, configureStore } from "@reduxjs/toolkit";
import BrandingSlice from "../slice/BrandingSlice";
import ConfigurationSlice from "../slice/ConfigurationSlice";
import ContactsSlice from "../slice/ContactsSlice";
import BookSlice from "../slice/BookSlice";

export const reducer = {
  BrandingSlice: BrandingSlice,
  ConfigurationSlice: ConfigurationSlice,
  ContactsSlice: ContactsSlice,
  BookSlice: BookSlice,
};

const rootReducer = combineReducers(reducer);

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});
