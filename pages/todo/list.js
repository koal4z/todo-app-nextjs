import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import styles from '../../styles/todoPages.module.css';

export default function Todo() {
  const router = useRouter();

  const todo = () => {
    const { todoid } = router.query;
  };

  return (
    <>
      <Head>
        <title>list</title>
      </Head>
      <div className={styles.container}>
        <header className={styles.header}>todo : ...</header>
        <main className={styles.listZone}>
          <ul>
            <li>123</li>
            <li>123</li>
            <li>123</li>
            <li>123</li>
            <li>123</li>
          </ul>
        </main>
        <div className={styles.buttonZone}>
          <button type="button">add</button>
          <button type="button">replace</button>
          <button type="button">delete</button>
        </div>
        <div className={styles.backtohomeZone}>
          <a href="/">back to home</a>
        </div>
      </div>
    </>
  );
}
