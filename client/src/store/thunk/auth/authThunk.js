import { createAsyncThunk } from "@reduxjs/toolkit";
import { forgot_Password, forgot_Password_Otp, login, logout, refreshToken, register, reset_password } from "./authApi";

export const loginAsync = createAsyncThunk(
  "auth/loginAsync",
  async (data, thunkAPI) => {
    try {
      const response = await login(data);
      console.log("response", response);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const logoutAsync = createAsyncThunk(
  "auth/logoutAsync",
  async (data, thunkAPI) => {
    try {
      await logout(data);
      await localStorage.clear();
      return null;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const registerAsync = createAsyncThunk(
  "auth/registerAsync",
  async (data, thunkAPI) => {
    try {
      const response = await register(data);
      console.log(data, "responseRegisterAsync");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const forgotPaswordAsync = createAsyncThunk(
  "auth/forgotPaswordAsync",
  async (data, thunkAPI) => {
    try {
      const response = await forgot_Password(data); 
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const forgotPasswordOtp_Async = createAsyncThunk(
  "auth/forgotPasswordOtp_Async",
  async (data, thunkAPI) => {
    try {
      const response = await forgot_Password_Otp(data); 
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const resetPasswordAsync = createAsyncThunk(
  "auth/resetPasswordAsync",
  async (data, thunkAPI) => {
    try {
      const response = await reset_password(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const refreshTokenAsync = createAsyncThunk(
  "auth/refreshTokenAsync",
  async (data, thunkAPI) => {
    try {
      const response = await refreshToken(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
