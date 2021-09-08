import api from './api'

import signInValidation from '../validations/singIn.validation'

export interface SSignInProps {
  data: { email?: string; password?: string }
  onError?: (error: { response: { data: any; status: number } }) => void
  onDataError?: (errors: (string | undefined)[]) => void
}

export interface SResponseSignInData {
  token: string
  refreshToken: {
    id: string
    expiresIn: number
  }
}

async function signInService({ data, ...props }: SSignInProps) {
  const errors = await signInValidation({
    email: data.email,
    password: data.password,
  })

  if (errors) {
    props.onDataError && props.onDataError(errors)

    return undefined
  } else props.onDataError && props.onDataError([])

  try {
    const response = await api.post('/sessions', {
      email: data.email,
      password: data.password,
    })

    return response.data as SResponseSignInData
  } catch (err: any) {
    props.onError && props.onError(err)
  }
}

export default signInService
