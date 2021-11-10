import MockAdapter from 'axios-mock-adapter'

import { fireEvent, render } from '@testing-library/react'
import { act } from 'react-dom/test-utils'

import { Authenticate } from '.'
import { AuthProvider } from '../../providers/auth'
import { api } from '../../services/api'

describe('toggle form', () => {
  it('should change the form type to signUp', async () => {
    window.history.pushState({}, '', '/signIn')
    const { getByTestId } = render(<Authenticate />)

    expect(getByTestId('authenticateSubmitButton')).toBeTruthy()
    expect(getByTestId('authenticateSubmitButton')).toBeInTheDocument()
    const submitButton = getByTestId('authenticateSubmitButton')

    expect(submitButton).toBeInstanceOf(HTMLButtonElement)
    expect(submitButton.textContent).toEqual('SIGN IN')

    expect(getByTestId('authenticateToggleFormButton')).toBeTruthy()
    expect(getByTestId('authenticateToggleFormButton')).toBeInTheDocument()
    const toggleForm = getByTestId('authenticateToggleFormButton')

    expect(toggleForm).toBeInstanceOf(HTMLButtonElement)
    expect(toggleForm.textContent).toEqual('SIGN UP')

    act(() => {
      fireEvent.click(toggleForm)
    })

    expect(submitButton.textContent).toEqual('SIGN UP')
    expect(toggleForm.textContent).toEqual('SIGN IN')
  })
})

describe('input errors', () => {
  it('signIn input errors', async () => {
    window.history.pushState({}, '', '/signIn')
    const { getByTestId } = render(<Authenticate />)

    expect(getByTestId('authenticateEmail')).toBeTruthy()
    const emailInput = getByTestId('authenticateEmail')

    expect(getByTestId('authenticatePassword')).toBeTruthy()
    const passwordInput = getByTestId('authenticatePassword')

    expect(getByTestId('authenticateSubmitButton')).toBeTruthy()
    expect(getByTestId('authenticateSubmitButton').textContent).toEqual(
      'SIGN IN'
    )
    const submitButton = getByTestId('authenticateSubmitButton')

    act(() => {
      fireEvent.change(emailInput, { target: { value: 'invalid' } })
      fireEvent.change(passwordInput, { target: { value: '123456' } })
    })

    await act(async () => {
      fireEvent.click(submitButton)
    })

    // Fix the wrong data
    act(() => {
      fireEvent.change(emailInput, { target: { value: 'test@email.com' } })
      fireEvent.change(passwordInput, { target: { value: '123456789' } })
    })
  })

  it('signUp input errors', async () => {
    window.history.pushState({}, '', '/signUp')
    const { getByTestId } = render(<Authenticate />)

    expect(getByTestId('authenticateName')).toBeTruthy()
    const nameInput = getByTestId('authenticateName')

    expect(getByTestId('authenticateEmail')).toBeTruthy()
    const emailInput = getByTestId('authenticateEmail')

    expect(getByTestId('authenticatePassword')).toBeTruthy()
    const passwordInput = getByTestId('authenticatePassword')

    expect(getByTestId('authenticateSubmitButton')).toBeTruthy()
    expect(getByTestId('authenticateSubmitButton').textContent).toEqual(
      'SIGN UP'
    )
    const submitButton = getByTestId('authenticateSubmitButton')

    act(() => {
      fireEvent.change(nameInput, { target: { value: 'e' } })
      fireEvent.change(emailInput, { target: { value: 'invalid' } })
      fireEvent.change(passwordInput, { target: { value: '123456' } })
    })

    await act(async () => {
      fireEvent.click(submitButton)
    })
  })
})

