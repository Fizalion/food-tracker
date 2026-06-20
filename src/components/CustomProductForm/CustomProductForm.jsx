import Button from "../Button/Button";
import styles from "./CustomProductForm.module.css";
import { useCustomProductForm } from "./useCustomProductForm";

const CustomProductForm = ({ products, addCustomProduct }) => {
  const {
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
  } = useCustomProductForm(addCustomProduct, products);

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.fields}>
        <div className={`${styles.field} ${styles.titleField}`}>
          <label className={styles.label} htmlFor="food-product">
            Название продукта
          </label>
          <input
            className={styles.input}
            id="food-product"
            value={title}
            onChange={handleTitleChange}
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
            onChange={handleCaloriesChange}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="food-proteins-per-100g">
            Белки на 100 г
          </label>
          <input
            className={styles.input}
            id="food-proteins-per-100g"
            type="number"
            min="0"
            step="0.1"
            value={proteinsPer100g}
            onChange={handleProteinsChange}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="food-fats-per-100g">
            Жиры на 100 г
          </label>
          <input
            className={styles.input}
            id="food-fats-per-100g"
            type="number"
            min="0"
            step="0.1"
            value={fatsPer100g}
            onChange={handleFatsChange}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="food-carbs-per-100g">
            Углеводы на 100 г
          </label>
          <input
            className={styles.input}
            id="food-carbs-per-100g"
            type="number"
            min="0"
            step="0.1"
            value={carbsPer100g}
            onChange={handleCarbsChange}
          />
        </div>
      </div>

      <div className={styles.actions}>
        <Button type="submit">Добавить продукт</Button>
      </div>

      {error && <div className={styles.error}>{error}</div>}
    </form>
  );
};

export default CustomProductForm;
