import { Link } from 'react-router-dom'
import { FaCheck } from 'react-icons/fa'
import { FormEvent, useState } from 'react'

import styles from './styles.module.scss'

import Input from '../../components/Input'
import SubmitButton from '../../components/SubmitButton'

import singUpValidation from '../../validations/singUp.validation'

const SignUp = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [errors, setErrors] = useState<(string | undefined)[]>([])
  const [loading, setLoading] = useState(false)

  const handleSignUp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)

    const errors = await singUpValidation({ email, name, password })

    if (errors) {
      setErrors(errors)
      return setLoading(false)
    } else setErrors([])

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
