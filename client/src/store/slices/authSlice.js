import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import {
  forgotPasswordOtp_Async,
  forgotPaswordAsync,
  loginAsync,
  logoutAsync,
  refreshTokenAsync,
  registerAsync,
  resetPasswordAsync,
} from "../thunk/auth/authThunk";

const initialState = {
  // _id: "",
  // name: "",
  // email: "",
  // avatar: "",
  // mobile: "",
  // verify_email: "",
  // last_login_date: "",
  // status: "",
  // address_details: [],
  // shopping_cart: [],
  // orderHistory: [],
  // role: "",
  loading: false,
  userDetails: null,
  forgotPassword: null,
  forgotPasswordOtp: null,
  register:null,
  errors: null,
  status: null,
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

      // loginAsync
      .addCase(loginAsync.pending, (state) => {
        state.userDetails = null;
        state.status = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        console.log("!!!! LOGIN SUCCESS: ", action.payload);
        const data = action.payload?.data;
        state.userDetails = JSON.stringify(data);
        state.status = action?.payload?.data?.message;
        console.log("!!!! LOGIN SUCCESS: ", action.payload);
        toast.success("Logged in successfully.");
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.userDetails = null;
        state.errors = action.error;
        state.status = null;
        console.log("!!!! LOGIN ERROR: ", action.payload);
      })

      // logoutAsync
      .addCase(logoutAsync.fulfilled, (state) => {
        console.log("^^^^ LOGOUT via THUNK");
        Object.assign(state, initialState);
        state.status = "fulfilled";
        // toast.success("Logged out successfully.");
      })

      // forgotPaswordAsync
      .addCase(forgotPaswordAsync.pending, (state) => {
        state.status = "pending";
        state.loading = true;
        state.errors = null;
        state.forgotPassword = null;
      })
      .addCase(forgotPaswordAsync.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.loading = false;
        state.forgotPassword = action.payload;
        state.successMessage = "Password reset request sent.";
        toast.success("Password reset request sent successfully.");
      })
      .addCase(forgotPaswordAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.loading = false;
        state.errors = action.payload || action.error;
        toast.error("Password reset request failed.");
        state.forgotPassword = null;
      })

      // forgotPasswordOtp_Async
      .addCase(forgotPasswordOtp_Async.pending, (state) => {
        state.status = "pending";
        state.loading = true;
        state.errors = null;
        state.forgotPasswordOtp = null;
      })
      .addCase(forgotPasswordOtp_Async.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.loading = false;
        state.forgotPasswordOtp = action.payload;
        state.successMessage = "OTP verification successful.";
        toast.success("OTP verified successfully.");
      })
      .addCase(forgotPasswordOtp_Async.rejected, (state, action) => {
        state.status = "rejected";
        state.loading = false;
        state.errors = action.payload || action.error;
        toast.error("OTP verification failed.");
        state.forgotPasswordOtp = null;
      })

      //registerAsync
      .addCase(registerAsync.pending, (state) => {
        state.status = "pending";
        state.register = null;
        console.log("!!!! REGISTER PENDING FROM AUTHSLICE");
      })
      .addCase(registerAsync.fulfilled, (state, action) => {
        state.status = "fullfilled";
        console.log("!!!! REGISTER SUCCESS FROM AUTHSLICE : ", action.payload);
        state.register = action.payload;
        toast.success("Registered in successfully.");
      })
      .addCase(registerAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.register = null;
        state.errors = action.error;
        
      });

    // .addCase(resetPasswordAsync.pending, (state) => {
    //   state.status = "pending";
    //   state.loading = true;
    //   state.errors = null;
    // })
    // .addCase(resetPasswordAsync.fulfilled, (state) => {
    //   state.status = "fulfilled";
    //   state.loading = false;
    //   state.successMessage = "Password reset successful.";
    //   toast.success("Password has been reset successfully.");
    // })
    // .addCase(resetPasswordAsync.rejected, (state, action) => {
    //   state.status = "rejected";
    //   state.loading = false;
    //   state.errors = action.payload || action.error;
    //   toast.error("Password reset failed.");
    // })

    // .addCase(refreshTokenAsync.fulfilled, (state, action) => {
    //   const data = action.payload?.data;
    //   state.status = "fulfilled";
    //   localStorage.setItem("accessToken", data.accessToken);
    //   localStorage.setItem("refreshToken", data.refreshToken);
    //   toast.success("Token refreshed successfully.");
    // })
    // .addCase(refreshTokenAsync.rejected, (state, action) => {
    //   state.status = "rejected";
    //   state.errors = action.payload || action.error;
    //   toast.error("Token refresh failed. Please log in again.");
    // });
  },
});

// exporting reducers
export const { setUserDetails, logout, updatedAvatar } = authSlice.actions;

export default authSlice;
