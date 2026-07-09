import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Button/Button";
import CalorieCircle from "../../components/CalorieCircle/CalorieCircle";
import FoodInput from "../../components/FoodInput/FoodInput";
import FoodList from "../../components/FoodList/FoodList";
import {
  selectCalorieGoal,
  setCalorieGoal,
} from "../../redux/calorieGoal/calorieGoalSlice";
import {
  addFoodEntry,
  removeFoodEntryById,
  repeatFoodEntry,
  selectFoodEntriesByDate,
  selectRecentFoodEntries,
  selectTotalCaloriesByDate,
  selectTotalMacrosByDate,
  updateFoodEntryById,
} from "../../redux/foodEntries/foodEntriesSlice";
import { formatDayTitle, getTodayDateKey } from "../../utils/date";
import styles from "./DiaryPage.module.css";

const DiaryPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const calorieGoalInputRef = useRef(null);
  const [isOnboardingVisible, setIsOnboardingVisible] = useState(
    localStorage.getItem("logfood:onboarding-seen") !== "true",
  );

  const { date } = useParams();
  const selectedDate = date ? date : getTodayDateKey();

  const selectedDateEntries = useSelector((state) =>
    selectFoodEntriesByDate(state, selectedDate),
  );
  const recentFoodEntries = useSelector(selectRecentFoodEntries);
  const totalCalories = useSelector((state) =>
    selectTotalCaloriesByDate(state, selectedDate),
  );
  const totalMacros = useSelector((state) =>
    selectTotalMacrosByDate(state, selectedDate),
  );
  const calorieGoal = useSelector(selectCalorieGoal);

  const handleAddFoodEntry = (entry) => dispatch(addFoodEntry(entry));
  const handleRemoveFoodEntryById = (id) => dispatch(removeFoodEntryById(id));
  const handleUpdateFoodEntryById = (entry) =>
    dispatch(updateFoodEntryById(entry));
  const handleRepeatFoodEntry = (entry) => dispatch(repeatFoodEntry(entry));

  const handleSelectDate = (date) => navigate(`/day/${date}`);

  const handleCalorieGoalChange = (event) => {
    const goal = Number(event.target.value);
    if (event.target.value === "" || goal < 1) return;
    dispatch(setCalorieGoal(goal));
  };

  const handleCloseOnboarding = () => {
    localStorage.setItem("logfood:onboarding-seen", "true");
    setIsOnboardingVisible(false);
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Трекер еды</h1>
          <h2 className={styles.date}>{formatDayTitle(selectedDate)}</h2>
        </div>

        <div className={styles.dateControls}>
          <div className={styles.controlField}>
            <label className={styles.label} htmlFor="change-date">
              Изменить дату
            </label>
            <input
              className={styles.dateInput}
              id="change-date"
              type="date"
              value={selectedDate}
              onChange={(event) => handleSelectDate(event.target.value)}
            />
          </div>

          <Button onClick={() => handleSelectDate(getTodayDateKey())}>
            Сегодня
          </Button>
        </div>
      </div>

      <div className={styles.goalPanel}>
        <label className={styles.goalLabel} htmlFor="calorie-goal-input">
          Дневная цель
        </label>
        <input
          className={styles.goalInput}
          id="calorie-goal-input"
          value={calorieGoal}
          onChange={handleCalorieGoalChange}
          ref={calorieGoalInputRef}
          type="number"
          min="1"
        />
        <p>ккал</p>
        <Button
          type="button"
          onClick={() => calorieGoalInputRef.current?.focus()}
        >
          Изменить
        </Button>
      </div>

      {isOnboardingVisible && (
        <div className={styles.onboarding}>
          <h2 className={styles.onboardingTitle}>Добро пожаловать!</h2>
          <ul className={styles.onboardingList}>
            <li>Настройте дневную цель калорий под себя</li>
            <li>Добавляйте еду по названию, весу и калорийности.</li>
            <li>Смотрите историю и статистику в верхнем меню.</li>
          </ul>
          <div className={styles.onboardingActions}>
            <Button type="button" onClick={handleCloseOnboarding}>
              Понятно
            </Button>
          </div>
        </div>
      )}

      <CalorieCircle totalCalories={totalCalories} calorieGoal={calorieGoal} />

      <span className={styles.macrosSummary}>
        Б {totalMacros.proteins} г · Ж {totalMacros.fats} г · У{" "}
        {totalMacros.carbs} г
      </span>

      <FoodInput
        addFoodEntry={handleAddFoodEntry}
        selectedDate={selectedDate}
        recentFoodEntries={recentFoodEntries}
      />

      <FoodList
        entries={selectedDateEntries}
        removeFoodEntryById={handleRemoveFoodEntryById}
        updateFoodEntryById={handleUpdateFoodEntryById}
        repeatFoodEntry={handleRepeatFoodEntry}
      />
    </div>
  );
};

export default DiaryPage;
