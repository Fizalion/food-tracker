import { createSelector, createSlice } from "@reduxjs/toolkit";
import {
  getAvailableDates,
  getEntriesByDate,
  getTotalCalories,
} from "../../utils/foodEntries";
import { loadFoodEntries } from "../../utils/storage";

export const foodEntriesSlice = createSlice({
  name: "foodEntries",
  initialState: loadFoodEntries(),
  reducers: {
    addFoodEntry: (state, action) => {
      state.push(action.payload);
    },

    removeFoodEntryById: (state, action) => {
      return state.filter((entry) => entry.id !== action.payload);
    },

    updateFoodEntryById: (state, action) => {
      const entry = state.find((entry) => entry.id === action.payload.id);
      if (entry) {
        entry.title = action.payload.title;
        entry.grams = action.payload.grams;
        entry.calories = action.payload.calories;
        entry.caloriesPer100g = action.payload.caloriesPer100g;
      }
    },
  },
  selectors: {
    selectFoodEntries: (state) => state,
  },
});

export const { addFoodEntry, removeFoodEntryById, updateFoodEntryById } =
  foodEntriesSlice.actions;
export const { selectFoodEntries } = foodEntriesSlice.selectors;

export const selectAvailableDates = createSelector(
  [selectFoodEntries],
  (entries) => getAvailableDates(entries),
);

export const selectFoodEntriesByDate = createSelector(
  [selectFoodEntries, (_, selectedDate) => selectedDate],
  (entries, selectedDate) => getEntriesByDate(entries, selectedDate),
);

export const selectTotalCaloriesByDate = createSelector(
  [selectFoodEntriesByDate],
  (entriesByDate) => getTotalCalories(entriesByDate),
);
