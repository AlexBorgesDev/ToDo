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

    return response.data as SRefreshTokenResponse
  } catch (err: any) {
    props.onError && props.onError(err)
  }
}

export default refreshTokenService
