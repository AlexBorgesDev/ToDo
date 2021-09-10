import jwt from 'jsonwebtoken'

import api from './api'

interface SRefreshTokenProps {
  data: { token: string; refreshToken: string }
  onError?: (error: { response: { data: any; status: number } }) => void
}

export interface SRefreshTokenResponse {
  token: string
  refreshToken?: {
    id: string
    expiresIn: number
  }
}

async function refreshTokenService({ data, ...props }: SRefreshTokenProps) {
  const tokenContent = jwt.decode(data.token) as jwt.JwtPayload | null

  if (!tokenContent || !tokenContent.exp) return

  if (tokenContent.exp * 1000 > Date.now()) return

  try {
    const response = await api.post('/sessions/refreshToken', {
      refreshToken: data.refreshToken,
    })

    localStorage.setItem('@session_token', response.data.token)

    if (response.data.refreshToken) {
      localStorage.setItem(
        '@session_refresh_token',
        response.data.refreshToken.id
      )

      localStorage.setItem(
        '@session_refresh_token_expiresIn',
        String(response.data.refreshToken.expiresIn)
      )
    }

    return response.data as SRefreshTokenResponse
  } catch (err: any) {
    props.onError && props.onError(err)
  }
}

export default refreshTokenService
