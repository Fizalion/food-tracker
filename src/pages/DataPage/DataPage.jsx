import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/Button/Button";
import {
  selectCalorieGoal,
  setCalorieGoal,
} from "../../redux/calorieGoal/calorieGoalSlice";
import {
  replaceCustomProducts,
  selectCustomProducts,
} from "../../redux/customProducts/customProductsSlice";
import {
  replaceFoodEntries,
  selectFoodEntries,
} from "../../redux/foodEntries/foodEntriesSlice";
import {
  createBackupData,
  downloadBackupFile,
  isBackupData,
  isBackupFileSizeAllowed,
  parseBackupJson,
  readBackupFile,
  serializeBackupData,
} from "../../utils/backup";
import styles from "./DataPage.module.css";

const DataPage = () => {
  const dispatch = useDispatch();
  const [importMessage, setImportMessage] = useState("");
  const entries = useSelector(selectFoodEntries);
  const calorieGoal = useSelector(selectCalorieGoal);
  const customProducts = useSelector(selectCustomProducts);

  const handleExport = () => {
    const backupData = createBackupData(entries, calorieGoal, customProducts);
    const json = serializeBackupData(backupData);
    downloadBackupFile(json, "logfood-backup.json");
  };

  const handleImport = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!isBackupFileSizeAllowed(file)) {
      setImportMessage("Файл слишком большой. Максимальный размер — 1 МБ");
      event.target.value = "";
      return;
    }

    const data = await readBackupFile(file);
    const parseData = parseBackupJson(data);
    if (!isBackupData(parseData)) {
      setImportMessage(
        "Файл резервной копии повреждён или имеет неподдерживаемый формат",
      );
      event.target.value = "";
      return;
    }
    dispatch(replaceFoodEntries(parseData.entries));
    dispatch(setCalorieGoal(parseData.calorieGoal));
    dispatch(replaceCustomProducts(parseData.customProducts));
    setImportMessage("Данные успешно импортированы");
    event.target.value = "";
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Данные</h1>
        <p className={styles.description}>
          Резервная копия создаётся локально в браузере
        </p>
      </header>

      <section className={styles.exportSection}>
        <div>
          <h2 className={styles.sectionTitle}>Экспорт</h2>
          <p className={styles.sectionText}>
            Скачайте записи дневника, цель калорий и пользовательские продукты
            одним JSON-файлом.
          </p>
        </div>

        <div className={styles.actions}>
          <Button onClick={handleExport}>Экспортировать данные</Button>
        </div>
      </section>

      <section className={styles.exportSection}>
        <div>
          <h2 className={styles.sectionTitle}>Импорт</h2>
          <p className={styles.sectionText}>
            Выберите резервную копию LogFood в формате JSON.
          </p>
        </div>

        <input
          className={styles.fileInput}
          type="file"
          accept=".json,application/json"
          onChange={handleImport}
        />

        {importMessage && (
          <div className={styles.importMessage}>{importMessage}</div>
        )}
      </section>
    </div>
  );
};

export default DataPage;
