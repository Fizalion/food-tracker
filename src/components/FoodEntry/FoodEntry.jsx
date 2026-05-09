import Button from "../Button/Button";
import styles from "./FoodEntry.module.css";

const FoodEntry = ({ entry, removeFoodEntryById }) => {
  const { id, title, calories, date } = entry;

  return (
    <li className={styles.item}>
      <div className={styles.content}>
        <span className={styles.date}>Дата: {date}</span>
        <span className={styles.title}>{title}</span>
        <span className={styles.calories}>{calories} ккал</span>
      </div>
      <Button onClick={() => removeFoodEntryById(id)}>Удалить</Button>
    </li>
  );
};

export default FoodEntry;
