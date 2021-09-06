import { FaPlus, FaTimes } from 'react-icons/fa'
import { FormEvent, memo, useState } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

import styles from './styles.module.scss'

interface ModelNewToDoProps {
  visible?: boolean
  onVisible?: (state: boolean) => void
  onNewToDo?: (data: {
    id: string
    task: string
    completed: boolean
    createdAt: number
    updatedAt?: number
  }) => void
}

const ModelNewToDo = (props: ModelNewToDoProps) => {
  const [task, setTask] = useState('')

  const [loading, setLoading] = useState(false)

  const handleClose = async () => {
    if (loading) return

    props.onVisible && props.onVisible(!props.visible)
  }

  const handleAddNewToDo = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setLoading(true)

    props.onNewToDo &&
      props.onNewToDo({
        id: String(Date.now()),
        task,
        completed: false,
        createdAt: Date.now(),
      })

    setLoading(false)

    await handleClose()
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

            <div className={styles.input}>
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
