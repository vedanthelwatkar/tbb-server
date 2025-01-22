import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiEndPoints, appconfig, returnHeader } from "../../../appConfig";

export const getConfiguration = createAsyncThunk(
  "getConfiguration",
  async (page, { rejectWithValue }) => {
    try {
      let response = await axios({
        method: "GET",
        url: `${appconfig.BASE_URL}${ApiEndPoints.GET_CONFIGURATION}`,
        headers: returnHeader(true),
      });
      return response;
    } catch (e) {
      console.error(e);
      return rejectWithValue(e);
    }
  }
);

const ConfigurationSlice = createSlice({
  name: "Configuration",
  initialState: {
    configurationData: {},
    configurationSuccess: false,
    configurationError: false,
    configurationLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getConfiguration.pending, (state) => {
      state.configurationLoading = true;
      state.configurationSuccess = false;
      state.configurationError = false;
    });
    builder.addCase(getConfiguration.fulfilled, (state, action) => {
      state.configurationLoading = false;
      state.configurationSuccess = true;
      state.configurationData = action.payload.data;
      state.configurationError = false;
    });
    builder.addCase(getConfiguration.rejected, (state, action) => {
      state.configurationLoading = false;
      state.configurationSuccess = false;
      state.configurationError = true;
      state.data = action.payload;
    });
  },
});

export default ConfigurationSlice.reducer;
