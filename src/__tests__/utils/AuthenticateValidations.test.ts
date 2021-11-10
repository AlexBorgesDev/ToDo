import { AuthenticateValidations } from '../../validations/AuthenticateValidations'

describe('should return array with wrong data', () => {
  it('signIn', async () => {
    await expect(
      new AuthenticateValidations({
        email: 'invalid',
        password: '123456',
      }).signIn()
    ).resolves.toMatchObject(['email', 'password'])
  })

  it('signUp', async () => {
    await expect(
      new AuthenticateValidations({
        name: 'a',
        email: 'invalid',
        password: '123456',
      }).signUp()
    ).resolves.toMatchObject(['name', 'email', 'password'])
  })
})

describe('should return an empty array if there are no errors', () => {
  it('signIn', async () => {
    await expect(
      new AuthenticateValidations({
        email: 'email@email.com',
        password: '123456789',
      }).signIn()
    ).resolves.toMatchObject([])
  })

  it('signUp', async () => {
    await expect(
      new AuthenticateValidations({
        name: 'User Test',
        email: 'email@email.com',
        password: '123456789',
      }).signUp()
    ).resolves.toMatchObject([])
  })
})
