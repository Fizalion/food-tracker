import {
  CALORIE_GOAL_STORAGE_KEY,
  DEFAULT_CALORIE_GOAL,
  FOOD_ENTRIES_STORAGE_KEY,
} from "../constants";
import type { FoodEntry } from "../types/foodEntry";

export const loadFoodEntries = (): FoodEntry[] => {
  const initialEntries = localStorage.getItem(FOOD_ENTRIES_STORAGE_KEY);
  if (!initialEntries) return [];

  try {
    return JSON.parse(initialEntries);
  } catch {
    return [];
  }
};

export const saveFoodEntries = (entries: FoodEntry[]): void => {
  try {
    localStorage.setItem(FOOD_ENTRIES_STORAGE_KEY, JSON.stringify(entries));
  } catch {}
};

export const loadCalorieGoal = (): number => {
  const calorieGoal = localStorage.getItem(CALORIE_GOAL_STORAGE_KEY);
  if (!calorieGoal) return DEFAULT_CALORIE_GOAL;

  try {
    return JSON.parse(calorieGoal);
  } catch {
    return DEFAULT_CALORIE_GOAL;
  }
};

export const saveCalorieGoal = (calorieGoal: number): void => {
  try {
    localStorage.setItem(CALORIE_GOAL_STORAGE_KEY, JSON.stringify(calorieGoal));
  } catch {}
};
