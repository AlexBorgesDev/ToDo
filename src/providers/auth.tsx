import { ReactNode, useEffect, useState } from 'react'
import { decode } from 'jsonwebtoken'

import { AuthContext, SignInProps, User } from '../contexts/auth'
import { api } from '../services/api'

type SignInResponse = {
  token: string
  user: User
}

type TokenType = {
  exp: number
  iat: number
  sub: string
  user: User
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  function signOut() {
    setUser(null)
    localStorage.removeItem('@toDo:token')
  }

  async function signIn(data: SignInProps) {
    const response = await api.post<SignInResponse>('session/signIn', data)
    setUser(response.data.user)

    api.defaults.headers.common.authorization = `Bearer ${response.data.token}`
    localStorage.setItem('@toDo:token', response.data.token)
  }

  useEffect(() => {
    const token = localStorage.getItem('@toDo:token')

    if (token) {
      const { exp, user } = decode(token) as TokenType
      setUser(user)

      if (Date.now().valueOf() <= exp * 1000) {
        api.defaults.headers.common.authorization = `Bearer ${token}`

        api
          .post<{ token: string }>('session/token/refresh')
          .then(({ data }) => {
            localStorage.setItem('@toDo:token', data.token)
            api.defaults.headers.common.authorization = `Bearer ${data.token}`
          })

        api.get<User>('users').then(({ data }) => setUser(data))
      } else signOut()
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}
