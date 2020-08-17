import styles from '../styles/header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>My List</div>
      <div className={styles.switch}> </div>
    </header>
  );
}
