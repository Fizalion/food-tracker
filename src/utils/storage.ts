import { FOOD_ENTRIES_STORAGE_KEY } from "../constants";
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
