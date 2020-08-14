import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

import axios from 'axios';
import styles from '../../styles/todoPages.module.css';

export default function Todo({ todoData }) {
  const router = useRouter();
  const { todo } = router.query;

  const [showInput, setShowInput] = useState(false);
  const [input, setInput] = useState('');
  const [list, setList] = useState(todoData);
  const [isdeleted, setIsdeleted] = useState(false);
  const [showReplace, setShowReplace] = useState(false);

  const getAllTodoData = async () => {
    try {
      const res = await axios({
        method: 'GET',
        url: `http://localhost:3000/api/todo/${todo}`
      });

      setList(res.data.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getAllTodoData();
  }, [list]);

  const createTodoData = async (data) => {
    try {
      await axios({
        method: 'POST',
        url: `http://localhost:3000/api/todo/${todo}`,
        data
      });
    } catch (err) {
      console.log(err);
    }
  };

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
      // setList([...list, input]);
      createTodoData({ name: input, listName: todo });
      setInput('');
    }
  };

  const isEnter = (e) => {
    if (e.keyCode === 13) {
      addList();
      setInput('');
    }
  };

  const deleteTodoData = async (data) => {
    try {
      await axios({
        method: 'DELETE',
        url: `http://localhost:3000/api/todo/${todo}`,
        data
      });
    } catch (err) {
      console.log(err);
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
    const todoId = e.target.parentNode.dataset.list;

    deleteTodoData({ id: todoId });
    // return setList(() => list.filter((el, i) => `${el}-${i + 1}` !== listId));
  };

  const allDelete = async () => {
    // setList([]);
    try {
      await axios({
        method: 'DELETE',
        url: `http://localhost:3000/api/todo/${todo}`,
        data: { type: 'deleteAll', listName: todo }
      });
    } catch (err) {
      console.log(err);
    }
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
            {list.map((l) => (
              <li key={l._id} data-list={l._id}>
                {!showReplace ? (
                  <p>{l.name}</p>
                ) : (
                  <input
                    type="text"
                    className="inputReplace"
                    placeholder={l.name}
                  />
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
          <button type="button" onClick={allDelete}>
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

Todo.propTypes = {
  todoData: PropTypes.instanceOf(Array).isRequired
};

export async function getStaticProps({ params }) {
  try {
    const res = await axios({
      method: 'GET',
      url: `http://localhost:3000/api/todo/${params.todo}`
    });
    const todoData = res.data.data;

    return {
      props: { todoData }
    };
  } catch (err) {
    console.log(err.message);
  }
}

const getParams = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: 'http://localhost:3000/api/list'
    });
    return res.data.data.map((l) => l.name);
  } catch (err) {
    console.log(err.message);
  }
};

export async function getStaticPaths() {
  const listNames = await getParams();
  const paths = listNames.map((ln) => {
    return { params: { todo: ln } };
  });

  return {
    paths: paths,
    fallback: false
  };
}
