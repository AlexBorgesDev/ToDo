import { useState } from 'react'
import { FaCheck } from 'react-icons/fa'

import styles from './styles.module.scss'

import Input from '../../components/Input'
import SubmitButton from '../../components/SubmitButton'
import { Link } from 'react-router-dom'

const SignUp = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <h1 className={styles.title}>
          <FaCheck /> ToDo
        </h1>

        <Input
          value={name}
          placeholder="Name"
          containerClass={styles.input}
          onChange={event => setName(event.target.value)}
        />

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

        <SubmitButton>SIGN UP</SubmitButton>

        <span className={styles.or}>OU</span>

        <Link to="/" className={styles.loginButton}>
          SIGN IN
        </Link>
      </form>
    </div>
  )
}

export default SignUp
