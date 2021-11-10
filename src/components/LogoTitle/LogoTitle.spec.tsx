import { render } from '@testing-library/react'

import { LogoTitle } from '.'

it('should render', () => {
  const { getByText } = render(<LogoTitle />)

  expect(getByText('ToDo')).toBeTruthy()
  expect(getByText('ToDo')).toBeInTheDocument()
})
