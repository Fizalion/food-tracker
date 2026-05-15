import { useState } from "react";
import { calculateCalories } from "../../utils/foodEntries";

export const useFoodEntryEdit = (entry, updateFoodEntryById) => {
  const { id, title, grams, caloriesPer100g } = entry;

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editGrams, setEditGrams] = useState(String(grams));
  const [editCaloriesPer100g, setEditCaloriesPer100g] = useState(
    String(caloriesPer100g),
  );
  const [editError, setEditError] = useState("");

  const handleEditTitleChange = (event) => setEditTitle(event.target.value);

  const handleEditGramsChange = (event) => setEditGrams(event.target.value);

  const handleEditCaloriesPer100gChange = (event) =>
    setEditCaloriesPer100g(event.target.value);

  const handleStartEdit = () => {
    setEditTitle(title);
    setEditGrams(String(grams));
    setEditCaloriesPer100g(String(caloriesPer100g));
    setEditError("");
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    const trimmedTitle = editTitle.trim();
    const gramsAmount = Number(editGrams);
    const caloriesPer100gAmount = Number(editCaloriesPer100g);

    if (!trimmedTitle) {
      setEditError("Введите название еды");
      return;
    }

    if (editGrams === "" || gramsAmount < 1 || Number.isNaN(gramsAmount)) {
      setEditError("Введите вес больше 0");
      return;
    }

    if (
      editCaloriesPer100g === "" ||
      caloriesPer100gAmount < 1 ||
      Number.isNaN(caloriesPer100gAmount)
    ) {
      setEditError("Введите ккал на 100 г больше 0");
      return;
    }

    updateFoodEntryById({
      id,
      title: trimmedTitle,
      grams: gramsAmount,
      caloriesPer100g: caloriesPer100gAmount,
      calories: calculateCalories(gramsAmount, caloriesPer100gAmount),
    });

    setEditError("");
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditTitle(title);
    setEditGrams(String(grams));
    setEditCaloriesPer100g(String(caloriesPer100g));
    setEditError("");
    setIsEditing(false);
  };

  return {
    isEditing,
    editTitle,
    editGrams,
    editCaloriesPer100g,
    editError,
    handleEditTitleChange,
    handleEditGramsChange,
    handleEditCaloriesPer100gChange,
    handleStartEdit,
    handleSaveEdit,
    handleCancelEdit,
  };
};
