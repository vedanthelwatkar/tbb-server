import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiEndPoints, appconfig, returnHeader } from "../../../appConfig";

export const getConstants = createAsyncThunk(
  "getConstants",
  async ({ isDashboard }, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "GET",
        url: `${appconfig.BASE_URL}${ApiEndPoints.GET_CONSTANTS}?dashboard=${isDashboard}`,
        headers: returnHeader(true),
      });
      return response.data;
    } catch (e) {
      console.error(e);
      return rejectWithValue(e.response?.data || e.message);
    }
  }
);

export const getIsActive = createAsyncThunk(
  "getIsActive",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "GET",
        url: `${appconfig.BASE_URL}${ApiEndPoints.GET_CONSTANTS}`,
        headers: returnHeader(true),
      });
      return response.data.brandTheme.isActive;
    } catch (e) {
      console.error(e);
      return rejectWithValue(e.response?.data || e.message);
    }
  }
);

const GetConstantsSlice = createSlice({
  name: "getConstants",
  initialState: {
    data: null,
    error: null,
    loading: false,
    isWebActive: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getConstants.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getConstants.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = false;
    });
    builder.addCase(getConstants.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(getIsActive.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getIsActive.fulfilled, (state, action) => {
      state.loading = false;
      state.isWebActive = action.payload;
      state.error = false;
    });
    builder.addCase(getIsActive.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default GetConstantsSlice.reducer;
