import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DayHistory from "../../components/DayHistory/DayHistory";
import { selectAvailableDates } from "../../redux/foodEntries/foodEntriesSlice";
import styles from "./HistoryPage.module.css";

const HistoryPage = () => {
  const navigate = useNavigate();
  const availableDates = useSelector(selectAvailableDates);

  const handleSelectDate = (date) => navigate(`/day/${date}`);

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>История</h1>
      <DayHistory
        availableDates={availableDates}
        selectedDate={""}
        onSelectDate={handleSelectDate}
      />
    </div>
  );
};

export default HistoryPage;
