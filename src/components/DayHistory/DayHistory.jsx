import { formatDayTitle } from "../../utils/date";
import Button from "../Button/Button";
import styles from "./DayHistory.module.css";

const DayHistory = ({ availableDates, selectedDate, onSelectDate }) => {
  return (
    <section className={styles.section}>
      <h3 className={styles.title}>История записей</h3>
      <div>
        {availableDates.length === 0 ? (
          <div className={styles.empty}>Истории пока нет</div>
        ) : (
          <ul className={styles.list}>
            {availableDates.map((date) => {
              const isSelected = date === selectedDate;

              return (
                <li key={date} className={styles.item}>
                  <Button
                    disabled={isSelected}
                    onClick={() => onSelectDate(date)}
                  >
                    {formatDayTitle(date)}
                  </Button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
};

export default DayHistory;
