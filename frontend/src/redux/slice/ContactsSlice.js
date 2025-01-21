import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiEndPoints, appconfig, returnHeader } from "../../../appConfig";

export const getContacts = createAsyncThunk(
  "getContacts",
  async (data, { rejectWithValue }) => {
    try {
      let response = await axios({
        method: "GET",
        url: `${appconfig.BASE_URL}${ApiEndPoints.GET_PROFILE}`,
        headers: returnHeader(true),
      });
      return response;
    } catch (e) {
      console.error(e);
      return rejectWithValue(e);
    }
  }
);

const ContactsSlice = createSlice({
  name: "Contacts",
  initialState: {
    contactsData: {},
    contactsSuccess: false,
    contactsError: false,
    contactsLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getContacts.pending, (state) => {
      state.contactsLoading = true;
      state.contactsSuccess = false;
      state.contactsError = false;
    });
    builder.addCase(getContacts.fulfilled, (state, action) => {
      state.contactsLoading = false;
      state.contactsSuccess = true;
      state.contactsData = action.payload.data;
      state.contactsError = false;
    });
    builder.addCase(getContacts.rejected, (state, action) => {
      state.contactsLoading = false;
      state.contactsSuccess = false;
      state.contactsError = true;
      state.data = action.payload;
    });
  },
});

export default ContactsSlice.reducer;
