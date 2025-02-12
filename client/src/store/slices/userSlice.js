import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { userLogin, userlogout } from "../thunk/auth/auththunk";

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
};

const userSliceNew = createSlice({
  name: "user",
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
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        console.log("!!!! LOGIN SUCCESS: ", action.payload);
        const data = action.payload?.data;
        state.userDetails = JSON.stringify(data);
        toast.success("Logged in successfully.");
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.userDetails = null;
        console.log("!!!! LOGIN ERROR: ", action.payload);
      })
      .addCase(userlogout.fulfilled, (state) => {
        console.log("^^^^ LOGOUT via THUNK");
        Object.assign(state, initialState);
        // toast.success("Logged out successfully.");
      });
  },
});

// exporting reducers
export const { setUserDetails, logout, updatedAvatar } = userSliceNew.actions;

export default userSliceNew;
