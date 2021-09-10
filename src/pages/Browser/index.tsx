import { useHistory } from 'react-router-dom'
import { FaCheck, FaPlus, FaSignOutAlt } from 'react-icons/fa'
import { useCallback, useEffect, useState } from 'react'

import styles from './styles.module.scss'

import ToDo, { ToDoProps } from '../../components/ToDo'
import ModelNewToDo from '../../components/ModelNewToDo'

import getToDosService, {
  ToDoData,
} from '../../services/toDos/getToDos.service'

import deleteToDoService from '../../services/toDos/deleteToDo.service'

const Browser = () => {
  const history = useHistory()

  const [toDos, setToDos] = useState<ToDoData[]>([])

  const [visibleNewToDo, setVisibleNewToDo] = useState(false)

  const handleLogOut = useCallback(() => {
    localStorage.clear()

    history.push('/')
  }, [history])

  const handleDeleteToDo: ToDoProps['onRemove'] = async ({ id }) => {
    const token = localStorage.getItem('@session_token')
    const refreshToken = localStorage.getItem('@session_refresh_token')

    if (!token || !refreshToken) return handleLogOut()

    try {
      await deleteToDoService(id, { token, refreshToken })

      setToDos(toDos.filter(data => data.id !== id))
    } catch (err) {
      alert('Something went wrong when trying to delete ToDo')
    }
  }

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-extra-semi
    ;(async () => {
      const token = localStorage.getItem('@session_token')
      const refreshToken = localStorage.getItem('@session_refresh_token')

      if (!token || !refreshToken) return handleLogOut()

      const response = await getToDosService({
        token,
        refreshToken,
        onError: err => console.log(err),
      })

      if (response) setToDos(response)
    })()
  }, [handleLogOut])

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <section className={styles.topSection}>
          <h1 className={styles.title}>
            <FaCheck /> ToDo
          </h1>

          <button className={styles.logOutBtn} onClick={handleLogOut}>
            <FaSignOutAlt /> Log out
          </button>
        </section>

        {toDos.length === 0 ? (
          <div className={styles.notTodos}>
            <h3>You still don't have any ToDo</h3>
          </div>
        ) : (
          <main className={styles.main}>
            {toDos.map((toDo, index) => (
              <ToDo
                key={toDo.id}
                {...toDo}
                index={index}
                onRemove={handleDeleteToDo}
              />
            ))}
          </main>
        )}

        <button
          className={styles.btnAddToDo}
          onClick={() => setVisibleNewToDo(true)}
        >
          <FaPlus /> Add new ToDo
        </button>
      </div>

      <ModelNewToDo
        visible={visibleNewToDo}
        onVisible={setVisibleNewToDo}
        onNewToDo={newToDo => setToDos([...toDos, newToDo])}
      />
    </div>
  )
}

export default Browser
