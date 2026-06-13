import { useState } from "react";
import { products } from "../../data/products";
import { calculateCalories, calculateMacros } from "../../utils/foodEntries";
import { findProductsByTitle } from "../../utils/products";
import { parseQuickEntry } from "../../utils/quickEntry";

export const useFoodForm = (addFoodEntry, selectedDate, onSuccess) => {
  const [food, setFood] = useState("");
  const [grams, setGrams] = useState("");
  const [caloriesPer100g, setCaloriesPer100g] = useState("");
  const [proteinsPer100g, setProteinsPer100g] = useState("");
  const [fatsPer100g, setFatsPer100g] = useState("");
  const [carbsPer100g, setCarbsPer100g] = useState("");
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

    if (matchedProducts.length === 1) {
      const matchedProduct = matchedProducts[0];
      setCaloriesPer100g(String(matchedProduct.caloriesPer100g));
      setProteinsPer100g(String(matchedProduct.proteinsPer100g));
      setFatsPer100g(String(matchedProduct.fatsPer100g));
      setCarbsPer100g(String(matchedProduct.carbsPer100g));
    }
  };

  const handleGramsChange = (event) => setGrams(event.target.value);
  const handleCaloriesPer100gChange = (event) =>
    setCaloriesPer100g(event.target.value);

  const handleSelectProduct = (selectedProduct) => {
    setFood(selectedProduct.title);
    setCaloriesPer100g(String(selectedProduct.caloriesPer100g));
    setProteinsPer100g(String(selectedProduct.proteinsPer100g));
    setFatsPer100g(String(selectedProduct.fatsPer100g));
    setCarbsPer100g(String(selectedProduct.carbsPer100g));
    setIsProductSelected(true);
    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const quickEntry = parseQuickEntry(food);
    const trimmedFood = quickEntry.titleText.trim();
    const gramsAmount = Number(grams);
    const caloriesPer100gAmount = Number(caloriesPer100g);
    const proteinsPer100gAmount = Number(proteinsPer100g);
    const fatsPer100gAmount = Number(fatsPer100g);
    const carbsPer100gAmount = Number(carbsPer100g);

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

    const macros = calculateMacros(
      gramsAmount,
      proteinsPer100gAmount,
      fatsPer100gAmount,
      carbsPer100gAmount,
    );

    const entry = {
      id: Date.now(),
      title: trimmedFood,
      grams: gramsAmount,
      calories: calculateCalories(gramsAmount, caloriesPer100gAmount),
      proteins: macros.proteins,
      fats: macros.fats,
      carbs: macros.carbs,
      caloriesPer100g: caloriesPer100gAmount,
      proteinsPer100g: proteinsPer100gAmount,
      fatsPer100g: fatsPer100gAmount,
      carbsPer100g: carbsPer100gAmount,
      date: selectedDate,
      createdAt: new Date().toISOString(),
    };

    addFoodEntry(entry);
    setFood("");
    setGrams("");
    setCaloriesPer100g("");
    setProteinsPer100g("");
    setFatsPer100g("");
    setCarbsPer100g("");
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
