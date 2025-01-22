import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiEndPoints, appconfig, returnHeader } from "../../../appConfig";

export const getConstants = createAsyncThunk(
  "getConstants",
  async ({ isDashboard }, { rejectWithValue }) => {
    try {
      let response = await axios({
        method: "GET",
        url: `${appconfig.BASE_URL}${ApiEndPoints.GET_CONSTANTS}?dashboard=${isDashboard}`,
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
  name: "getConstants",
  initialState: {
    data: null,
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getConstants.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getConstants.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
      state.error = false;
    });
    builder.addCase(getConstants.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.data = action.payload;
    });
  },
});

export default GetConstantsSlice.reducer;
