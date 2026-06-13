import { useState } from "react";
import Button from "../Button/Button";
import styles from "./FoodEntry.module.css";
import { useFoodEntryEdit } from "./useFoodEntryEdit";

const FoodEntry = ({ entry, removeFoodEntryById, updateFoodEntryById }) => {
  const { id, title, calories, grams, proteins, fats, carbs } = entry;

  const {
    isEditing,
    editTitle,
    editGrams,
    editCaloriesPer100g,
    editError,
    handleEditTitleChange,
    handleEditGramsChange,
    handleEditCaloriesPer100gChange,
    handleStartEdit,
    handleSaveEdit,
    handleCancelEdit,
  } = useFoodEntryEdit(entry, updateFoodEntryById);

  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  const handleStartDelete = () => setIsConfirmingDelete(true);
  const handleCancelDelete = () => setIsConfirmingDelete(false);
  const handleConfirmDelete = () => removeFoodEntryById(id);

  const handleEditClick = () => {
    setIsConfirmingDelete(false);
    handleStartEdit();
  };

  return (
    <li className={styles.item}>
      {isEditing ? (
        <div className={styles.editForm}>
          <input
            className={styles.input}
            aria-label="Название еды"
            value={editTitle}
            onChange={handleEditTitleChange}
          />

          <input
            className={styles.input}
            aria-label="Вес, г"
            value={editGrams}
            onChange={handleEditGramsChange}
            type="number"
            min="1"
          />

          <input
            className={styles.input}
            aria-label="Ккал на 100 г"
            value={editCaloriesPer100g}
            onChange={handleEditCaloriesPer100gChange}
            type="number"
            min="1"
          />

          {editError && <div className={styles.error}>{editError}</div>}

          <div className={styles.actions}>
            <Button onClick={handleSaveEdit}>Сохранить</Button>
            <Button onClick={handleCancelEdit}>Отмена</Button>
          </div>
        </div>
      ) : (
        <>
          <div className={styles.content}>
            <span className={styles.title}>{title}</span>
            <span className={styles.weight}>{grams} г</span>
            <span className={styles.calories}>{calories} ккал</span>
            <span className={styles.macros}>
              Б {proteins} г · Ж {fats} г · У {carbs} г
            </span>
          </div>

          {isConfirmingDelete === false && (
            <div className={styles.actions}>
              <Button onClick={handleEditClick}>Редактировать</Button>
              <Button onClick={handleStartDelete}>Удалить</Button>
            </div>
          )}

          {isConfirmingDelete === true && (
            <div className={styles.actions}>
              <Button onClick={handleConfirmDelete}>Точно удалить</Button>
              <Button onClick={handleCancelDelete}>Отмена</Button>
            </div>
          )}
        </>
      )}
    </li>
  );
};

export default FoodEntry;
