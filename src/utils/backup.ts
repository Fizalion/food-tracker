import type { BackupData } from "../types/backup";
import type { FoodEntry } from "../types/foodEntry";
import type { Product } from "../types/product";

export const BACKUP_FORMAT_VERSION = "1";

export const createBackupData = (
  entries: FoodEntry[],
  calorieGoal: number,
  customProducts: Product[],
): BackupData => {
  return {
    version: BACKUP_FORMAT_VERSION,
    exportedAt: new Date().toISOString(),
    entries,
    calorieGoal,
    customProducts,
  };
};

export const serializeBackupData = (backupData: BackupData): string =>
  JSON.stringify(backupData, null, 2);

export const downloadBackupFile = (json: string, fileName: string): void => {
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
};

export const parseBackupJson = (json: string): unknown | null => {
  try {
    return JSON.parse(json);
  } catch {
    return null;
  }
};

const isObject = (value: unknown): value is Record<string, unknown> => {
  return value !== null && typeof value === "object" && !Array.isArray(value);
};

const isProduct = (value: unknown): value is Product => {
  if (!isObject(value)) return false;
  return (
    typeof value.id === "string" &&
    typeof value.source === "string" &&
    typeof value.title === "string" &&
    typeof value.caloriesPer100g === "number" &&
    typeof value.proteinsPer100g === "number" &&
    typeof value.fatsPer100g === "number" &&
    typeof value.carbsPer100g === "number" &&
    (value.source === "built-in" || value.source === "custom")
  );
};

const isFoodEntry = (value: unknown): value is FoodEntry => {
  if (!isObject(value)) return false;
  return (
    typeof value.title === "string" &&
    typeof value.date === "string" &&
    typeof value.createdAt === "string" &&
    typeof value.id === "number" &&
    typeof value.grams === "number" &&
    typeof value.calories === "number" &&
    typeof value.proteins === "number" &&
    typeof value.fats === "number" &&
    typeof value.carbs === "number" &&
    typeof value.caloriesPer100g === "number" &&
    typeof value.proteinsPer100g === "number" &&
    typeof value.fatsPer100g === "number" &&
    typeof value.carbsPer100g === "number"
  );
};

export const isBackupData = (value: unknown): value is BackupData => {
  if (!isObject(value)) return false;
  return (
    value.version === BACKUP_FORMAT_VERSION &&
    typeof value.exportedAt === "string" &&
    typeof value.calorieGoal === "number" &&
    Number.isFinite(value.calorieGoal) &&
    value.calorieGoal > 0 &&
    Array.isArray(value.entries) &&
    value.entries.every(isFoodEntry) &&
    Array.isArray(value.customProducts) &&
    value.customProducts.every(isProduct)
  );
};

export const readBackupFile = async (file: File): Promise<string> => {
  return await file.text();
};
