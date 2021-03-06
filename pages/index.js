import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import Link from 'next/link';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

import Header from '../components/header';
import Footer from '../components/footer';

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
    const abortController = new AbortController();
    getListData();
    return function cleanUp() {
      abortController.abort();
    };
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
    const l = JSON.parse(e.target.parentNode.dataset.list);
    // setList(() => list.filter((el, i) => `${el}-${i + 1}` !== listId));
    deleteList(l);
  };

  const handlerChecked = (e) => {
    const listel = e.target;
    const tag = listel.tagName;
    const text = listel.parentNode.querySelector('span');
    if (tag === 'P' && !listel.style.textDecoration) {
      listel.style.textDecoration = 'line-through red';
      text.innerHTML = '&#10003;';
    } else {
      listel.style.textDecoration = null;
      text.innerHTML = ' ';
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
      <Header />
      <main className={styles.main}>
        <h1>My Todo List</h1>
        <ul>
          {list.map((l) => (
            <li
              key={l._id}
              // data-list={`${l}-${i + 1}`}
              data-list={JSON.stringify(l)}
              className={styles.list}
              onClick={handlerChecked}
            >
              <span className={styles.checkmark}> </span>
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
                    &#10132;
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
      <Footer />
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
