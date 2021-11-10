import MockAdapter from 'axios-mock-adapter'

import { act } from 'react-dom/test-utils'
import { fireEvent, render } from '@testing-library/react'

import { ToDos } from '.'
import { api } from '../../services/api'

const toDos = [
  {
    id: 'id',
    task: 'Test',
    completed: true,
    createdAt: Date.now(),
    completedAt: Date.now(),
  },
]

it('should remove a ToDo from the ToDos list', async () => {
  const container = document.createElement('div')
  document.body.appendChild(container)

  const mock = new MockAdapter(api)
  mock.onGet(`${process.env.REACT_APP_API_BASE_URL}/toDos`).reply(200, toDos)

  await act(async () => {
    render(<ToDos />, { container })
  })

  const deleteButton = document.querySelector('[data-testid="toDoItemDelete"]')
  expect(deleteButton).toBeTruthy()
  expect(deleteButton).toBeInTheDocument()
  expect(deleteButton).toBeInstanceOf(HTMLButtonElement)

  mock
    .onDelete(`${process.env.REACT_APP_API_BASE_URL}/toDos/${toDos[0].id}`)
    .reply(200)

  await act(async () => {
    fireEvent.click(deleteButton as HTMLButtonElement)
  })

  expect(document.querySelector('[data-testid="toDoItemDelete"]')).toBeNull()
})

it('should show the ToDos according to the selected filter', async () => {
  const container = document.createElement('div')
  document.body.appendChild(container)

  const mock = new MockAdapter(api)
  mock.onGet(`${process.env.REACT_APP_API_BASE_URL}/toDos`).reply(200, toDos)

  await act(async () => {
    render(<ToDos />, { container })
  })

  // checks if there is a ToDo item
  expect(document.querySelector('[data-testid="toDoItemDelete"]')).toBeTruthy()

  const completedOption = document.querySelector('[value="Completed"]')
  expect(completedOption).toBeTruthy()
  expect(completedOption).toBeInstanceOf(HTMLButtonElement)

  await act(async () => {
    fireEvent.click(completedOption as HTMLButtonElement)
  })

  // it must still run a ToDo item, as there is a ToDo with completed true in the list
  expect(document.querySelector('[data-testid="toDoItemDelete"]')).toBeTruthy()

  const notCompletedOption = document.querySelector('[value="Not completed"]')
  expect(notCompletedOption).toBeTruthy()
  expect(notCompletedOption).toBeInstanceOf(HTMLButtonElement)

  await act(async () => {
    fireEvent.click(notCompletedOption as HTMLButtonElement)
  })

  // should not return a ToDo item, as there is no ToDo with completed true in the list
  expect(document.querySelector('[data-testid="toDoItemDelete"]')).toBeNull()
})

it('should add the ToDo passed in the newTodo property to the ToDos list', async () => {
  const container = document.createElement('div')
  document.body.appendChild(container)

  const mock = new MockAdapter(api)
  mock.onGet(`${process.env.REACT_APP_API_BASE_URL}/toDos`).reply(200, [])

  await act(async () => {
    render(<ToDos />, { container })
  })

  // check if there is any ToDo
  expect(container.querySelector('[data-testid="toDoItemDelete"]')).toBeNull()

  await act(async () => {
    render(<ToDos newToDo={toDos[0]} />, { container })
  })

  const toDoItem = container.querySelector('[data-testid="toDoItemDelete"]')
  expect(toDoItem).toBeTruthy()
  expect(toDoItem).toBeInTheDocument()
  expect(toDoItem).toBeInstanceOf(HTMLButtonElement)
})

test('onCompleted', async () => {
  const container = document.createElement('div')
  document.body.appendChild(container)

  const mock = new MockAdapter(api)
  mock.onGet(`${process.env.REACT_APP_API_BASE_URL}/toDos`).reply(200, toDos)

  await act(async () => {
    render(<ToDos />, { container })
  })

  const completeButton = container.querySelector<HTMLButtonElement>(
    '[data-testid="toDoItemCheck"]'
  )

  expect(completeButton).toBeTruthy()
  expect(completeButton).toBeInTheDocument()
  expect(completeButton).toBeInstanceOf(HTMLButtonElement)

  mock
    .onPatch(`${process.env.REACT_APP_API_BASE_URL}/toDos/${toDos[0].id}`)
    .reply(200, { toDo: { ...toDos[0], completed: false, createdAt: null } })

  await act(async () => {
    fireEvent.click(completeButton as HTMLButtonElement)
  })
})
