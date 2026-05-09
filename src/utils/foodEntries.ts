import type { FoodEntry } from "../types/foodEntry";

export const getEntriesByDate = (
  entries: FoodEntry[],
  selectedDate: string,
): FoodEntry[] => entries.filter((entry) => entry.date === selectedDate);

export const getTotalCalories = (entries: FoodEntry[]): number =>
  entries.reduce((acc, entry) => {
    return acc + entry.calories;
  }, 0);

export const getAvailableDates = (entries: FoodEntry[]): string[] =>
  [...new Set(entries.map((entry) => entry.date))].sort((a, b) =>
    b.localeCompare(a),
  );
