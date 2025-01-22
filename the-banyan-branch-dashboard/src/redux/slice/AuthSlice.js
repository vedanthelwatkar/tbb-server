import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiEndPoints, appconfig, returnHeader } from "../../../appConfig";

export const loginUser = createAsyncThunk(
  "loginUser",
  async (data, { rejectWithValue }) => {
    try {
      let response = await axios({
        method: "POST",
        url: `${appconfig.BASE_URL}${ApiEndPoints.LOGIN_USER}`,
        headers: returnHeader(true),
        data: data,
      });
      return response;
    } catch (e) {
      console.error(e);
      return rejectWithValue(e);
    }
  }
);

export const signUpUser = createAsyncThunk(
  "signUpUser",
  async (data, { rejectWithValue }) => {
    try {
      let response = await axios({
        method: "POST",
        url: `${appconfig.BASE_URL}${ApiEndPoints.SIGNUP_USER}`,
        headers: returnHeader(true),
        data: data,
      });
      return response;
    } catch (e) {
      console.error(e);
      return rejectWithValue(e);
    }
  }
);

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    loginData: null,
    loginSuccess: null,
    loginError: null,
    loginLoading: false,

    signUpData: null,
    signUpSuccess: null,
    signUpError: null,
    signUpLoading: false,
  },
  reducers: {
    resetAuth: (state) => {
      state.loginData = null;
      state.loginSuccess = null;
      state.loginError = null;
      state.loginLoading = false;

      state.signUpData = null;
      state.signUpSuccess = null;
      state.signUpError = null;
      state.signUpLoading = false;
    },
    clearLoginError: (state) => {
      state.loginError = null;
    },
    clearSignUpError: (state) => {
      state.signUpError = null;
    },
    resetSignUp: (state) => {
      state.signUpData = null;
      state.signUpSuccess = null;
      state.signUpError = null;
      state.signUpLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loginLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loginLoading = false;
      state.loginData = action.payload.data;
      state.loginSuccess = true;
      state.loginError = false;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loginLoading = false;
      state.loginError = action.payload;
      state.loginSuccess = false;
      state.loginData = action.payload;
    });
    builder.addCase(signUpUser.pending, (state) => {
      state.signUpLoading = true;
    });
    builder.addCase(signUpUser.fulfilled, (state, action) => {
      state.signUpLoading = false;
      state.signUpData = action.payload;
      state.signUpSuccess = true;
      state.signUpError = false;
    });
    builder.addCase(signUpUser.rejected, (state, action) => {
      state.signUpLoading = false;
      state.signUpError = action.payload;
      state.signUpSuccess = false;
      state.signUpData = action.payload;
    });
  },
});

export const { resetAuth, clearLoginError, clearSignUpError, resetSignUp } =
  AuthSlice.actions;

export default AuthSlice.reducer;
