import { fireEvent, render } from '@testing-library/react'
import { act } from 'react-dom/test-utils'

import { Navbar } from '.'

it('should render', () => {
  const { getByTestId } = render(<Navbar />)

  expect(getByTestId('navUserButton')).toBeTruthy()
  expect(getByTestId('navUserButton')).toBeInTheDocument()
  expect(getByTestId('navUserButton')).toBeInstanceOf(HTMLButtonElement)

  // Show dropdown
  act(() => {
    fireEvent.click(getByTestId('navUserButton'))
  })

  expect(getByTestId('navUserDropdown')).toBeTruthy()
  expect(getByTestId('navUserDropdown')).toBeInTheDocument()
  expect(getByTestId('navUserDropdown')).toBeInstanceOf(HTMLDivElement)
})
