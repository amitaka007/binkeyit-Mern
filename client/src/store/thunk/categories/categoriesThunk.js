import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllCategory } from "./categoriesApi";

export const fetchAllCategoriesAsync = createAsyncThunk(
  "categories/fetchAllCategoriesAsync",
  async (data, thunkAPI) => {
    try {
      const response = await fetchAllCategory(data);
      console.log("response", response);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
