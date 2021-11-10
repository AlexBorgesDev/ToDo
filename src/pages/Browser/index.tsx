import { useEffect, useRef, useState } from 'react'
import { FaPlus } from 'react-icons/fa'

// Components
import { Navbar } from '../../components/Navbar'
import { NewToDoModal } from '../../components/NewToDoModal'
import { ToDo } from '../../components/ToDoItem'
import { ToDos } from '../../components/ToDos'

import {
  Container,
  Content,
  NewToDoButton,
  NewToDoButtonIcon,
  NewToDoFloatButton,
} from './styles'

export function Browser() {
  const contentRef = useRef<HTMLDivElement>(null)

  const [newToDo, setNewToDo] = useState<ToDo | undefined>(undefined)
  const [isVisibleAddToDoModal, setIsVisibleAddToDoModal] = useState(false)

  const [isVisibleAddFloatButton, setIsVisibleAddFloatButton] = useState(false)
  const [toDoFloatButtonPosition, setToDoFloatButtonPosition] =
    useState<number>()

  function handleNewToDo(toDo: ToDo) {
    setNewToDo(toDo)
  }

  useEffect(() => {
    function handleSetToDoFloatButtonPosition() {
      if (contentRef.current) {
        const cords = contentRef.current.getBoundingClientRect()
        setToDoFloatButtonPosition(cords.left + cords.width - 62)
      }
    }

    handleSetToDoFloatButtonPosition()
    window.addEventListener('resize', handleSetToDoFloatButtonPosition)

    return () => {
      window.removeEventListener('resize', handleSetToDoFloatButtonPosition)
    }
  }, [])

  useEffect(() => {
    function onScroll({ currentTarget }: HTMLElementEventMap['scroll']) {
      const element = currentTarget as Window

      if (element.scrollY > 80) setIsVisibleAddFloatButton(true)
      else setIsVisibleAddFloatButton(false)
    }

    window.addEventListener('scroll', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <Container>
      <Navbar />

      <Content ref={contentRef}>
        <NewToDoButton
          data-testid="newToDoButton"
          onClick={() => setIsVisibleAddToDoModal(true)}
        >
          <NewToDoButtonIcon>
            <FaPlus />
          </NewToDoButtonIcon>
          Add new ToDo
        </NewToDoButton>

        <ToDos newToDo={newToDo} />

        {isVisibleAddFloatButton && (
          <NewToDoFloatButton
            data-testid="newToDoFloatButton"
            positionX={toDoFloatButtonPosition}
            onClick={() => setIsVisibleAddToDoModal(true)}
          >
            <FaPlus />
          </NewToDoFloatButton>
        )}
      </Content>

      <NewToDoModal
        isVisible={isVisibleAddToDoModal}
        onNewToDo={handleNewToDo}
        onDismiss={setIsVisibleAddToDoModal}
      />
    </Container>
  )
}
