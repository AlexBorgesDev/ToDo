import { useHistory } from 'react-router'
import { FaPlus, FaTimes } from 'react-icons/fa'
import { FormEvent, memo, useState } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

import styles from './styles.module.scss'

import { ToDoData } from '../../services/toDos/getToDos.service'

import createToDoService from '../../services/toDos/createToDo.service'

interface ModelNewToDoProps {
  visible?: boolean
  onVisible?: (state: boolean) => void
  onNewToDo?: (data: ToDoData) => void
}

const ModelNewToDo = (props: ModelNewToDoProps) => {
  const history = useHistory()

  const [task, setTask] = useState('')

  const [loading, setLoading] = useState(false)
  const [inputError, setInputError] = useState(false)

  const handleClose = async () => {
    if (loading) return

    props.onVisible && props.onVisible(!props.visible)
  }

  const handleLogOut = () => {
    localStorage.clear()
    history.push('/')
  }

  const handleAddNewToDo = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setLoading(true)

    const token = localStorage.getItem('@session_token')
    const refreshToken = localStorage.getItem('@session_refresh_token')

    if (!token || !refreshToken) return handleLogOut()

    const newToDo = await createToDoService({
      data: { refreshToken, task, token },
      onDataError: err => setInputError(err.includes('task')),
    })

    if (newToDo) {
      props.onNewToDo && props.onNewToDo(newToDo.data)

      setTask('')
      setLoading(false)
      return await handleClose()
    }

    setLoading(false)
  }

  return (
    <>
      {props.visible && (
        <div className={styles.container}>
          <form className={styles.content} onSubmit={handleAddNewToDo}>
            <div className={styles.title}>
              <h3>New ToDo</h3>

              <button type="button" onClick={handleClose}>
                <FaTimes />
              </button>
            </div>

            <div
              className={`${styles.input} ${inputError ? styles.error : ''}`}
            >
              <input
                type="text"
                value={task}
                disabled={loading}
                onChange={({ target }) => setTask(target.value)}
              />

              <button type="submit" disabled={loading}>
                {loading ? (
                  <div className={styles.loading}>
                    <AiOutlineLoading3Quarters />
                  </div>
                ) : (
                  <FaPlus />
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}

export default memo(ModelNewToDo)
