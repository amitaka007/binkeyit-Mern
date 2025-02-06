import { configureStore } from "@reduxjs/toolkit";
import userSliceNew from "./slices/userSliceNew";

export const store = configureStore({
  reducer: {
    [userSliceNew.name]: userSliceNew.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
