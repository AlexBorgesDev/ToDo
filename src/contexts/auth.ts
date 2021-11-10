import { createContext } from 'react'

export type User = {
  name: string
  email: string
}

export type SignInProps = {
  email: string
  password: string
}

type AuthContextData = {
  user: User | null
  signIn: (data: SignInProps) => Promise<void> | void
  signOut: () => void
}

export const AuthContext = createContext({} as AuthContextData)
