import { createSelector, createSlice } from "@reduxjs/toolkit";
import { RECENT_FOOD_ENTRIES_LIMIT } from "../../constants";
import {
  createRepeatedFoodEntry,
  getAvailableDates,
  getEntriesByDate,
  getRecentFoodEntries,
  getTotalCalories,
  getTotalMacros,
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
        entry.proteins = action.payload.proteins;
        entry.fats = action.payload.fats;
        entry.carbs = action.payload.carbs;
      }
    },

    replaceFoodEntries: (state, action) => {
      return action.payload;
    },

    repeatFoodEntry: (state, action) => {
      const repeatedEntry = createRepeatedFoodEntry(action.payload);
      state.push(repeatedEntry);
    },
  },
  selectors: {
    selectFoodEntries: (state) => state,
  },
});

export const {
  addFoodEntry,
  removeFoodEntryById,
  updateFoodEntryById,
  replaceFoodEntries,
  repeatFoodEntry,
} = foodEntriesSlice.actions;

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

export const selectTotalMacrosByDate = createSelector(
  [selectFoodEntriesByDate],
  (entriesByDate) => getTotalMacros(entriesByDate),
);

export const selectRecentFoodEntries = createSelector(
  [selectFoodEntries],
  (entries) => getRecentFoodEntries(entries, RECENT_FOOD_ENTRIES_LIMIT),
);
