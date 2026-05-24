import { getCalorieGoalSummary } from "../../utils/calorieGoal";
import styles from "./CalorieCircle.module.css";

const CalorieCircle = ({ totalCalories, calorieGoal }) => {
  const {
    isExceeded,
    progressPercent,
    remaining,
    exceeded,
    consumedPercent,
    exceededPercent,
    status,
  } = getCalorieGoalSummary(totalCalories, calorieGoal);

  const progressStyle = { "--progress": `${progressPercent}%` };
  const ringClassName = isExceeded
    ? `${styles.ring} ${styles.ringExceeded}`
    : styles.ring;

  return (
    <section className={styles.summary}>
      <div className={ringClassName} style={progressStyle}>
        <div className={styles.ringInner}>
          <span className={styles.label}>Всего калорий</span>
          <div className={styles.amount}>
            <strong className={styles.value}>{totalCalories}</strong>
            <span className={styles.unit}>ккал</span>
          </div>

          <span className={styles.percent}>{consumedPercent}% от цели</span>
        </div>
      </div>

      <div className={styles.goal}>
        <span className={styles.label}>Цель: {calorieGoal} ккал</span>
        <div className={isExceeded ? styles.exceeded : styles.remaining}>
          {status === "under" && <span>Осталось: {remaining} ккал</span>}
          {status === "done" && <span>Цель выполнена</span>}
          {status === "exceeded" && (
            <>
              <span>Превышено на {exceeded} ккал</span>
              <span>+ {exceededPercent}% сверх цели</span>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default CalorieCircle;
