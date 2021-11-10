import { ToDoValidations } from '../../validations/ToDoValidations'

describe('should return array with wrong data', () => {
  it('create', async () => {
    await expect(
      new ToDoValidations({ task: 'i' }).create()
    ).resolves.toMatchObject(['task'])
  })
})

describe('should return an empty array if there are no errors', () => {
  it('create', async () => {
    await expect(
      new ToDoValidations({ task: 'Test the application' }).create()
    ).resolves.toMatchObject([])
  })
})
