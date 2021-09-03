import { Link } from 'react-router-dom'
import { FaCheck } from 'react-icons/fa'
import { FormEvent, useState } from 'react'

import styles from './styles.module.scss'

import Input from '../../components/Input'
import SubmitButton from '../../components/SubmitButton'

import signInValidation from '../../validations/singIn.validation'

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [errors, setErrors] = useState<(string | undefined)[]>([])
  const [loading, setLoading] = useState(false)

  const handleSignIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (loading) return
    setLoading(true)

    const errors = await signInValidation({ email, password })

    if (errors) {
      setErrors(errors)
      return setLoading(false)
    } else setErrors([])

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

        <SubmitButton loading={loading}>SIGN IN</SubmitButton>

        <span className={styles.or}>OU</span>

        <Link to="/signup" className={styles.registerButton}>
          SIGN UP
        </Link>
      </form>
    </div>
  )
}

export default SignIn
