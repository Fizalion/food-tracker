import { useState } from "react";
import Button from "../Button/Button";

const FoodInput = ({ addFoodEntry }) => {
  const [food, setFood] = useState("");
  const [calories, setCalories] = useState("");

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
    };

    addFoodEntry(entry);
    setFood("");
    setCalories("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="food-title">Название еды</label>
      <input
        id="food-title"
        value={food}
        onChange={(event) => setFood(event.target.value)}
      />

      <label htmlFor="food-calories">Калории</label>
      <input
        id="food-calories"
        type="number"
        min="1"
        value={calories}
        onChange={(event) => setCalories(event.target.value)}
      />

      <Button type="submit">Добавить</Button>
    </form>
  );
};

export default FoodInput;
