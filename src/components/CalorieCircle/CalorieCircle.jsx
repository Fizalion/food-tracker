import styles from "./CalorieCircle.module.css";

const CalorieCircle = ({ totalCalories }) => {
  return (
    <section className={styles.summary}>
      <span className={styles.label}>Всего калорий</span>
      <strong className={styles.value}>{totalCalories}</strong>
      <span className={styles.unit}>ккал</span>
    </section>
  );
};

export default CalorieCircle;
