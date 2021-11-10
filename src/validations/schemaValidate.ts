import { AnyObjectSchema, ValidationError } from 'yup'

export async function schemaValidate(schema: AnyObjectSchema, data: unknown) {
  try {
    await schema.validate(data, { abortEarly: false })
    return []
  } catch (err) {
    const error = err as ValidationError

    const errors: string[] = []
    error.inner.forEach(({ path }) => path && errors.push(path))

    return errors
  }
}
