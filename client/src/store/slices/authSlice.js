import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { userLogin, userlogout } from "../thunk/auth/authThunk";

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
  // loading: false,
  // error: null,
  userDetails: null,
  status:"idle",
  errors:null,
  successMessage:null
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
      .addCase(userLogin.pending, (state) => {
        state.userDetails = null;
        state.status = 'pending';
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        console.log("!!!! LOGIN SUCCESS: ", action.payload);
        const data = action.payload?.data;
        state.userDetails = JSON.stringify(data);
        state.status = 'fulfilled';
        toast.success("Logged in successfully.");
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.userDetails = null;
        state.errors=action.error
        console.log("!!!! LOGIN ERROR: ", action.payload);
      })
      .addCase(userlogout.fulfilled, (state) => {
        console.log("^^^^ LOGOUT via THUNK");
        Object.assign(state, initialState);
        state.status = 'fulfilled';
        // toast.success("Logged out successfully.");
      });
  },
});

// exporting reducers
export const { setUserDetails, logout, updatedAvatar } = authSlice.actions;

// exporting selectors
export const selectAuthStatus=(state)=>state.OrderSlice.status
export const selectAuth=(state)=>state.OrderSlice.orders
export const selectAuthsErrors=(state)=>state.OrderSlice.errors
export const selectAuthsSuccessMessage=(state)=>state.OrderSlice.successMessage
export const selectCurrentOrder=(state)=>state.OrderSlice.currentOrder
export const selectAuthUpdateStatus=(state)=>state.OrderSlice.orderUpdateStatus
export const selectAuthFetchStatus=(state)=>state.OrderSlice.orderFetchStatus

export default authSlice;
