import * as Yup from 'yup'

interface VSignUpData {
  name?: string
  email?: string
  password?: string
}

const signUpValidation = async ({ email, name, password }: VSignUpData) => {
  const schema = Yup.object().shape({
    name: Yup.string().required().min(2).trim(),
    email: Yup.string().required().email().trim(),
    password: Yup.string().required().min(8).max(16),
  })

  try {
    await schema.validate({ email, name, password }, { abortEarly: false })
  } catch (err) {
    const error = err as Yup.ValidationError

    return error.inner.map(err => err.path)
  }
}

export default signUpValidation
