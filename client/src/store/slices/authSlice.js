import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import {
  loginAsync,
  logoutAsync,
  registerAsync,
} from "../thunk/auth/authThunk";

const initialState = {
  _id: "",
  name: "",
  email: "",
  avatar: "",
  mobile: "",
  verify_email: "",
  last_login_date: "",
  status: "",
  address_details: [],
  shopping_cart: [],
  orderHistory: [],
  role: "",
  loading: false,
  userDetails: null,
  errors: null,
  successMessage: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      return {
        ...state,
        userDetails: action.payload,
      };
    },
    updatedAvatar: (state, action) => {
      state.avatar = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.userDetails = null;
        state.status = "pending";
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        console.log("!!!! LOGIN SUCCESS: ", action.payload);
        const data = action.payload?.data;
        state.userDetails = JSON.stringify(data);
        state.status = "fulfilled";
        toast.success("Logged in successfully.");
        localStorage.setItem("accessToken", data.accessToken);  
        localStorage.setItem("refreshToken", data.refreshToken);
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.userDetails = null;
        state.errors = action.error;
        console.log("!!!! LOGIN ERROR: ", action.payload);
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        console.log("^^^^ LOGOUT via THUNK");
        Object.assign(state, initialState);
        state.status = "fulfilled";
        // toast.success("Logged out successfully.");
      })
      .addCase(registerAsync.pending, (state) => {
        state.status = "pending";
        state.userDetails = null;
        console.log("!!!! REGISTER PENDING");
      })
      .addCase(registerAsync.fulfilled, (state, action) => {
        state.status = "fullfilled";
        console.log("!!!! REGISTER SUCCESS: ", action.payload);
        state.userDetails = action.payload; 
        toast.success("Registered in successfully.");
      })
      .addCase(registerAsync.rejected, (state, action) => {   
        state.status = "rejected";
        state.userDetails = null;
        state.errors = action.error;
      });
  },
});

// exporting reducers
export const { setUserDetails, logout, updatedAvatar } = authSlice.actions;

export default authSlice;
