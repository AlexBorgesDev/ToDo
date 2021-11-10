import { useContext } from 'react'

import { AuthContext } from '../contexts/auth'

export function useAuth() {
  const datas = useContext(AuthContext)

  return datas
}
