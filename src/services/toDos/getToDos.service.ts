import api from '../api'

import refreshTokenService from '../refreshToken.service'

interface SGetToDosProps {
  token: string
  refreshToken: string
  onError?: (error: { response: { data: any; status: number } }) => void
}

export interface ToDoData {
  id: string
  task: string
  completed: boolean
  createdAt: number
  updatedAt?: number
}

async function getToDosService({ token, ...props }: SGetToDosProps) {
  const newToken = await refreshTokenService({
    data: { token, refreshToken: props.refreshToken },
  })

  if (newToken) {
    token = newToken.token

    localStorage.setItem('@session_token', newToken.token)

    if (newToken.refreshToken) {
      localStorage.setItem('@session_refresh_token', newToken.refreshToken.id)
      localStorage.setItem(
        '@session_refresh_token_expiresIn',
        String(newToken.refreshToken.expiresIn)
      )
    }
  }

  try {
    const { data } = await api.get('/toDos', {
      headers: { Authorization: `Bearer ${token}` },
    })

    return data as ToDoData[]
  } catch (err: any) {
    props.onError && props.onError(err)
  }
}

export default getToDosService
