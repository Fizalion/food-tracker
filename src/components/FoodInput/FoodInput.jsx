import Button from "../Button/Button";
import { useFoodForm } from "./useFoodForm";
import styles from "./FoodInput.module.css";

const FoodInput = ({ addFoodEntry, selectedDate }) => {
  const {
    handleSubmit,
    food,
    handleFoodChange,
    calories,
    handleCaloriesChange,
  } = useFoodForm(addFoodEntry, selectedDate);

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="food-title">
          Название еды
        </label>
        <input
          className={styles.input}
          id="food-title"
          value={food}
          onChange={handleFoodChange}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="food-calories">
          Калории
        </label>
        <input
          className={styles.input}
          id="food-calories"
          type="number"
          min="1"
          value={calories}
          onChange={handleCaloriesChange}
        />
      </div>

      <Button type="submit">Добавить</Button>
    </form>
  );
};

export default FoodInput;
