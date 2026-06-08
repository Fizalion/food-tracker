import { useState } from "react";
import { products } from "../../data/products";
import { calculateCalories } from "../../utils/foodEntries";
import { findProductsByTitle } from "../../utils/products";
import { parseQuickEntry } from "../../utils/quickEntry";

export const useFoodForm = (addFoodEntry, selectedDate, onSuccess) => {
  const [food, setFood] = useState("");
  const [grams, setGrams] = useState("");
  const [caloriesPer100g, setCaloriesPer100g] = useState("");
  const [isProductSelected, setIsProductSelected] = useState(false);
  const [error, setError] = useState("");

  const handleFoodChange = (event) => {
    const foodValue = event.target.value;
    const { titleText: quickTitle, grams: quickGrams } =
      parseQuickEntry(foodValue);
    const matchedProducts = quickTitle
      ? findProductsByTitle(products, quickTitle)
      : [];

    setFood(foodValue);
    if (quickGrams !== null) setGrams(String(quickGrams));
    setIsProductSelected(false);
    if (matchedProducts.length === 1)
      setCaloriesPer100g(String(matchedProducts[0].caloriesPer100g));
  };

  const handleGramsChange = (event) => setGrams(event.target.value);
  const handleCaloriesPer100gChange = (event) =>
    setCaloriesPer100g(event.target.value);

  const handleSelectProduct = (selectedProduct) => {
    setFood(selectedProduct.title);
    setCaloriesPer100g(String(selectedProduct.caloriesPer100g));
    setIsProductSelected(true);
    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const quickEntry = parseQuickEntry(food);
    const trimmedFood = quickEntry.titleText.trim();
    const gramsAmount = Number(grams);
    const caloriesPer100gAmount = Number(caloriesPer100g);

    if (!trimmedFood) {
      setError("Введите название еды");
      return;
    }

    if (grams === "" || gramsAmount < 1 || Number.isNaN(gramsAmount)) {
      setError("Введите вес больше 0");
      return;
    }

    if (
      caloriesPer100g === "" ||
      caloriesPer100gAmount < 1 ||
      Number.isNaN(caloriesPer100gAmount)
    ) {
      setError("Введите калории на 100 г больше 0");
      return;
    }

    const entry = {
      id: Date.now(),
      title: trimmedFood,
      grams: gramsAmount,
      caloriesPer100g: caloriesPer100gAmount,
      calories: calculateCalories(gramsAmount, caloriesPer100gAmount),
      date: selectedDate,
      createdAt: new Date().toISOString(),
    };

    addFoodEntry(entry);
    setFood("");
    setGrams("");
    setCaloriesPer100g("");
    setIsProductSelected(false);
    setError("");
    onSuccess?.();
  };

  return {
    handleSubmit,
    food,
    handleFoodChange,
    grams,
    handleGramsChange,
    caloriesPer100g,
    handleCaloriesPer100gChange,
    error,
    isProductSelected,
    handleSelectProduct,
  };
};
