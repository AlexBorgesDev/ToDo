import { useState } from 'react'
import { FaSignOutAlt } from 'react-icons/fa'

import styles from './styles.module.scss'

import ToDo, { ToDoProps } from '../../components/ToDo'

const Browser = () => {
  const [toDos, setToDos] = useState<ToDoProps[]>([])

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <section className={styles.topSection}>
          <button className={styles.logOutBtn}>
            <FaSignOutAlt /> Log out
          </button>
        </section>

        {toDos.length === 0 ? (
          <div className={styles.notTodos}>
            <h3>You still don't have any ToDo</h3>
          </div>
        ) : (
          <main className={styles.main}>
            {toDos.map(toDo => (
              <ToDo key={toDo.id} {...toDo} />
            ))}
          </main>
        )}

        <footer></footer>
      </div>
    </div>
  )
}

export default Browser
