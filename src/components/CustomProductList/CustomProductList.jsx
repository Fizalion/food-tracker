import { useState } from "react";
import Button from "../Button/Button";
import styles from "./CustomProductList.module.css";

const CustomProductList = ({ products, removeCustomProductById }) => {
  const [confirmingProductId, setConfirmingProductId] = useState(null);

  const handleStartDelete = (id) => setConfirmingProductId(id);
  const handleCancelDelete = () => setConfirmingProductId(null);
  const handleConfirmDelete = () => {
    removeCustomProductById(confirmingProductId);
    setConfirmingProductId(null);
  };

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Продукты</h2>
      {products.length === 0 ? (
        <div className={styles.empty}>Пользовательских продуктов пока нет</div>
      ) : (
        <ul className={styles.list}>
          {products.map((product) => {
            const isConfirmingDelete = confirmingProductId === product.id;

            return (
              <li className={styles.item} key={product.id}>
                <span className={styles.productTitle}>{product.title}</span>
                <span className={styles.calories}>
                  {product.caloriesPer100g} ккал
                </span>
                <span className={styles.macros}>
                  Б {product.proteinsPer100g} г · Ж {product.fatsPer100g} г · У{" "}
                  {product.carbsPer100g} г
                </span>

                {isConfirmingDelete === false && (
                  <div className={styles.actions}>
                    <Button onClick={() => handleStartDelete(product.id)}>
                      Удалить
                    </Button>
                  </div>
                )}

                {isConfirmingDelete === true && (
                  <div className={styles.actions}>
                    <Button onClick={handleConfirmDelete}>Точно удалить</Button>
                    <Button onClick={handleCancelDelete}>Отмена</Button>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};

export default CustomProductList;
