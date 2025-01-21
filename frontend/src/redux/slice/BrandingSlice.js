import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiEndPoints, appconfig, returnHeader } from "../../../appConfig";

export const getConstants = createAsyncThunk(
  "getConstants",
  async (data, { rejectWithValue }) => {
    try {
      let response = await axios({
        method: "GET",
        url: `${appconfig.BASE_URL}${ApiEndPoints.GET_CONSTANTS}`,
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

const BrandingSlice = createSlice({
  name: "Branding",
  initialState: {
    brandingData: {},
    brandingSuccess: false,
    brandingError: false,
    brandingLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getConstants.pending, (state) => {
      state.brandingLoading = true;
      state.brandingSuccess = false;
      state.brandingError = false;
    });
    builder.addCase(getConstants.fulfilled, (state, action) => {
      state.brandingLoading = false;
      state.brandingSuccess = true;
      state.brandingData = action.payload.data;
      state.brandingError = false;
    });
    builder.addCase(getConstants.rejected, (state, action) => {
      state.brandingLoading = false;
      state.brandingSuccess = false;
      state.brandingError = true;
      state.data = action.payload;
    });
  },
});

export default BrandingSlice.reducer;
