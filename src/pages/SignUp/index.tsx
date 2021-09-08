import { Link } from 'react-router-dom'
import { FaCheck } from 'react-icons/fa'
import { FormEvent, useState } from 'react'

import styles from './styles.module.scss'

import Input from '../../components/Input'
import SubmitButton from '../../components/SubmitButton'

import signUpService, { SSignUpProps } from '../../services/signUp.service'

const SignUp = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [errors, setErrors] = useState<(string | undefined)[]>([])
  const [loading, setLoading] = useState(false)

  const handleError: SSignUpProps['onError'] = async err => {
    if (err.response.status === 400) {
      setErrors(err.response.data.keys || [])
    }
  }

  const handleSignUp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)

    const response = await signUpService({
      data: { email, name, password },
      onError: handleError,
      onDataError: setErrors,
    })

    if (response) {
      alert(response.message)

      setName('')
      setEmail('')
      setPassword('')
    }

    setLoading(false)
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSignUp}>
        <h1 className={styles.title}>
          <FaCheck /> ToDo
        </h1>

        <Input
          value={name}
          error={errors.includes('name')}
          disabled={loading}
          placeholder="Name"
          containerClass={styles.input}
          onChange={event => setName(event.target.value)}
        />

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
          placeholder="Password"
          onChange={event => setPassword(event.target.value)}
        />

        <SubmitButton loading={loading} disabled={loading}>
          SIGN UP
        </SubmitButton>

        <span className={styles.or}>OU</span>

        <Link to="/" className={styles.loginButton}>
          SIGN IN
        </Link>
      </form>
    </div>
  )
}

export default SignUp
