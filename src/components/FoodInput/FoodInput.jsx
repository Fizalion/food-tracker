import { useRef } from "react";
import Button from "../Button/Button";
import styles from "./FoodInput.module.css";
import { useFoodForm } from "./useFoodForm";

const FoodInput = ({ addFoodEntry, selectedDate }) => {
  const foodInputRef = useRef(null);
  const focusOnFoodInput = () => foodInputRef.current?.focus();

  const {
    handleSubmit,
    food,
    handleFoodChange,
    grams,
    handleGramsChange,
    caloriesPer100g,
    handleCaloriesPer100gChange,
    error,
  } = useFoodForm(addFoodEntry, selectedDate, focusOnFoodInput);

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="food-title">
          Название еды
        </label>
        <input
          className={styles.input}
          id="food-title"
          ref={foodInputRef}
          value={food}
          onChange={handleFoodChange}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="food-grams">
          Вес, г
        </label>
        <input
          className={styles.input}
          id="food-grams"
          type="number"
          min="1"
          value={grams}
          onChange={handleGramsChange}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="food-calories-per-100g">
          Ккал на 100 г
        </label>
        <input
          className={styles.input}
          id="food-calories-per-100g"
          type="number"
          min="1"
          value={caloriesPer100g}
          onChange={handleCaloriesPer100gChange}
        />
      </div>

      <Button type="submit">Добавить</Button>

      {error && <div className={styles.error}>{error}</div>}
    </form>
  );
};

export default FoodInput;
