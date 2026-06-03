import { NavLink } from "react-router-dom";
import styles from "./Layout.module.css";

const Layout = ({ children }) => {
  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <div className={styles.brand}>LogFood</div>
        <nav className={styles.nav}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            Дневник
          </NavLink>
          <NavLink
            to="/history"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            История
          </NavLink>
          <NavLink
            to="/statistics"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            Статистика
          </NavLink>
        </nav>
      </header>

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>
        <div>
          <span className={styles.footerBrand}>Fizalion</span>
        </div>
        <div className={styles.footerLinks}>
          <a
            className={styles.footerLink}
            href="https://t.me/fizaliondev"
            rel="noreferrer"
            target="_blank"
          >
            Telegram
          </a>
          <a
            className={styles.footerLink}
            href="https://github.com/Fizalion"
            rel="noreferrer"
            target="_blank"
          >
            GitHub
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
