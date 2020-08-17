import React, { useState } from 'react';
import styles from '../styles/header.module.css';

export default function Header() {
  const [isBlack, setIsBlack] = useState(true);

  const switchColor = (bgColor, color) => {
    document.querySelector('body').style.backgroundColor = bgColor;
    document.querySelector('body').style.color = color;
    document.querySelector('a').style.color = color;
  };

  const handlerSwitch = (e) => {
    const el = e.target;
    if (isBlack) {
      el.style.backgroundColor = '#ffffff';
      switchColor('#aaaaaa', '#ffffff');
      setIsBlack(false);
    } else {
      el.style.backgroundColor = '#000000';
      switchColor('#ffffff', '#000000');
      setIsBlack(true);
    }
  };
  return (
    <header className={styles.header}>
      <div className={styles.logo}>My List</div>
      <div role="button" className={styles.switch} onClick={handlerSwitch}>
        {' '}
      </div>
    </header>
  );
}
