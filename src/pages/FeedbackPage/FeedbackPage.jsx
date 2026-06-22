import Button from "../../components/Button/Button";
import styles from "./FeedbackPage.module.css";

const FeedbackPage = () => {
  const handleOpenFeedback = () => {
    window.open("https://tally.so/r/q4goKd", "_blank", "noopener,noreferrer");
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Обратная связь</h1>
        <p className={styles.description}>
          Расскажите об ошибке, предложите идею или поделитесь впечатлением о
          LogFood.
        </p>
      </header>

      <section className={styles.feedbackSection}>
        <p className={styles.privacyText}>
          Откроется внешняя форма Tally. Данные дневника и пользовательские
          продукты автоматически не передаются.
        </p>

        <div className={styles.actions}>
          <Button onClick={handleOpenFeedback}>Оставить отзыв</Button>
        </div>
      </section>
    </div>
  );
};

export default FeedbackPage;
