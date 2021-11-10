import MockAdapter from 'axios-mock-adapter'

import { render } from '@testing-library/react'
import { sign } from 'jsonwebtoken'

import { AuthProvider } from '../../../providers/auth'
import { api } from '../../../services/api'
import { act } from 'react-dom/test-utils'

const userData = { name: 'User test', email: 'test@email.com' }

it('should render children', async () => {
  const { getByText } = render(
    <AuthProvider>
      <span>Test</span>
    </AuthProvider>
  )

  expect(getByText('Test')).toBeTruthy()
  expect(getByText('Test')).toBeInTheDocument()
  expect(getByText('Test')).toBeInstanceOf(HTMLSpanElement)
})

it('should get user data if token exists in localStorage', async () => {
  const token = sign(userData, 'testSecretKey', {
    subject: '94a55289-63bd-4463-94c2-358ad2070fb8',
    expiresIn: '1m',
  })

  localStorage.setItem('@toDo:token', token)

  const mock = new MockAdapter(api)

  mock
    .onPost(`${process.env.REACT_APP_API_BASE_URL}/session/token/refresh`)
    .reply(200, { token })

  mock.onGet(`${process.env.REACT_APP_API_BASE_URL}/users`).reply(200, userData)

  await act(async () => {
    render(
      <AuthProvider>
        <div />
      </AuthProvider>
    )
  })
})

it('must call the signOut function if the token is expired', async () => {
  const token = sign(userData, 'testSecretKey', {
    subject: '94a55289-63bd-4463-94c2-358ad2070fb8',
    expiresIn: '1ms',
  })

  localStorage.setItem('@toDo:token', token)

  await new Promise(resolve => setTimeout(resolve, 5))

  await act(async () => {
    render(
      <AuthProvider>
        <div />
      </AuthProvider>
    )
  })
})
