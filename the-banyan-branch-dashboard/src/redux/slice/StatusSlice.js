import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiEndPoints, appconfig, returnHeader } from "../../../appConfig";

export const updateStatus = createAsyncThunk(
  "updateStatus",
  async (data, { rejectWithValue }) => {
    try {
      let response = await axios({
        method: "PUT",
        url: `${appconfig.BASE_URL}${ApiEndPoints.UPDATE_STATUS}`,
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

    updateStatusLoading: false,
    updateStatusSuccess: false,
    updateStatusError: false,
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
    builder.addCase(updateStatus.pending, (state) => {
      state.updateStatusLoading = true;
      state.updateStatusSuccess = false;
      state.updateStatusError = false;
    });
    builder.addCase(updateStatus.fulfilled, (state, action) => {
      state.updateStatusLoading = false;
      state.updateStatusSuccess = action.payload;
      state.updateStatusError = false;
    });
    builder.addCase(updateStatus.rejected, (state, action) => {
      state.updateStatusLoading = false;
      state.updateStatusSuccess = false;
      state.updateStatusError = action.payload;
    });
  },
});

export default StatusSlice.reducer;
