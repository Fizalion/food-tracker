import { useRef } from "react";
import { products } from "../../data/products";
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
    handleSelectProduct,
    isProductSelected,
  } = useFoodForm(addFoodEntry, selectedDate, focusOnFoodInput);

  const searchValue = food.trim().toLowerCase();
  const suggestedProducts = searchValue
    ? products
        .filter((product) => {
          const isProductMatched = product.title
            .toLowerCase()
            .includes(searchValue);
          return isProductMatched;
        })
        .slice(0, 5)
    : [];

  const shouldShowSuggestions =
    suggestedProducts.length > 0 && !isProductSelected;

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={`${styles.field} ${styles.productField}`}>
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

        {shouldShowSuggestions && (
          <ul className={styles.suggestions}>
            {suggestedProducts.map((product) => (
              <li
                className={styles.suggestion}
                key={product.id}
                onClick={() => handleSelectProduct(product)}
              >
                {product.title}
              </li>
            ))}
          </ul>
        )}
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
