import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useState } from 'react';

export default function Home() {
  const [list, setList] = useState(['list1', 'list2', 'list3']);
  const [input, setInput] = useState('');

  const addList = () => {
    if (input !== '') {
      setList([...list, input]);
      setInput('');
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);
  };

  const handlerDeleted = (e) => {
    const listData = e.target.dataset.list;
    setList(() => list.filter((el) => el !== listData));
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Todo Next App</title>
      </Head>

      <main>
        <h1>My Todo List</h1>
        <ul>
          {list.map((l) => {
            return (
              <li
                key={l}
                data-list={l}
                className={styles.list}
                onClick={handlerDeleted}
              >
                {l}
              </li>
            );
          })}
        </ul>
        <input type='text' name='add' onChange={handleChange} value={input} />
        <button onClick={addList}>Add</button>
      </main>

      <footer>
        <p>Dev By koal4z</p>
      </footer>
    </div>
  );
}
