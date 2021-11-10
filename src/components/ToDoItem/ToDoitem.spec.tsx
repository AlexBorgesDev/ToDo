import MockAdapter from 'axios-mock-adapter'

import { fireEvent, render } from '@testing-library/react'
import { act } from 'react-dom/test-utils'

import { ToDoItem } from '.'

import { api } from '../../services/api'
import { AuthProvider } from '../../providers/auth'

const data = {
  id: 'id',
  task: 'Test',
  completed: true,
  createdAt: Date.now(),
  completedAt: Date.now(),
}

it('should render', () => {
  const { getByText } = render(<ToDoItem data={data} />)

  expect(getByText('Test')).toBeTruthy()
  expect(getByText('Test')).toBeInTheDocument()
})

describe('handleCompleted', () => {
  it('must change the complete successfully', async () => {
    const mock = new MockAdapter(api)

    const onCompleted = jest.fn()
    const { getByTestId } = render(
      <ToDoItem data={data} onCompleted={onCompleted} />
    )

    expect(getByTestId('toDoItemCheck')).toBeTruthy()
    expect(getByTestId('toDoItemCheck')).toBeInTheDocument()
    expect(getByTestId('toDoItemCheck')).toBeInstanceOf(HTMLButtonElement)

    mock
      .onPatch(`${process.env.REACT_APP_API_BASE_URL}/toDos/${data.id}`)
      .reply(200, { toDo: { ...data, completed: false, createdAt: null } })

    await act(async () => {
      fireEvent.click(getByTestId('toDoItemCheck'))
    })

    expect(onCompleted).toBeCalledTimes(1)
  })

  it('should return an error when trying to update completed', async () => {
    const mock = new MockAdapter(api)

    const { getByTestId } = render(
      <AuthProvider>
        <ToDoItem data={data} />
      </AuthProvider>
    )

    expect(getByTestId('toDoItemCheck')).toBeTruthy()
    expect(getByTestId('toDoItemCheck')).toBeInTheDocument()
    expect(getByTestId('toDoItemCheck')).toBeInstanceOf(HTMLButtonElement)

    mock
      .onPatch(`${process.env.REACT_APP_API_BASE_URL}/toDos/${data.id}`)
      .reply(401)

    await act(async () => {
      fireEvent.click(getByTestId('toDoItemCheck'))
    })
  })
})

describe('handleDeleteToDo', () => {
  it('must delete ToDo successfully', async () => {
    const mock = new MockAdapter(api)

    const onDeleted = jest.fn()
    const { getByTestId } = render(
      <ToDoItem data={data} onDeleted={onDeleted} />
    )

    expect(getByTestId('toDoItemDelete')).toBeTruthy()
    expect(getByTestId('toDoItemDelete')).toBeInTheDocument()
    expect(getByTestId('toDoItemDelete')).toBeInstanceOf(HTMLButtonElement)

    mock
      .onDelete(`${process.env.REACT_APP_API_BASE_URL}/toDos/${data.id}`)
      .reply(200)

    await act(async () => {
      fireEvent.click(getByTestId('toDoItemDelete'))
    })

    expect(onDeleted).toBeCalledTimes(1)
  })

  it('should return an error when trying to delete ToDo', async () => {
    const mock = new MockAdapter(api)

    const { getByTestId } = render(
      <AuthProvider>
        <ToDoItem data={data} />
      </AuthProvider>
    )

    expect(getByTestId('toDoItemDelete')).toBeTruthy()
    expect(getByTestId('toDoItemDelete')).toBeInTheDocument()
    expect(getByTestId('toDoItemDelete')).toBeInstanceOf(HTMLButtonElement)

    mock
      .onDelete(`${process.env.REACT_APP_API_BASE_URL}/toDos/${data.id}`)
      .reply(401)

    await act(async () => {
      fireEvent.click(getByTestId('toDoItemDelete'))
    })
  })
})
