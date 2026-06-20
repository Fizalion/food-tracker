import { configureStore } from "@reduxjs/toolkit";
import { calorieGoalSlice } from "./calorieGoal/calorieGoalSlice";
import { customProductsSlice } from "./customProducts/customProductsSlice";
import { foodEntriesSlice } from "./foodEntries/foodEntriesSlice";

export const store = configureStore({
  reducer: {
    [foodEntriesSlice.name]: foodEntriesSlice.reducer,
    [calorieGoalSlice.name]: calorieGoalSlice.reducer,
    [customProductsSlice.name]: customProductsSlice.reducer,
  },
});
