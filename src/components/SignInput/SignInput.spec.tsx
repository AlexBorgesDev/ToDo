import { fireEvent, render } from '@testing-library/react'
import { act } from 'react-dom/test-utils'

import { SignInput } from '.'

it('should render', () => {
  const onFocus = jest.fn()
  const { getByText, getByTestId } = render(
    <SignInput label="Test" backgroundColor="#fff" onFocus={onFocus} />
  )

  expect(getByTestId('signInput')).toBeTruthy()
  expect(getByTestId('signInput')).toBeInTheDocument()
  expect(getByTestId('signInput')).toBeInstanceOf(HTMLInputElement)

  expect(getByText('Test')).toBeTruthy()
  expect(getByText('Test')).toBeInTheDocument()
  expect(getByText('Test')).toBeInstanceOf(HTMLLabelElement)

  // Test whether the focus is going to the input when the label is clicked
  act(() => {
    fireEvent.click(getByText('Test'))
  })

  expect(onFocus).toBeCalledTimes(1)
})
