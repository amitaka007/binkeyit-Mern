import { configureStore } from "@reduxjs/toolkit";
import userSliceNew from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    [userSliceNew.name]: userSliceNew.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
