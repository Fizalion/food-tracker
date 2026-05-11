import { useState } from "react";

export const useFoodEntryEdit = (entry, updateFoodEntryById) => {
  const { id, title, calories } = entry;

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editCalories, setEditCalories] = useState(String(calories));
  const [editError, setEditError] = useState("");

  const handleEditTitleChange = (event) => setEditTitle(event.target.value);

  const handleEditCaloriesChange = (event) =>
    setEditCalories(event.target.value);

  const handleStartEdit = () => {
    setEditTitle(title);
    setEditCalories(String(calories));
    setEditError("");
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    const trimmedTitle = editTitle.trim();
    const caloriesAmount = Number(editCalories);

    if (!trimmedTitle) {
      setEditError("Введите название еды");
      return;
    }

    if (
      editCalories === "" ||
      caloriesAmount < 1 ||
      Number.isNaN(caloriesAmount)
    ) {
      setEditError("Введите калории больше 0");
      return;
    }

    updateFoodEntryById({
      id,
      title: trimmedTitle,
      calories: caloriesAmount,
    });
    setEditError("");
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditTitle(title);
    setEditCalories(String(calories));
    setEditError("");
    setIsEditing(false);
  };

  return {
    isEditing,
    editTitle,
    editCalories,
    editError,
    handleEditTitleChange,
    handleEditCaloriesChange,
    handleStartEdit,
    handleSaveEdit,
    handleCancelEdit,
  };
};
