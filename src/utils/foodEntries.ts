import type { FoodEntry } from "../types/foodEntry";

type CalculatedMacros = {
  proteins: number;
  fats: number;
  carbs: number;
};

type TotalMacros = {
  proteins: number;
  fats: number;
  carbs: number;
};

export const getEntriesByDate = (
  entries: FoodEntry[],
  selectedDate: string,
): FoodEntry[] => entries.filter((entry) => entry.date === selectedDate);

export const getTotalCalories = (entries: FoodEntry[]): number =>
  entries.reduce((acc, entry) => {
    return acc + entry.calories;
  }, 0);

export const calculateCalories = (
  grams: number,
  caloriesPer100g: number,
): number => Math.round((grams * caloriesPer100g) / 100);

export const calculateMacros = (
  grams: number,
  proteinsPer100g: number,
  fatsPer100g: number,
  carbsPer100g: number,
): CalculatedMacros => {
  const proteins = Number(((grams * proteinsPer100g) / 100).toFixed(1));
  const fats = Number(((grams * fatsPer100g) / 100).toFixed(1));
  const carbs = Number(((grams * carbsPer100g) / 100).toFixed(1));
  return { proteins, fats, carbs };
};

export const getTotalMacros = (entries: FoodEntry[]): TotalMacros => {
  const totalMacros = entries.reduce(
    (acc, entry) => {
      const proteins = acc.proteins + entry.proteins;
      const fats = acc.fats + entry.fats;
      const carbs = acc.carbs + entry.carbs;
      return { proteins, fats, carbs };
    },
    { proteins: 0, fats: 0, carbs: 0 },
  );

  return {
    proteins: Number(totalMacros.proteins.toFixed(1)),
    fats: Number(totalMacros.fats.toFixed(1)),
    carbs: Number(totalMacros.carbs.toFixed(1)),
  };
};

export const getAvailableDates = (entries: FoodEntry[]): string[] =>
  [...new Set(entries.map((entry) => entry.date))].sort((a, b) =>
    b.localeCompare(a),
  );
