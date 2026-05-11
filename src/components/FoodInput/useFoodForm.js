import { useState } from "react";

export const useFoodForm = (addFoodEntry, selectedDate, onSuccess) => {
  const [food, setFood] = useState("");
  const [calories, setCalories] = useState("");
  const [error, setError] = useState("");

  const handleFoodChange = (event) => setFood(event.target.value);
  const handleCaloriesChange = (event) => setCalories(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedFood = food.trim();
    const caloriesAmount = Number(calories);

    if (!trimmedFood) {
      setError("Введите название еды");
      return;
    }

    if (calories === "" || caloriesAmount < 1 || Number.isNaN(caloriesAmount)) {
      setError("Введите калории больше 0");
      return;
    }

    const entry = {
      id: Date.now(),
      title: trimmedFood,
      calories: caloriesAmount,
      date: selectedDate,
      createdAt: new Date().toISOString(),
    };

    addFoodEntry(entry);
    setFood("");
    setCalories("");
    setError("");
    onSuccess?.();
  };

  return {
    handleSubmit,
    food,
    handleFoodChange,
    calories,
    handleCaloriesChange,
    error,
  };
};
