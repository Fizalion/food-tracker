import { useState } from "react";

export const useFoodForm = (addFoodEntry, selectedDate) => {
  const [food, setFood] = useState("");
  const [calories, setCalories] = useState("");

  const handleFoodChange = (event) => setFood(event.target.value);
  const handleCaloriesChange = (event) => setCalories(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedFood = food.trim();
    const caloriesAmount = Number(calories);

    if (!trimmedFood || caloriesAmount <= 0) {
      return;
    }

    const entry = {
      id: Date.now(),
      title: trimmedFood,
      calories: caloriesAmount,
      date: selectedDate,
    };

    addFoodEntry(entry);
    setFood("");
    setCalories("");
  };

  return {
    handleSubmit,
    food,
    handleFoodChange,
    calories,
    handleCaloriesChange,
  };
};
