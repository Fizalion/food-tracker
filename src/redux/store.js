import { configureStore } from "@reduxjs/toolkit";
import { foodEntriesSlice } from "./foodEntries/foodEntriesSlice";

export const store = configureStore({
  reducer: {
    [foodEntriesSlice.name]: foodEntriesSlice.reducer,
  },
});