describe('signIn', () => {
  it('failed signIn', async () => {
    const mock = new MockAdapter(api)

    window.history.pushState({}, '', '/signIn')
    const { getByTestId } = render(
      <AuthProvider>
        <Authenticate />
      </AuthProvider>
    )

    expect(getByTestId('authenticateEmail')).toBeTruthy()
    const emailInput = getByTestId('authenticateEmail')

    expect(getByTestId('authenticatePassword')).toBeTruthy()
    const passwordInput = getByTestId('authenticatePassword')

    expect(getByTestId('authenticateSubmitButton')).toBeTruthy()
    expect(getByTestId('authenticateSubmitButton').textContent).toEqual(
      'SIGN IN'
    )
    const submitButton = getByTestId('authenticateSubmitButton')

    mock
      .onPost(`${process.env.REACT_APP_API_BASE_URL}/session/signIn`)
      .reply(401, { description: 'Invalid email or password' })

    act(() => {
      fireEvent.change(emailInput, { target: { value: 'test@email.com' } })
      fireEvent.change(passwordInput, { target: { value: '123456789' } })
    })

    await act(async () => {
      fireEvent.click(submitButton)
    })
  })

  it('success signIn', async () => {
    const mock = new MockAdapter(api)

    const { getByTestId } = render(
      <AuthProvider>
        <Authenticate />
      </AuthProvider>
    )

    expect(getByTestId('authenticateEmail')).toBeTruthy()
    const emailInput = getByTestId('authenticateEmail')

    expect(getByTestId('authenticatePassword')).toBeTruthy()
    const passwordInput = getByTestId('authenticatePassword')

    expect(getByTestId('authenticateSubmitButton')).toBeTruthy()
    expect(getByTestId('authenticateSubmitButton').textContent).toEqual(
      'SIGN IN'
    )
    const submitButton = getByTestId('authenticateSubmitButton')

    mock
      .onPost(`${process.env.REACT_APP_API_BASE_URL}/session/signIn`)
      .reply(200, {
        token: 'token',
        user: { name: 'User Test', email: 'test@email.com' },
      })

    act(() => {
      fireEvent.change(emailInput, { target: { value: 'test@email.com' } })
      fireEvent.change(passwordInput, { target: { value: '123456789' } })
    })

    await act(async () => {
      fireEvent.click(submitButton)
    })
  })
})

describe('signUp', () => {
  it('failed signUp', async () => {
    const mock = new MockAdapter(api)

    window.history.pushState({}, '', '/signUp')
    const { getByTestId } = render(<Authenticate />)

    expect(getByTestId('authenticateName')).toBeTruthy()
    const nameInput = getByTestId('authenticateName')

    expect(getByTestId('authenticateEmail')).toBeTruthy()
    const emailInput = getByTestId('authenticateEmail')

    expect(getByTestId('authenticatePassword')).toBeTruthy()
    const passwordInput = getByTestId('authenticatePassword')

    expect(getByTestId('authenticateSubmitButton')).toBeTruthy()
    expect(getByTestId('authenticateSubmitButton').textContent).toEqual(
      'SIGN UP'
    )
    const submitButton = getByTestId('authenticateSubmitButton')

    mock
      .onPost(`${process.env.REACT_APP_API_BASE_URL}/users`)
      .reply(400, { description: 'User already exist' })

    act(() => {
      fireEvent.change(nameInput, { target: { value: 'User Test' } })
      fireEvent.change(emailInput, { target: { value: 'test@email.com' } })
      fireEvent.change(passwordInput, { target: { value: '123456789' } })
    })

    await act(async () => {
      fireEvent.click(submitButton)
    })
  })

  it('success signUp', async () => {
    const mock = new MockAdapter(api)

    window.history.pushState({}, '', '/signUp')
    const { getByTestId } = render(<Authenticate />)

    expect(getByTestId('authenticateName')).toBeTruthy()
    const nameInput = getByTestId('authenticateName')

    expect(getByTestId('authenticateEmail')).toBeTruthy()
    const emailInput = getByTestId('authenticateEmail')

    expect(getByTestId('authenticatePassword')).toBeTruthy()
    const passwordInput = getByTestId('authenticatePassword')

    expect(getByTestId('authenticateSubmitButton')).toBeTruthy()
    expect(getByTestId('authenticateSubmitButton').textContent).toEqual(
      'SIGN UP'
    )
    const submitButton = getByTestId('authenticateSubmitButton')

    mock.onPost(`${process.env.REACT_APP_API_BASE_URL}/users`).reply(200, {
      message: 'User created successfully',
    })

    act(() => {
      fireEvent.change(nameInput, { target: { value: 'User Test' } })
      fireEvent.change(emailInput, { target: { value: 'test@email.com' } })
      fireEvent.change(passwordInput, { target: { value: '123456789' } })
    })

    await act(async () => {
      fireEvent.click(submitButton)
    })
  })
})
