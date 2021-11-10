import { FormEvent, memo, useEffect, useRef, useState } from 'react'
import { FaTimes } from 'react-icons/fa'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import axios, { AxiosError } from 'axios'

import { ToDo } from '../ToDoItem'
import { Portal } from '../Portal'
import { ToDoValidations } from '../../validations/ToDoValidations'

import { api } from '../../services/api'
import { useAuth } from '../../hooks/useAuth'

import {
  CharacterCounter,
  CloseButton,
  Container,
  Content,
  Footer,
  Input,
  SubmitButton,
  Title,
  TitleContainer,
} from './styles'

type Props = {
  isVisible?: boolean
  onNewToDo?: (toDo: ToDo) => void
  onDismiss?: (isVisible: false) => void
}

type ApiResponse = {
  message: string
  toDo: ToDo
}

export const NewToDoModal = memo(function NewToDoModal({
  isVisible,
  onDismiss,
  onNewToDo,
}: Props) {
  const { signOut } = useAuth()

  const inputRef = useRef<HTMLTextAreaElement>(null)

  const [task, setTask] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleCreateNewToDo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)

    const errors = await new ToDoValidations({ task }).create()
    if (errors.length > 0) return setLoading(false)

    try {
      const response = await api.post<ApiResponse>('toDos', { task })

      setLoading(false)
      setTask('')

      onNewToDo && onNewToDo(response.data.toDo)
      onDismiss && onDismiss(false)
    } catch (err: unknown | AxiosError) {
      if (axios.isAxiosError(err) && err.response?.status === 401) signOut()
    }
  }

  useEffect(() => {
    const input = inputRef.current

    function autoSize({ target }: Event) {
      const element = target as HTMLTextAreaElement

      element.style.height = '0px'
      element.style.height = `${element.scrollHeight + 5}px`
    }

    input?.addEventListener('input', autoSize)

    return () => {
      input?.removeEventListener('input', autoSize)
    }
  }, [])

  return (
    <Portal>
      {isVisible && (
        <Container>
          <Content onSubmit={handleCreateNewToDo}>
            <TitleContainer>
              <Title>Create a new ToDo</Title>

              <CloseButton
                data-testid="newToDoModalCloseButton"
                onClick={() => onDismiss && onDismiss(false)}
              >
                <FaTimes />
              </CloseButton>
            </TitleContainer>

            <Input
              ref={inputRef}
              value={task}
              maxLength={250}
              placeholder="Enter your task here"
              onChange={({ target }) => setTask(target.value)}
            />

            <Footer>
              <CharacterCounter error={task.length > 250}>
                {task.length}/250
              </CharacterCounter>

              <SubmitButton
                type="submit"
                disabled={task.length < 2 || task.length > 250}
                loading={loading}
              >
                Create ToDo
              </SubmitButton>
            </Footer>
          </Content>
        </Container>
      )}
    </Portal>
  )
})
