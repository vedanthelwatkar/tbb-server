import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiEndPoints, appconfig, returnHeader } from "../../../appConfig";
import { act } from "react";

export const getAppointments = createAsyncThunk(
  "getAppointments",
  async (data, { rejectWithValue }) => {
    try {
      let response = await axios({
        method: "GET",
        url: `${appconfig.BASE_URL}${ApiEndPoints.BOOK}`,
        headers: returnHeader(true),
      });
      return response;
    } catch (e) {
      console.error(e);
      return rejectWithValue(e);
    }
  }
);

export const bookAppointments = createAsyncThunk(
  "bookAppointments",
  async (data, { rejectWithValue }) => {
    try {
      let response = await axios({
        method: "POST",
        url: `${appconfig.BASE_URL}${ApiEndPoints.BOOK}`,
        data: data,
        headers: returnHeader(true),
      });
      return response;
    } catch (e) {
      console.error(e);
      return rejectWithValue(e);
    }
  }
);

const BookSlice = createSlice({
  name: "Book",
  initialState: {
    bookData: {},
    bookSuccess: false,
    bookError: false,
    bookLoading: false,

    appointmentData: {},
    appointmentSuccess: false,
    appointmentError: false,
    appointmentLoading: false,
  },
  reducers: {
    resetBooking: (state) => {
      state.appointmentData = {};
      state.appointmentSuccess = false;
      state.appointmentError = false;
      state.appointmentLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAppointments.pending, (state) => {
      state.bookLoading = true;
      state.bookSuccess = false;
      state.bookError = false;
    });
    builder.addCase(getAppointments.fulfilled, (state, action) => {
      state.bookLoading = false;
      state.bookSuccess = true;
      state.bookData = action.payload.data;
      state.bookError = false;
    });
    builder.addCase(getAppointments.rejected, (state, action) => {
      state.bookLoading = false;
      state.bookSuccess = false;
      state.bookError = true;
      state.data = action.payload;
    });
    builder.addCase(bookAppointments.pending, (state) => {
      state.appointmentLoading = true;
      state.appointmentSuccess = false;
      state.appointmentError = false;
    });
    builder.addCase(bookAppointments.fulfilled, (state, action) => {
      state.appointmentLoading = false;
      state.appointmentSuccess = true;
      state.appointmentData = action.payload.data;
      state.appointmentError = false;
    });
    builder.addCase(bookAppointments.rejected, (state, action) => {
      state.appointmentLoading = false;
      state.appointmentSuccess = false;
      state.appointmentError = action.payload.response.data;
      state.data = action.payload;
    });
  },
});

export const { resetBooking } = BookSlice.actions;

export default BookSlice.reducer;
