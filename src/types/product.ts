export type Product = {
  id: string;
  source: "built-in" | "custom";
  title: string;
  caloriesPer100g: number;
  proteinsPer100g: number;
  fatsPer100g: number;
  carbsPer100g: number;
};
