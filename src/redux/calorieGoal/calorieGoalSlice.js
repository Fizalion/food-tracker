import { createSlice } from "@reduxjs/toolkit";
import { loadCalorieGoal } from "../../utils/storage";

export const calorieGoalSlice = createSlice({
  name: "calorieGoal",
  initialState: loadCalorieGoal(),
  reducers: {
    setCalorieGoal: (state, action) => action.payload,
  },
  selectors: {
    selectCalorieGoal: (state) => state,
  },
});

export const { setCalorieGoal } = calorieGoalSlice.actions;
export const { selectCalorieGoal } = calorieGoalSlice.selectors;
