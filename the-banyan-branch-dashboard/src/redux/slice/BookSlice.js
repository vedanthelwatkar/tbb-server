import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiEndPoints, appconfig, returnHeader } from "../../../appConfig";

export const getAppointments = createAsyncThunk(
  "getAppointments",
  async (sort, { rejectWithValue }) => {
    try {
      let response = await axios({
        method: "GET",
        url: `${appconfig.BASE_URL}${ApiEndPoints.BOOK}?sort=${sort}`,
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
  },
  reducers: {},
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
  },
});

export default BookSlice.reducer;
