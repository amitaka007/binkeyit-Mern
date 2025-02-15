import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { fetchAllCategory } from "../thunk/categories/categoriesApi";

const initialState = {
  allCategory: [],
  allSubCategory: [],
  product: [],
  loadingCategory: false, // Added loading state
};

const categorySlice = createSlice({
  name: "categorySlice",
  initialState: initialState,
  reducers: {
    setAllCategory: (state, action) => {
      return {
        ...state,
        allCategory: action.payload,
      };
    },
  },
  setAllSubCategory: (state, action) => {
    return {
      ...state,
      allSubCategory: action.payload,
    };
  },
  setLoadingCategory: (state, action) => {
    return {
      ...state,
      loadingCategory: action.payload,
    };
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCategory.pending, (state) => {
        state.loadingCategory = true;
      })
      .addCase(fetchAllCategory.fulfilled, (state, action) => {
        state.loadingCategory = false;
        state.allCategory = action.payload;
        toast.success("Category fetched successfully.");
      })
      .addCase(fetchAllCategory.rejected, (state) => {
        state.loadingCategory = false;
      }); 
  },
});

export const { setAllCategory, setAllSubCategory, setLoadingCategory } =
  categorySlice.actions;

export default categorySlice;
