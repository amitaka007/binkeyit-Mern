import { createAsyncThunk } from "@reduxjs/toolkit";
import { login, logout } from "../../common/api/user";

export const userLogin = createAsyncThunk(
  "user/userLogin",
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

export const userlogout = createAsyncThunk(
  "user/userLogout",
  async (data, thunkAPI) => {
    try {
      await localStorage.clear();

      return null;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
