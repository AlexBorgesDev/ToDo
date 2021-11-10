import { memo, useState } from 'react'
import { FaCheck, FaTrash } from 'react-icons/fa'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import axios, { AxiosError } from 'axios'

import moment from 'moment'

import { api } from '../../services/api'
import { useAuth } from '../../hooks/useAuth'

import {
  CheckButton,
  CompletedContainer,
  CompletedText,
  Container,
  TaskText,
  TaskTextContainer,
  TrashButton,
} from './styles'

export type ToDo = {
  id: string
  task: string
  completed: boolean
  completedAt?: number | Date | null
  createdAt: number | Date
}

type Props = {
  data: ToDo
  onDeleted?: (id: string) => void
  onCompleted?: (toDo: ToDo) => void
}

function CToDoItem({ data, onDeleted, onCompleted }: Props) {
  const { signOut } = useAuth()

  const [hide, setHide] = useState(false)
  const [completed, setCompleted] = useState(data.completed)
  const [completedAt, setCompletedAt] = useState(data.completedAt)
  const [loadingCompleted, setLoadingCompleted] = useState(false)

  async function handleCompleted() {
    setLoadingCompleted(true)

    try {
      const response = await api.patch<{ toDo: ToDo }>(`toDos/${data.id}`, {
        completed: !completed,
      })

      setCompleted(!completed)
      setCompletedAt(response.data.toDo.completedAt)

      onCompleted && onCompleted(response.data.toDo)
    } catch (err: unknown | AxiosError) {
      if (axios.isAxiosError(err)) {
        err.response?.status === 401 && signOut()
      }
    }

    setLoadingCompleted(false)
  }

  async function handleDeleteToDo() {
    setHide(true)

    try {
      await api.delete(`toDos/${data.id}`)

      onDeleted && onDeleted(data.id)
    } catch (err: unknown | AxiosError) {
      setHide(false)

      if (axios.isAxiosError(err)) {
        err.response?.status === 401 && signOut()
      }
    }
  }

  return (
    <Container completed={!!(completed && completedAt)} hide={hide}>
      {completed && completedAt && (
        <CompletedContainer>
          <CompletedText>
            Completed in {moment(completedAt).format('LLL')}
          </CompletedText>
        </CompletedContainer>
      )}

      <div>
        <CheckButton
          disabled={loadingCompleted}
          selected={completed}
          data-testid="toDoItemCheck"
          onClick={handleCompleted}
        >
          <FaCheck />
        </CheckButton>
      </div>

      <TaskTextContainer>
        <TaskText>{data.task}</TaskText>
      </TaskTextContainer>

      <div>
        <TrashButton data-testid="toDoItemDelete" onClick={handleDeleteToDo}>
          <FaTrash />
        </TrashButton>
      </div>
    </Container>
  )
}

export const ToDoItem = memo(CToDoItem)
