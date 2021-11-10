import MockAdapter from 'axios-mock-adapter'

import { fireEvent, render } from '@testing-library/react'
import { act } from 'react-dom/test-utils'

import { NewToDoModal } from '.'

import { api } from '../../services/api'
import { AuthProvider } from '../../providers/auth'

it('should render', () => {
  const modalRoot = document.createElement('div')
  modalRoot.setAttribute('id', 'modal-root')
  document.body.appendChild(modalRoot)

  const { getByPlaceholderText, getByTestId, getByText } = render(
    <NewToDoModal isVisible />
  )

  expect(getByText('Create a new ToDo')).toBeTruthy()
  expect(getByText('Create a new ToDo')).toBeInTheDocument()

  expect(getByTestId('newToDoModalCloseButton')).toBeTruthy()
  expect(getByTestId('newToDoModalCloseButton')).toBeInTheDocument()
  expect(getByTestId('newToDoModalCloseButton')).toBeInstanceOf(
    HTMLButtonElement
  )

  expect(getByPlaceholderText('Enter your task here')).toBeTruthy()
  expect(getByPlaceholderText('Enter your task here')).toBeInTheDocument()
  expect(getByPlaceholderText('Enter your task here')).toBeInstanceOf(
    HTMLTextAreaElement
  )

  expect(getByText('Create ToDo')).toBeTruthy()
  expect(getByText('Create ToDo')).toBeInTheDocument()
  expect(getByText('Create ToDo')).toBeInstanceOf(HTMLButtonElement)
})

it('should call the onDismiss function when the close button is clicked', async () => {
  const modalRoot = document.createElement('div')
  modalRoot.setAttribute('id', 'modal-root')
  document.body.appendChild(modalRoot)

  const onDismiss = jest.fn()
  const { getByTestId } = render(
    <NewToDoModal isVisible onDismiss={onDismiss} />
  )

  expect(getByTestId('newToDoModalCloseButton')).toBeTruthy()

  await act(async () => {
    fireEvent.click(getByTestId('newToDoModalCloseButton'))
  })

  expect(onDismiss).toHaveBeenCalledTimes(1)
})

it('should change textarea size automatically', () => {
  const modalRoot = document.createElement('div')
  modalRoot.setAttribute('id', 'modal-root')
  document.body.appendChild(modalRoot)

  const { getByPlaceholderText } = render(<NewToDoModal isVisible />)

  expect(getByPlaceholderText('Enter your task here')).toBeTruthy()
  const input = getByPlaceholderText(
    'Enter your task here'
  ) as HTMLTextAreaElement

  expect(input.style.height.length).toBe(0)

  act(() => {
    fireEvent.input(input, { key: 'a' })
  })

  expect(input.style.height.length).toBeTruthy()
  expect(input.style.height.length).toBe(3)
})

it('must create a new ToDo', async () => {
  const mock = new MockAdapter(api)

  const modalRoot = document.createElement('div')
  modalRoot.setAttribute('id', 'modal-root')
  document.body.appendChild(modalRoot)

  const onDismiss = jest.fn()
  const onNewToDo = jest.fn()
  const { getByPlaceholderText, getByText } = render(
    <NewToDoModal isVisible onDismiss={onDismiss} onNewToDo={onNewToDo} />
  )

  expect(getByPlaceholderText('Enter your task here')).toBeTruthy()
  const input = getByPlaceholderText(
    'Enter your task here'
  ) as HTMLTextAreaElement

  expect(getByText('Create ToDo')).toBeTruthy()
  const submitButton = getByText('Create ToDo')

  act(() => {
    fireEvent.change(input, { target: { value: 'Test' } })
  })

  expect(input.value).toEqual('Test')

  mock.onPost(`${process.env.REACT_APP_API_BASE_URL}/toDos`).reply(201, {
    toDo: {
      id: '18c165bb-fdbf-4dbe-a0c2-aeac09a80a79',
      task: 'Test',
      completed: false,
      completedAt: null,
      createdAt: Date.now(),
    },
  })

  await act(async () => {
    fireEvent.click(submitButton)
  })

  expect(onNewToDo).toHaveBeenCalledTimes(1)
  expect(onDismiss).toHaveBeenCalledTimes(1)
})

it('must call the logOut function if the return of the ToDo creation request returns a code 401', async () => {
  const mock = new MockAdapter(api)

  const modalRoot = document.createElement('div')
  modalRoot.setAttribute('id', 'modal-root')
  document.body.appendChild(modalRoot)

  const { getByPlaceholderText, getByText } = render(
    <AuthProvider>
      <NewToDoModal isVisible />
    </AuthProvider>
  )

  expect(getByPlaceholderText('Enter your task here')).toBeTruthy()
  const input = getByPlaceholderText(
    'Enter your task here'
  ) as HTMLTextAreaElement

  expect(getByText('Create ToDo')).toBeTruthy()
  const submitButton = getByText('Create ToDo')

  act(() => {
    fireEvent.change(input, { target: { value: 'Test' } })
  })

  expect(input.value).toEqual('Test')

  mock.onPost(`${process.env.REACT_APP_API_BASE_URL}/toDos`).reply(401, {})

  await act(async () => {
    fireEvent.click(submitButton)
  })
})
