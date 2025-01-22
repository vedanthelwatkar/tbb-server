import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiEndPoints, appconfig, returnHeader } from "../../../appConfig";

export const updateConfiguration = createAsyncThunk(
  "updateConfiguration",
  async ({ page, data }, { rejectWithValue }) => {
    try {
      let response = await axios({
        method: "PUT",
        url: `${appconfig.BASE_URL}${ApiEndPoints.UPDATE_SECTION}?page=${page}`,
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

export const getConfiguration = createAsyncThunk(
  "getConfiguration",
  async (data, { rejectWithValue }) => {
    try {
      let response = await axios({
        method: "GET",
        url: `${appconfig.BASE_URL}${ApiEndPoints.GET_CONFIGURATION}?page=${data}`,
        headers: returnHeader(true),
      });
      return response;
    } catch (e) {
      console.error(e);
      return rejectWithValue(e);
    }
  }
);

export const deleteConfiguration = createAsyncThunk(
  "configuration/deleteConfiguration",
  async ({ id, page }, { rejectWithValue }) => {
    try {
      let response = await axios({
        method: "DELETE",
        url: `${appconfig.BASE_URL}${ApiEndPoints.DELETE_SECTION}?page=${page}&id=${id}`,
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
    configurationData: null,
    configurationSuccess: false,
    configurationError: false,
    configurationLoading: false,

    updateConfigurationLoading: false,
    updateConfigurationSuccess: false,
    updateConfigurationError: false,

    deleteConfigurationLoading: false,
    deleteConfigurationSuccess: false,
    deleteConfigurationError: false,
  },
  reducers: {
    resetUpdateConfiguration: (state) => {
      state.updateConfigurationLoading = false;
      state.updateConfigurationSuccess = false;
      state.updateConfigurationError = false;
    },
  },
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

    builder.addCase(updateConfiguration.pending, (state) => {
      state.updateConfigurationLoading = true;
      state.updateConfigurationSuccess = false;
      state.updateConfigurationError = false;
    });
    builder.addCase(updateConfiguration.fulfilled, (state, action) => {
      state.updateConfigurationLoading = false;
      state.updateConfigurationSuccess = action.payload;
      state.updateConfigurationError = false;
    });
    builder.addCase(updateConfiguration.rejected, (state, action) => {
      state.updateConfigurationLoading = false;
      state.updateConfigurationSuccess = false;
      state.updateConfigurationError = action.payload;
    });

    builder.addCase(deleteConfiguration.pending, (state) => {
      state.deleteConfigurationLoading = true;
      state.deleteConfigurationSuccess = false;
      state.deleteConfigurationError = false;
    });
    builder.addCase(deleteConfiguration.fulfilled, (state, action) => {
      state.deleteConfigurationLoading = false;
      state.deleteConfigurationSuccess = action.payload;
      state.deleteConfigurationError = false;
    });
    builder.addCase(deleteConfiguration.rejected, (state, action) => {
      state.deleteConfigurationLoading = false;
      state.deleteConfigurationSuccess = false;
      state.deleteConfigurationError = action.payload;
    });
  },
});

export const { resetUpdateConfiguration } = ConfigurationSlice.actions;

export default ConfigurationSlice.reducer;
