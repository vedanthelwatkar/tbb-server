import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiEndPoints, appconfig, returnHeader } from "../../../appConfig";

export const updateProfile = createAsyncThunk(
  "updateProfile",
  async (data, { rejectWithValue }) => {
    try {
      let response = await axios({
        method: "PUT",
        url: `${appconfig.BASE_URL}${ApiEndPoints.UPDATE_PROFILE}`,
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

export const getProfile = createAsyncThunk(
  "getProfile",
  async (data, { rejectWithValue }) => {
    try {
      let response = await axios({
        method: "GET",
        url: `${appconfig.BASE_URL}${ApiEndPoints.GET_PROFILE}`,
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

const ProfileSlice = createSlice({
  name: "Profile",
  initialState: {
    profileData: null,
    profileSuccess: false,
    profileError: false,
    profileLoading: false,

    updateProfileLoading: false,
    updateProfileSuccess: false,
    updateProfileError: false,
  },
  reducers: {
    resetUpdateProfile: (state) => {
      state.updateProfileLoading = false;
      state.updateProfileSuccess = false;
      state.updateProfileError = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProfile.pending, (state) => {
      state.profileLoading = true;
      state.profileSuccess = false;
      state.profileError = false;
    });
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.profileLoading = false;
      state.profileSuccess = true;
      state.profileData = action.payload.data;
      state.profileError = false;
    });
    builder.addCase(getProfile.rejected, (state, action) => {
      state.profileLoading = false;
      state.profileSuccess = false;
      state.profileError = true;
      state.data = action.payload;
    });
    builder.addCase(updateProfile.pending, (state) => {
      state.updateProfileLoading = true;
      state.updateProfileSuccess = false;
      state.updateProfileError = false;
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.updateProfileLoading = false;
      state.updateProfileSuccess = action.payload;
      state.updateProfileError = false;
    });
    builder.addCase(updateProfile.rejected, (state, action) => {
      state.updateProfileLoading = false;
      state.updateProfileSuccess = false;
      state.updateProfileError = action.payload;
    });
  },
});

export const { resetUpdateProfile } = ProfileSlice.actions;

export default ProfileSlice.reducer;
