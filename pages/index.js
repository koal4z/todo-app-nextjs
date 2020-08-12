import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import Link from 'next/link';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home({ listData }) {
  const [list, setList] = useState(listData);
  const [input, setInput] = useState('');
  const [isdeleted, setIsdeleted] = useState(false);
  const [islink, setIslink] = useState(false);

  const getListData = async () => {
    const res = await axios({
      method: 'GET',
      url: 'http://localhost:3000/api/list'
    });

    setList(res.data.data);
  };

  useEffect(() => {
    getListData();
  }, [list]);

  const createList = async (data) => {
    try {
      await axios({
        method: 'POST',
        url: 'http://localhost:3000/api/list',
        data
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  const deleteList = async (data) => {
    try {
      await axios({
        method: 'DELETE',
        url: 'http://localhost:3000/api/list',
        data
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  const addList = () => {
    if (input !== '') {
      // setList([...list, input]);
      createList({ name: input });
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
    const listId = { _id: e.target.parentNode.dataset.list };
    // setList(() => list.filter((el, i) => `${el}-${i + 1}` !== listId));
    deleteList(listId);
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
          {list.map((l) => (
            <li
              key={l._id}
              // data-list={`${l}-${i + 1}`}
              data-list={l._id}
              className={styles.list}
              onClick={handlerChecked}
            >
              <p className={styles.text}>{l.name}</p>

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
                <Link href="/todo/[todo]" as={`/todo/${l.name}`}>
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

Home.propTypes = {
  listData: PropTypes.instanceOf(Array).isRequired
};

export async function getStaticProps() {
  try {
    const res = await axios({
      method: 'GET',
      url: 'http://localhost:3000/api/list'
    });
    const listData = res.data.data;
    return {
      props: { listData }
    };
  } catch (err) {
    console.log(err.message);
  }
}
