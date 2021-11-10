import { render } from '@testing-library/react'
import { Portal } from '.'

test('Postal should return a fragment if a div with id modal-root does not exist', () => {
  const { asFragment } = render(
    <Portal>
      <span>Test</span>
    </Portal>
  )

  expect(asFragment()).toBeTruthy()
  expect(asFragment()).toBeInstanceOf(DocumentFragment)
})

test('Portal should render', () => {
  const modalRoot = document.createElement('div')
  modalRoot.setAttribute('id', 'modal-root')
  document.body.appendChild(modalRoot)

  const { getByText } = render(
    <Portal>
      <span>Test</span>
    </Portal>
  )

  expect(getByText('Test')).toBeTruthy()
  expect(getByText('Test')).toBeInTheDocument()
  expect(getByText('Test')).toBeInstanceOf(HTMLSpanElement)
})
