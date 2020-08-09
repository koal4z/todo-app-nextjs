import React, { useState } from 'react';

import Link from 'next/link';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [list, setList] = useState(['list1', 'list2', 'list3']);
  const [input, setInput] = useState('');
  const [isdeleted, setIsdeleted] = useState(false);
  const [islink, setIslink] = useState(false);

  const addList = () => {
    if (input !== '') {
      setList([...list, input]);
      setInput('');
    }
  };

  const isEnter = (e) => {
    if (e.keyCode === 13) {
      addList();
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setInput(value);
  };

  const handlerDeleted = (e) => {
    const listId = e.target.parentNode.dataset.list;
    setList(() => list.filter((el, i) => `${el}-${i + 1}` !== listId));
  };

  const handlerChecked = (e) => {
    const listel = e.target;
    const tag = listel.tagName;
    if (tag === 'P' && !listel.style.textDecoration) {
      listel.style.textDecoration = 'line-through red';
    } else {
      listel.style.textDecoration = null;
    }
  };

  const showDeletor = () => {
    if (!isdeleted) {
      setIsdeleted(true);
      setIslink(false);
    } else {
      setIsdeleted(false);
    }
  };

  const showLink = () => {
    if (!islink) {
      setIslink(true);
      setIsdeleted(false);
    } else {
      setIslink(false);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Todo Next App</title>
      </Head>

      <header className={styles.header}>Header part</header>
      <main className={styles.main}>
        <h1>My Todo List</h1>
        <ul>
          {list.map((l, i) => (
            <li
              key={l}
              data-list={`${l}-${i + 1}`}
              className={styles.list}
              onClick={handlerChecked}
            >
              <p className={styles.text}>{l}</p>

              {isdeleted ? (
                <button
                  type="button"
                  className={styles.deleted}
                  onClick={handlerDeleted}
                >
                  X
                </button>
              ) : null}
              {islink ? (
                <Link href="/todo/[todo]" as={`/todo/${l}`}>
                  <a href="/#" className={styles.linked}>
                    &rarr;
                  </a>
                </Link>
              ) : null}
            </li>
          ))}
        </ul>
        <input
          type="text"
          name="add"
          onChange={handleChange}
          value={input}
          onKeyDown={isEnter}
        />
        <button type="button" onClick={addList}>
          Add
        </button>
        <div>
          <button type="button" onClick={showDeletor}>
            Delete
          </button>
          <button type="button" onClick={showLink}>
            Go List
          </button>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>Dev By koal4z</p>
      </footer>
    </div>
  );
}
