import type { BackupData } from "../types/backup";
import type { FoodEntry } from "../types/foodEntry";
import type { Product } from "../types/product";

export const BACKUP_FORMAT_VERSION = "1";
export const MAX_BACKUP_FILE_SIZE_BYTES = 1_000_000;
const MAX_BACKUP_ENTRIES = 10_000;
const MAX_CUSTOM_PRODUCTS = 1_000;
const MAX_TITLE_LENGTH = 200;
const MAX_SAFE_IMPORT_NUMBER = 100_000;

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

const isFiniteNonNegativeNumber = (value: unknown): value is number => {
  return (
    typeof value === "number" &&
    Number.isFinite(value) &&
    value >= 0 &&
    value <= MAX_SAFE_IMPORT_NUMBER
  );
};

const isValidEntryId = (value: unknown): value is number => {
  return typeof value === "number" && Number.isSafeInteger(value) && value > 0;
};

const isValidTitle = (value: unknown): value is string => {
  if (typeof value !== "string") return false;
  const trimmedTitle = value.trim();
  return trimmedTitle.length > 0 && trimmedTitle.length <= MAX_TITLE_LENGTH;
};

const isValidIsoDate = (value: unknown): value is string => {
  return typeof value === "string" && !Number.isNaN(Date.parse(value));
};

const isValidDateKey = (value: unknown): value is string => {
  if (typeof value !== "string") return false;
  const isDateKeyFormatValid = /^\d{4}-\d{2}-\d{2}$/.test(value);
  if (!isDateKeyFormatValid) return false;

  const date = new Date(value + "T00:00:00.000Z");
  const isDateValid = !Number.isNaN(date.getTime());
  if (!isDateValid) return false;

  return date.toISOString().slice(0, 10) === value;
};

const isProduct = (value: unknown): value is Product => {
  if (!isObject(value)) return false;
  return (
    typeof value.id === "string" &&
    typeof value.source === "string" &&
    isValidTitle(value.title) &&
    isFiniteNonNegativeNumber(value.caloriesPer100g) &&
    value.caloriesPer100g > 0 &&
    isFiniteNonNegativeNumber(value.proteinsPer100g) &&
    isFiniteNonNegativeNumber(value.fatsPer100g) &&
    isFiniteNonNegativeNumber(value.carbsPer100g) &&
    value.source === "custom"
  );
};

const isFoodEntry = (value: unknown): value is FoodEntry => {
  if (!isObject(value)) return false;
  return (
    isValidTitle(value.title) &&
    isValidDateKey(value.date) &&
    isValidIsoDate(value.createdAt) &&
    isValidEntryId(value.id) &&
    isFiniteNonNegativeNumber(value.grams) &&
    value.grams > 0 &&
    isFiniteNonNegativeNumber(value.calories) &&
    isFiniteNonNegativeNumber(value.proteins) &&
    isFiniteNonNegativeNumber(value.fats) &&
    isFiniteNonNegativeNumber(value.carbs) &&
    isFiniteNonNegativeNumber(value.caloriesPer100g) &&
    value.caloriesPer100g > 0 &&
    isFiniteNonNegativeNumber(value.proteinsPer100g) &&
    isFiniteNonNegativeNumber(value.fatsPer100g) &&
    isFiniteNonNegativeNumber(value.carbsPer100g)
  );
};

const hasUniqueCustomProducts = (products: Product[]): boolean => {
  const productIds = new Set(products.map((product) => product.id));
  const productTitles = new Set(
    products.map((product) => product.title.trim().toLowerCase()),
  );
  return (
    productIds.size === products.length &&
    productTitles.size === products.length
  );
};

export const isBackupData = (value: unknown): value is BackupData => {
  if (!isObject(value)) return false;
  return (
    value.version === BACKUP_FORMAT_VERSION &&
    isValidIsoDate(value.exportedAt) &&
    isFiniteNonNegativeNumber(value.calorieGoal) &&
    value.calorieGoal > 0 &&
    Array.isArray(value.entries) &&
    value.entries.length <= MAX_BACKUP_ENTRIES &&
    value.entries.every(isFoodEntry) &&
    Array.isArray(value.customProducts) &&
    value.customProducts.length <= MAX_CUSTOM_PRODUCTS &&
    value.customProducts.every(isProduct) &&
    hasUniqueCustomProducts(value.customProducts)
  );
};

export const isBackupFileSizeAllowed = (file: File): boolean => {
  return file.size <= MAX_BACKUP_FILE_SIZE_BYTES;
};

export const readBackupFile = async (file: File): Promise<string> => {
  return await file.text();
};
