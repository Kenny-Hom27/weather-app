import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.topHeader}>
      <span className={styles.logo}>WHETHER.IO</span>

      <button className={styles.hamburger}>☰</button>
    </header>
  );
}
