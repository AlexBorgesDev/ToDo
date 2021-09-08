import { FaCheck } from 'react-icons/fa'
import { Link, useHistory } from 'react-router-dom'
import { FormEvent, useState } from 'react'

import styles from './styles.module.scss'

import Input from '../../components/Input'
import SubmitButton from '../../components/SubmitButton'

import signInService, { SSignInProps } from '../../services/signIn.service'

const SignIn = () => {
  const history = useHistory()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [errors, setErrors] = useState<(string | undefined)[]>([])
  const [loading, setLoading] = useState(false)

  const handleError: SSignInProps['onError'] = err => {
    if (err.response.status === 401) {
      setErrors(['email', 'password'])
    }
  }

  const handleSignIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)

    const response = await signInService({
      data: { email, password },
      onError: handleError,
      onDataError: setErrors,
    })

    if (response) {
      localStorage.setItem('@session_token', response.token)
      localStorage.setItem('@session_refresh_token', response.refreshToken.id)
      localStorage.setItem(
        '@session_refresh_token_expiresIn',
        String(response.refreshToken.expiresIn)
      )

      setLoading(false)
      return history.push('/browser')
    }

    setLoading(false)
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSignIn}>
        <h1 className={styles.title}>
          <FaCheck /> ToDo
        </h1>

        <Input
          value={email}
          error={errors.includes('email')}
          disabled={loading}
          placeholder="Email"
          containerClass={styles.input}
          onChange={event => setEmail(event.target.value)}
        />

        <Input
          type="password"
          value={password}
          error={errors.includes('password')}
          disabled={loading}
          maxLength={16}
          placeholder="Password"
          onChange={event => setPassword(event.target.value)}
        />

        <SubmitButton loading={loading} disabled={loading}>
          SIGN IN
        </SubmitButton>

        <span className={styles.or}>OU</span>

        <Link to="/signup" className={styles.registerButton}>
          SIGN UP
        </Link>
      </form>
    </div>
  )
}

export default SignIn
