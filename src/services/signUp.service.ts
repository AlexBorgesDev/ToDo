import api from './api'

import signUpValidation from '../validations/singUp.validation'

export interface SSignUpProps {
  data: { email?: string; name?: string; password?: string }
  onError?: (error: { response: { data: any; status: number } }) => void
  onDataError?: (errors: (string | undefined)[]) => void
}

async function signUpService({ data, ...props }: SSignUpProps) {
  const errors = await signUpValidation({
    email: data.email,
    name: data.name,
    password: data.password,
  })

  if (errors) {
    props.onDataError && props.onDataError(errors)

    return undefined
  } else props.onDataError && props.onDataError([])

  try {
    const response = await api.post('/users', {
      email: data.email,
      name: data.name,
      password: data.password,
    })

    return response.data as { message: string }
  } catch (err: any) {
    props.onError && props.onError(err)
  }
}

export default signUpService
