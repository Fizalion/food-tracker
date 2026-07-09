import { useRef } from "react";
import { useSelector } from "react-redux";
import { products } from "../../data/products";
import { selectCustomProducts } from "../../redux/customProducts/customProductsSlice";
import { findProductsByTitle, getAllProducts } from "../../utils/products";
import { parseQuickEntry } from "../../utils/quickEntry";
import Button from "../Button/Button";
import styles from "./FoodInput.module.css";
import { useFoodForm } from "./useFoodForm";

const FoodInput = ({ addFoodEntry, selectedDate, recentFoodEntries }) => {
  const customProducts = useSelector(selectCustomProducts);
  const allProducts = getAllProducts(products, customProducts);

  const foodInputRef = useRef(null);
  const focusOnFoodInput = () => foodInputRef.current?.focus();

  const gramsInputRef = useRef(null);
  const focusAndSelectGramsInput = () => {
    const gramsInput = gramsInputRef.current;
    if (!gramsInput) return;

    setTimeout(() => {
      gramsInput.focus();
      gramsInput.select();
    });
  };

  const {
    food,
    handleFoodChange,
    grams,
    handleGramsChange,
    caloriesPer100g,
    handleCaloriesPer100gChange,
    error,
    handleSelectProduct,
    isProductSelected,
    handleSubmit,
    handleSelectRecentFoodEntry,
  } = useFoodForm(
    allProducts,
    addFoodEntry,
    selectedDate,
    focusOnFoodInput,
    focusAndSelectGramsInput,
  );

  const quickEntry = parseQuickEntry(food);
  const searchValue = quickEntry.titleText;
  const suggestedProducts = findProductsByTitle(allProducts, searchValue);
  const shouldShowSuggestions =
    suggestedProducts.length > 0 && !isProductSelected;

  const shouldShowRecentFoodEntries = recentFoodEntries.length > 0;

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

      {shouldShowRecentFoodEntries && (
        <div className={styles.recent}>
          <h2 className={styles.recentTitle}>Недавние продукты</h2>
          <p className={styles.recentHint}>Нажмите, чтобы заполнить форму</p>
          <div className={styles.recentList}>
            {recentFoodEntries.map((entry) => (
              <Button
                className={styles.recentButton}
                key={entry.id}
                type="button"
                onClick={() => handleSelectRecentFoodEntry(entry)}
              >
                {entry.title} · {entry.grams} г
              </Button>
            ))}
          </div>
        </div>
      )}

      <div className={styles.field}>
        <label className={styles.label} htmlFor="food-grams">
          Вес, г
        </label>
        <input
          className={styles.input}
          id="food-grams"
          type="number"
          min="1"
          ref={gramsInputRef}
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
