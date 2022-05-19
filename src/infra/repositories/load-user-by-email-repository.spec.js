class LoadUserByEmailRepository {
  async load (email) {
    return null
  }
}

describe('LoadUserByEmailRepository', () => {
  test('Should return null when user not found', async () => {
    const sut = new LoadUserByEmailRepository()
    const user = await sut.load('invalid_email@mail.com')
    expect(user).toBeNull()
  })
})
