import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Button/Button";
import CalorieCircle from "../../components/CalorieCircle/CalorieCircle";
import FoodInput from "../../components/FoodInput/FoodInput";
import FoodList from "../../components/FoodList/FoodList";
import {
  addFoodEntry,
  removeFoodEntryById,
  selectFoodEntriesByDate,
  selectTotalCaloriesByDate,
  updateFoodEntryById,
} from "../../redux/foodEntries/foodEntriesSlice";
import { formatDayTitle, getTodayDateKey } from "../../utils/date";
import styles from "./DiaryPage.module.css";

const DiaryPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { date } = useParams();
  const selectedDate = date ? date : getTodayDateKey();

  const selectedDateEntries = useSelector((state) =>
    selectFoodEntriesByDate(state, selectedDate),
  );
  const totalCalories = useSelector((state) =>
    selectTotalCaloriesByDate(state, selectedDate),
  );

  const handleAddFoodEntry = (entry) => dispatch(addFoodEntry(entry));
  const handleRemoveFoodEntryById = (id) => dispatch(removeFoodEntryById(id));
  const handleUpdateFoodEntryById = (entry) =>
    dispatch(updateFoodEntryById(entry));

  const handleSelectDate = (date) => navigate(`/day/${date}`);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Трекер еды</h1>
          <h2 className={styles.date}>{formatDayTitle(selectedDate)}</h2>
        </div>

        <div className={styles.dateControls}>
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

          <Button onClick={() => handleSelectDate(getTodayDateKey())}>
            Сегодня
          </Button>
        </div>
      </div>

      <CalorieCircle totalCalories={totalCalories} />

      <FoodInput
        addFoodEntry={handleAddFoodEntry}
        selectedDate={selectedDate}
      />

      <FoodList
        entries={selectedDateEntries}
        removeFoodEntryById={handleRemoveFoodEntryById}
        updateFoodEntryById={handleUpdateFoodEntryById}
      />
    </div>
  );
};

export default DiaryPage;
