import * as Yup from 'yup'

import { schemaValidate } from './schemaValidate'

class AuthenticateValidations {
  constructor(private readonly data: { [key: string]: unknown }) {}

  async signIn() {
    const schema = Yup.object().shape({
      email: Yup.string().required().email().trim(),
      password: Yup.string().required().min(8).max(16).trim(),
    })

    return await schemaValidate(schema, this.data)
  }

  async signUp() {
    const schema = Yup.object().shape({
      name: Yup.string().required().min(2).trim(),
      email: Yup.string().required().email().trim(),
      password: Yup.string().required().min(8).max(16).trim(),
    })

    return await schemaValidate(schema, this.data)
  }
}

export { AuthenticateValidations }
