import { Link } from 'react-router-dom'
import { FaCheck } from 'react-icons/fa'
import { useState } from 'react'

import styles from './styles.module.scss'

import Input from '../../components/Input'
import SubmitButton from '../../components/SubmitButton'

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <h1 className={styles.title}>
          <FaCheck /> ToDo
        </h1>

        <Input
          value={email}
          placeholder="Email"
          containerClass={styles.input}
          onChange={event => setEmail(event.target.value)}
        />

        <Input
          type="password"
          value={password}
          placeholder="Password"
          onChange={event => setPassword(event.target.value)}
        />

        <SubmitButton>SIGN IN</SubmitButton>

        <span className={styles.or}>OU</span>

        <Link to="/signup" className={styles.registerButton}>
          SIGN UP
        </Link>
      </form>
    </div>
  )
}

export default SignIn
