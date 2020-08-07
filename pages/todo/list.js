import React from 'react';
import Head from 'next/head';
import styles from '../../styles/todoPages.module.css';

export default function Todo() {
  return (
    <>
      <Head>
        <title>list</title>
      </Head>
      <div className={styles.container}>
        <header>header</header>
        <main>list</main>
        <div>button</div>
        <div>backtoHome</div>
      </div>
    </>
  );
}
