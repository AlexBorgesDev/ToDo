import * as Yup from 'yup'

interface VSignValidationData {
  email?: string
  password?: string
}

const signInValidation = async ({ email, password }: VSignValidationData) => {
  const schema = Yup.object().shape({
    email: Yup.string().required().email().trim(),
    password: Yup.string().required().min(8).max(16).trim(),
  })

  try {
    await schema.validate({ email, password }, { abortEarly: false })
  } catch (err) {
    const error = err as Yup.ValidationError

    return error.inner.map(err => err.path)
  }
}

export default signInValidation
