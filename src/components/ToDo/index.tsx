import { memo, useState } from 'react'
import { FaCheck, FaTrash } from 'react-icons/fa'

import styles from './styles.module.scss'

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
  const [completed, setCompleted] = useState(props.completed)

  const handleCheck = () => {
    setCompleted(!completed)
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
