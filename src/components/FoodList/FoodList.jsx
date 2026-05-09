import FoodEntry from "../FoodEntry/FoodEntry";
import styles from "./FoodList.module.css";

const FoodList = ({ entries, removeFoodEntryById }) => {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Записи</h2>
      {entries.length === 0 ? (
        <div className={styles.empty}>Записей пока нет</div>
      ) : (
        <ul className={styles.list}>
          {entries.map((entry) => (
            <FoodEntry
              key={entry.id}
              entry={entry}
              removeFoodEntryById={removeFoodEntryById}
            />
          ))}
        </ul>
      )}
    </section>
  );
};

export default FoodList;
