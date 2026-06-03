import { useSelector } from "react-redux";
import { selectCalorieGoal } from "../../redux/calorieGoal/calorieGoalSlice";
import { selectFoodEntries } from "../../redux/foodEntries/foodEntriesSlice";
import {
  formatDayTitle,
  formatShortDay,
  getTodayDateKey,
} from "../../utils/date";
import { getWeekStats } from "../../utils/weekStats";
import styles from "./StatisticsPage.module.css";

const StatisticsPage = () => {
  const entries = useSelector(selectFoodEntries);
  const calorieGoal = useSelector(selectCalorieGoal);
  const selectedDate = getTodayDateKey();
  const weekStats = getWeekStats(entries, calorieGoal, selectedDate);

  const getDayStatusText = (day) => {
    if (day.status === "under") return `Осталось ${day.remaining} ккал`;
    if (day.status === "done") return `Цель выполнена`;
    if (day.status === "exceeded") return `Превышено на ${day.exceeded} ккал`;
    return "";
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Статистика</h1>
        <span className={styles.period}>
          Неделя до {formatDayTitle(selectedDate)}
        </span>
      </header>

      <div className={styles.weekSummary}>
        <h3 className={styles.weekSummaryTitle}>Неделя</h3>
        <span className={styles.weekSummaryItem}>
          За неделю: {weekStats.totalCalories} ккал
        </span>
        <span className={styles.weekSummaryItem}>
          В среднем: {weekStats.averageCalories} ккал
        </span>
        <span className={styles.weekSummaryItem}>
          Дней с превышением: {weekStats.daysExceededGoal}
        </span>

        <div className={styles.weekDays}>
          {weekStats.days.map((day) => (
            <div
              className={
                day.status === "exceeded"
                  ? `${styles.weekDay} ${styles.weekDayExceeded}`
                  : styles.weekDay
              }
              key={day.date}
            >
              <span>{formatShortDay(day.date)}</span>
              <span>{day.totalCalories} ккал</span>
              <span>{day.consumedPercent}%</span>
              <div className={styles.weekDayProgress}>
                <span
                  className={styles.weekDayProgressFill}
                  style={{ width: `${day.progressPercent}%` }}
                />
              </div>
              <span>{getDayStatusText(day)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;
