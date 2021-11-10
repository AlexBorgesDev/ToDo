import { fireEvent, render } from '@testing-library/react'
import { act } from 'react-dom/test-utils'

import { Browser } from '.'

test('onScroll event', async () => {
  const { getByTestId, queryByTestId } = render(<Browser />)

  expect(queryByTestId('newToDoFloatButton')).toBeNull()

  await act(async () => {
    fireEvent.scroll(window, { target: { scrollY: 110 } })
  })

  expect(queryByTestId('newToDoFloatButton')).toBeTruthy()
  expect(queryByTestId('newToDoFloatButton')).toBeInTheDocument()
  expect(queryByTestId('newToDoFloatButton')).toBeInstanceOf(HTMLButtonElement)

  await act(async () => {
    fireEvent.click(getByTestId('newToDoFloatButton'))
  })

  await act(async () => {
    fireEvent.scroll(window, { target: { scrollY: 0 } })
  })

  expect(queryByTestId('newToDoFloatButton')).toBeNull()
})

test('toggle NewToDoModal visible', async () => {
  const modalRoot = document.createElement('div')
  modalRoot.setAttribute('id', 'modal-root')
  document.body.appendChild(modalRoot)

  const { getByTestId, queryByTestId } = render(<Browser />)

  expect(getByTestId('newToDoButton')).toBeTruthy()
  expect(getByTestId('newToDoButton')).toBeInTheDocument()
  expect(getByTestId('newToDoButton')).toBeInstanceOf(HTMLButtonElement)

  expect(queryByTestId('newToDoModalCloseButton')).toBeNull()

  await act(async () => {
    fireEvent.click(getByTestId('newToDoButton'))
  })

  expect(getByTestId('newToDoModalCloseButton')).toBeTruthy()
  expect(getByTestId('newToDoModalCloseButton')).toBeInTheDocument()
  expect(getByTestId('newToDoModalCloseButton')).toBeInstanceOf(
    HTMLButtonElement
  )
})
