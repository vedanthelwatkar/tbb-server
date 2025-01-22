import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiEndPoints, appconfig, returnHeader } from "../../../appConfig";

export const getAnalytics = createAsyncThunk(
  "getAnalytics",
  async (data, { rejectWithValue }) => {
    try {
      let response = await axios({
        method: "GET",
        url: `${appconfig.BASE_URL}${ApiEndPoints.GET_ANALYTICS}`,
        headers: returnHeader(true),
      });
      return response;
    } catch (e) {
      console.error(e);
      return rejectWithValue(e);
    }
  }
);

const GetConstantsSlice = createSlice({
  name: "getAnalytics",
  initialState: {
    analyticsData: null,
    analyticsError: null,
    analyticsLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAnalytics.pending, (state) => {
      state.analyticsLoading = true;
    });
    builder.addCase(getAnalytics.fulfilled, (state, action) => {
      state.analyticsLoading = false;
      state.analyticsData = action.payload.data;
      state.analyticsError = false;
    });
    builder.addCase(getAnalytics.rejected, (state, action) => {
      state.analyticsLoading = false;
      state.analyticsError = true;
      state.analyticsData = action.payload;
    });
  },
});

export default GetConstantsSlice.reducer;
