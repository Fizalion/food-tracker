import type { FoodEntry } from "./foodEntry";
import type { Product } from "./product";

export type BackupData = {
  version: string;
  exportedAt: string;
  entries: FoodEntry[];
  calorieGoal: number;
  customProducts: Product[];
};
