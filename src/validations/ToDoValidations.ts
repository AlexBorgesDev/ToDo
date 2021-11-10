import * as Yup from 'yup'

import { schemaValidate } from './schemaValidate'

class ToDoValidations {
  constructor(private readonly data: { [key: string]: unknown }) {}

  async create() {
    const schema = Yup.object().shape({
      task: Yup.string().required().min(2).max(250).trim(),
    })

    return await schemaValidate(schema, this.data)
  }
}

export { ToDoValidations }
