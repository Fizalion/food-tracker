import { FOOD_ENTRIES_STORAGE_KEY } from "../constants";
import type { FoodEntry } from "../types/foodEntry";

export const loadFoodEntries = (): FoodEntry[] => {
  const initialEntries = localStorage.getItem(FOOD_ENTRIES_STORAGE_KEY);
  if (!initialEntries) return [];
  return JSON.parse(initialEntries);
};

export const saveFoodEntries = (entries: FoodEntry[]): void =>
  localStorage.setItem(FOOD_ENTRIES_STORAGE_KEY, JSON.stringify(entries));
