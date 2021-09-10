import * as Yup from 'yup'

const createToDoValidation = async (task?: string) => {
  const schema = Yup.object().shape({
    task: Yup.string().required().trim(),
  })

  try {
    await schema.validate({ task }, { abortEarly: false })
  } catch (err) {
    const error = err as Yup.ValidationError

    return error.inner.map(err => err.path)
  }
}

export default createToDoValidation
