import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiEndPoints, appconfig, returnHeader } from "../../../appConfig";

export const getStatus = createAsyncThunk(
  "getStatus",
  async (data, { rejectWithValue }) => {
    try {
      let response = await axios({
        method: "GET",
        url: `${appconfig.BASE_URL}${ApiEndPoints.GET_STATUS}`,
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

const StatusSlice = createSlice({
  name: "Status",
  initialState: {
    statusData: null,
    statusSuccess: false,
    statusError: false,
    statusLoading: false,
  },
  extraReducers: (builder) => {
    builder.addCase(getStatus.pending, (state) => {
      state.statusLoading = true;
      state.statusSuccess = false;
      state.statusError = false;
    });
    builder.addCase(getStatus.fulfilled, (state, action) => {
      state.statusLoading = false;
      state.statusSuccess = true;
      state.statusData = action.payload.data;
      state.statusError = false;
    });
    builder.addCase(getStatus.rejected, (state, action) => {
      state.statusLoading = false;
      state.statusSuccess = false;
      state.statusError = true;
      state.statusData = action.payload;
    });
  },
});

export default StatusSlice.reducer;
