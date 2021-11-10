import { render } from '@testing-library/react'

import { Button } from '.'

it('should render', () => {
  const { getByTestId, getByText, rerender } = render(<Button>Test</Button>)

  expect(getByText('Test')).toBeTruthy()
  expect(getByText('Test')).toBeInTheDocument()
  expect(getByText('Test')).toBeInstanceOf(HTMLButtonElement)

  rerender(<Button loading>Test</Button>)

  expect(getByTestId('buttonLoading')).toBeTruthy()
  expect(getByTestId('buttonLoading')).toBeInTheDocument()
  expect(getByTestId('buttonLoading')).toBeInstanceOf(HTMLSpanElement)
})
