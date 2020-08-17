import React, { useState } from 'react';
import styles from '../styles/footer.module.css';

export default function Footer() {
  const [showContent, setShowContent] = useState(false);
  const handlerShowContent = () => {
    setShowContent(true);
  };
  return (
    <footer className={styles.footer}>
      <p>
        Created By{' '}
        <a
          className={styles.link}
          href="https://github.com/koal4z/todo-app-nextjs"
          target="_blank"
          rel="noopener noreferrer"
          onMouseOver={handlerShowContent}
          onFocus={handlerShowContent}
          onBlur={() => setShowContent(false)}
          onMouseOut={() => setShowContent(false)}
        >
          koal4z
        </a>
        {showContent ? (
          <span role="img" className={styles.showtext}>
            {' '}
            &#x2190; See my Git Here! 👍
          </span>
        ) : null}
      </p>
    </footer>
  );
}
