import { ChangeEvent, FormEvent, useEffect, useState } from 'react'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import axios, { AxiosError } from 'axios'

import { SignInput } from '../../components/SignInput'

import { api } from '../../services/api'
import { useAuth } from '../../hooks/useAuth'
import { AuthenticateValidations } from '../../validations/AuthenticateValidations'

import { theme } from '../../styles/theme'
import {
  Container,
  Form,
  InfoMessage,
  Logo,
  OutlineButton,
  Separator,
  SubmitButton,
} from './styles'

type OnInputChange = (
  event: ChangeEvent<HTMLInputElement>,
  type: 'name' | 'email' | 'password'
) => void

export function Authenticate() {
  const { signIn } = useAuth()

  const [formType, setFormType] = useState<'signIn' | 'signUp'>('signIn')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [loading, setLoading] = useState(false)
  const [inputErrors, setInputErrors] = useState<(string | undefined)[]>([])

  const [infoMessage, setInfoMessage] = useState({
    success: false,
    message: '',
  })

  const onInputChange: OnInputChange = ({ target }, type) => {
    setInputErrors(oldState => oldState.filter(value => value !== type))

    if (type === 'email') setEmail(target.value)
    else if (type === 'name') setName(target.value)
    else if (type === 'password') setPassword(target.value)
  }

  function toggleFormType() {
    const [baseUrl] = window.location.href.split('/')

    if (formType === 'signIn') {
      window.history.pushState({}, '', baseUrl + '/signUp')
    } else window.history.pushState({}, '', baseUrl + '/signIn')

    setFormType(formType === 'signIn' ? 'signUp' : 'signIn')
  }

  function handleAxiosErrorMessage(error: AxiosError) {
    setInfoMessage({
      success: false,
      message:
        error.response?.data.description ||
        'Something went wrong processing your request, check the data and try again.',
    })
  }

  async function handleSignIn() {
    const dataErrors = await new AuthenticateValidations({
      email,
      password,
    }).signIn()

    if (dataErrors.length > 0) return setInputErrors(dataErrors)

    try {
      await signIn({ email, password })
    } catch (err: unknown | Error | AxiosError) {
      if (axios.isAxiosError(err)) {
        handleAxiosErrorMessage(err)
        setLoading(false)
      }
    }
  }

  async function handleSignUp() {
    const dataErrors = await new AuthenticateValidations({
      name,
      email,
      password,
    }).signUp()

    if (dataErrors.length > 0) return setInputErrors(dataErrors)

    try {
      const response = await api.post('users', { name, email, password })

      setName('')
      setPassword('')
      toggleFormType()
      setInfoMessage({ success: true, message: response.data.message })

      setLoading(false)
    } catch (err: unknown | Error | AxiosError) {
      if (axios.isAxiosError(err)) {
        handleAxiosErrorMessage(err)
        setLoading(false)
      }
    }
  }

  async function handleSubmitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)

    if (formType === 'signIn') await handleSignIn()
    else if (formType === 'signUp') await handleSignUp()
  }

  useEffect(() => {
    if (location.pathname === '/signUp') setFormType('signUp')
    else if (location.pathname === '/signIn') setFormType('signIn')
  }, [])

  return (
    <Container>
      <Form onSubmit={handleSubmitForm}>
        <Logo />

        {infoMessage.message.length > 0 && (
          <InfoMessage success={infoMessage.success}>
            {infoMessage.message}
          </InfoMessage>
        )}

        {formType === 'signUp' && (
          <SignInput
            value={name}
            label="Name"
            error={inputErrors.includes('name')}
            disabled={loading}
            data-testid="authenticateName"
            backgroundColor={theme.surfaceBackground}
            onChange={event => onInputChange(event, 'name')}
          />
        )}

        <SignInput
          value={email}
          label="Email"
          error={inputErrors.includes('email')}
          disabled={loading}
          data-testid="authenticateEmail"
          backgroundColor={theme.surfaceBackground}
          onChange={event => onInputChange(event, 'email')}
        />

        <SignInput
          type="password"
          value={password}
          label="Password"
          error={inputErrors.includes('password')}
          disabled={loading}
          maxLength={16}
          data-testid="authenticatePassword"
          backgroundColor={theme.surfaceBackground}
          onChange={event => onInputChange(event, 'password')}
        />

        <SubmitButton
          type="submit"
          loading={loading}
          data-testid="authenticateSubmitButton"
        >
          {formType === 'signIn' ? 'SIGN IN' : 'SIGN UP'}
        </SubmitButton>

        <Separator>OR</Separator>

        <OutlineButton
          type="button"
          disabled={loading}
          data-testid="authenticateToggleFormButton"
          onClick={toggleFormType}
        >
          {formType !== 'signIn' ? 'SIGN IN' : 'SIGN UP'}
        </OutlineButton>
      </Form>
    </Container>
  )
}
