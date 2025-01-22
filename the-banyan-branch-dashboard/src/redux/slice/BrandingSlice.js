import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiEndPoints, appconfig, returnHeader } from "../../../appConfig";

export const updateBranding = createAsyncThunk(
  "updateBranding",
  async (data, { rejectWithValue }) => {
    try {
      let response = await axios({
        method: "PUT",
        url: `${appconfig.BASE_URL}${ApiEndPoints.UPDATE_BRANDING}`,
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

export const getBranding = createAsyncThunk(
  "getBranding",
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
    brandingData: null,
    brandingSuccess: false,
    brandingError: false,
    brandingLoading: false,

    updateBrandingLoading: false,
    updateBrandingSuccess: false,
    updateBrandingError: false,
  },
  reducers: {
    resetUpdateBranding: (state) => {
      state.updateBrandingLoading = false;
      state.updateBrandingSuccess = false;
      state.updateBrandingError = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBranding.pending, (state) => {
      state.brandingLoading = true;
      state.brandingSuccess = false;
      state.brandingError = false;
    });
    builder.addCase(getBranding.fulfilled, (state, action) => {
      state.brandingLoading = false;
      state.brandingSuccess = true;
      state.brandingData = action.payload.data;
      state.brandingError = false;
    });
    builder.addCase(getBranding.rejected, (state, action) => {
      state.brandingLoading = false;
      state.brandingSuccess = false;
      state.brandingError = true;
      state.data = action.payload;
    });
    builder.addCase(updateBranding.pending, (state) => {
      state.updateBrandingLoading = true;
      state.updateBrandingSuccess = false;
      state.updateBrandingError = false;
    });
    builder.addCase(updateBranding.fulfilled, (state, action) => {
      state.updateBrandingLoading = false;
      state.updateBrandingSuccess = action.payload;
      state.updateBrandingError = false;
    });
    builder.addCase(updateBranding.rejected, (state, action) => {
      state.updateBrandingLoading = false;
      state.updateBrandingSuccess = false;
      state.updateBrandingError = action.payload;
    });
  },
});

export const { resetUpdateBranding } = BrandingSlice.actions;

export default BrandingSlice.reducer;
