import { useHistory } from 'react-router-dom'
import { memo, useState } from 'react'
import { FaCheck, FaTrash } from 'react-icons/fa'

import styles from './styles.module.scss'

import updateToDoService from '../../services/toDos/updateToDo.service'

export interface ToDoProps {
  id: string
  task: string
  index?: number
  completed: boolean
  createdAt: number
  updatedAt?: number
  onRemove: (props: { id: string; index?: number }) => void
}

const ToDo = (props: ToDoProps) => {
  const history = useHistory()

  const [completed, setCompleted] = useState(props.completed)

  const handleCheck = async () => {
    const newValue = !completed
    setCompleted(newValue)

    const token = localStorage.getItem('@session_token')
    const refreshToken = localStorage.getItem('@session_refresh_token')

    if (!token || !refreshToken) return handleLogOut()

    try {
      await updateToDoService({
        id: props.id,
        completed: newValue,
        token,
        refreshToken,
      })
    } catch (err) {
      setCompleted(!newValue)
      alert('Something went wrong while trying to update a ToDo')
    }
  }

  const handleLogOut = () => {
    localStorage.clear()
    history.push('/')
  }

  const onRemove = () => props.onRemove({ id: props.id, index: props.index })

  return (
    <div className={styles.container} data-completed={completed}>
      <div className={styles.checkBox}>
        <button
          type="button"
          className={completed ? styles.check : undefined}
          onClick={handleCheck}
        >
          {completed && <FaCheck />}
        </button>
      </div>

      <p className={styles.content} data-completed={completed}>
        {props.task}
      </p>

      <div className={styles.trash}>
        <button type="button" onClick={onRemove}>
          <FaTrash />
        </button>
      </div>
    </div>
  )
}

export default memo(ToDo)
