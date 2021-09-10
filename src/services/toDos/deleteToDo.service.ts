import api from '../api'

import refreshTokenService from '../refreshToken.service'

type HProps = { token: string; refreshToken: string }

async function deleteToDoService(id: string, { token, refreshToken }: HProps) {
  const newToken = await refreshTokenService({ data: { token, refreshToken } })

  if (newToken) token = newToken.token

  await api.delete(`/toDos/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
}

export default deleteToDoService
