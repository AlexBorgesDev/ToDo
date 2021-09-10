import api from '../api'

import { ToDoData } from './getToDos.service'

import createToDoValidation from '../../validations/createToDo.validation'

import refreshTokenService from '../refreshToken.service'

interface SCreateToDoProps {
  data: { token: string; task: string; refreshToken: string }
  onError?: (error: { response: { data: any; status: number } }) => void
  onDataError?: (errors: (string | undefined)[]) => void
}

export interface SCreateToDoResponse {
  message: string
  data: ToDoData
}

async function createToDoService({ data, ...props }: SCreateToDoProps) {
  const errors = await createToDoValidation(data.task)

  if (errors) {
    props.onDataError && props.onDataError(errors)

    return undefined
  }

  const newToken = await refreshTokenService({
    data: { refreshToken: data.refreshToken, token: data.token },
  })

  if (newToken) data.token = newToken.token

  try {
    const response = await api.post(
      '/toDos',
      { task: data.task },
      { headers: { Authorization: `Bearer ${data.token}` } }
    )

    return response.data as SCreateToDoResponse
  } catch (err: any) {
    props.onError && props.onError(err)
  }
}

export default createToDoService
