import { useState } from "react";

export const useCustomProductForm = (addCustomProduct, products) => {
  const [title, setTitle] = useState("");
  const [caloriesPer100g, setCaloriesPer100g] = useState("");
  const [proteinsPer100g, setProteinsPer100g] = useState("");
  const [fatsPer100g, setFatsPer100g] = useState("");
  const [carbsPer100g, setCarbsPer100g] = useState("");
  const [error, setError] = useState("");

  const handleTitleChange = (event) => {
    return setTitle(event.target.value);
  };

  const handleCaloriesChange = (event) => {
    return setCaloriesPer100g(event.target.value);
  };

  const handleProteinsChange = (event) => {
    return setProteinsPer100g(event.target.value);
  };

  const handleFatsChange = (event) => {
    return setFatsPer100g(event.target.value);
  };

  const handleCarbsChange = (event) => {
    return setCarbsPer100g(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setError("Введите название продукта");
      return;
    }

    const normalizedTitle = trimmedTitle.toLowerCase();
    const isDuplicate = products.some(
      (product) => product.title.trim().toLowerCase() === normalizedTitle,
    );

    if (isDuplicate) {
      setError("Продукт с таким названием уже существует");
      return;
    }

    const caloriesAmount = Number(caloriesPer100g);
    const proteinsAmount = Number(proteinsPer100g);
    const fatsAmount = Number(fatsPer100g);
    const carbsAmount = Number(carbsPer100g);

    const isProteinsInvalid =
      proteinsPer100g === "" ||
      proteinsAmount < 0 ||
      Number.isNaN(proteinsAmount);

    const isFatsInvalid =
      fatsPer100g === "" || fatsAmount < 0 || Number.isNaN(fatsAmount);

    const isCarbsInvalid =
      carbsPer100g === "" || carbsAmount < 0 || Number.isNaN(carbsAmount);

    if (
      caloriesPer100g === "" ||
      caloriesAmount < 1 ||
      Number.isNaN(caloriesAmount)
    ) {
      setError("Введите калории на 100 г больше 0");
      return;
    }

    if (isProteinsInvalid || isFatsInvalid || isCarbsInvalid) {
      setError("Введите корректные БЖУ на 100 г");
      return;
    }

    const product = {
      id: String(Date.now()),
      source: "custom",
      title: trimmedTitle,
      caloriesPer100g: caloriesAmount,
      proteinsPer100g: proteinsAmount,
      fatsPer100g: fatsAmount,
      carbsPer100g: carbsAmount,
    };

    addCustomProduct(product);
    setTitle("");
    setCaloriesPer100g("");
    setProteinsPer100g("");
    setFatsPer100g("");
    setCarbsPer100g("");
    setError("");
  };

  return {
    title,
    caloriesPer100g,
    proteinsPer100g,
    fatsPer100g,
    carbsPer100g,
    error,
    handleTitleChange,
    handleCaloriesChange,
    handleProteinsChange,
    handleFatsChange,
    handleCarbsChange,
    handleSubmit,
  };
};
