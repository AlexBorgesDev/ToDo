import api from '../api'

import refreshTokenService from '../refreshToken.service'

interface Props {
  id: string
  completed?: boolean
  token: string
  refreshToken: string
}

async function updateToDoService({ id, completed, token, ...props }: Props) {
  const newToken = await refreshTokenService({
    data: { refreshToken: props.refreshToken, token },
  })

  if (newToken) token = newToken.token

  await api.put(
    '/toDos',
    { id, completed },
    { headers: { Authorization: `Bearer ${token}` } }
  )
}

export default updateToDoService
