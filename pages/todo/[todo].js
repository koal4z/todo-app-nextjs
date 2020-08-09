import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import styles from '../../styles/todoPages.module.css';

export default function Todo() {
  const router = useRouter();
  const { todo } = router.query;

  const [showInput, setShowInput] = useState(false);
  const [input, setInput] = useState('');
  const [list, setList] = useState(['todo1', 'todo2', 'todo3']);
  const [isdeleted, setIsdeleted] = useState(false);
  const [showReplace, setShowReplace] = useState(false);

  const isShowInput = () => {
    if (!showInput) {
      setShowInput(true);
    } else {
      setShowInput(false);
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setInput(value);
  };

  const addList = () => {
    if (input !== '') {
      setList([...list, input]);
      setInput('');
    }
  };

  const isEnter = (e) => {
    if (e.keyCode === 13) {
      addList();
      setInput('');
    }
  };

  const showDeletor = () => {
    if (!isdeleted) {
      setIsdeleted(true);
    } else {
      setIsdeleted(false);
    }
  };

  const handlerDeleted = (e) => {
    const listId = e.target.parentNode.dataset.list;
    return setList(() => list.filter((el, i) => `${el}-${i + 1}` !== listId));
  };

  const alldelete = () => {
    setList([]);
  };

  const handlerReplace = () => {
    if (!showReplace) {
      setShowReplace(true);
    } else {
      setShowReplace(false);
      const inputEl = Array.from(document.querySelectorAll('.inputReplace'));
      const newTodo = [];

      inputEl.forEach((el) => {
        if (el.value) {
          newTodo.push(el.value);
        } else {
          newTodo.push(el.placeholder);
        }
      });

      setList(newTodo);
    }
  };

  return (
    <>
      <Head>
        <title>Todo-App | {todo}</title>
      </Head>
      <div className={styles.container}>
        <header className={styles.header}>todo : {todo}</header>
        <main className={styles.listZone}>
          <ul>
            {list.map((l, i) => (
              <li key={l} data-list={`${l}-${i + 1}`}>
                {!showReplace ? (
                  <p>{l}</p>
                ) : (
                  <input type="text" className="inputReplace" placeholder={l} />
                )}
                {isdeleted ? (
                  <button
                    type="button"
                    className={styles.deleted}
                    onClick={handlerDeleted}
                  >
                    X
                  </button>
                ) : null}
              </li>
            ))}
          </ul>
          {showInput ? (
            <input
              type="text"
              onChange={handleChange}
              onKeyDown={isEnter}
              value={input}
            />
          ) : null}
        </main>

        <div className={styles.buttonZone}>
          <button type="button" onClick={isShowInput}>
            add
          </button>
          <button type="button" onClick={handlerReplace}>
            replace
          </button>
          <button type="button" onClick={showDeletor}>
            delete
          </button>
          <div className={styles.gab}> </div>
          <button type="button" onClick={alldelete}>
            delete all
          </button>
        </div>
        <div className={styles.backtohomeZone}>
          <a href="/">back to home</a>
        </div>
      </div>
    </>
  );
}
