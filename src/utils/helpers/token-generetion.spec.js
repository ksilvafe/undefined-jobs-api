const TokenGenerator = require('./token-generation')
const jwt = require('jsonwebtoken')
const MissingParamError = require('../../utils/errors/missing-param-error')

const makeSut = () => {
  return new TokenGenerator('secret')
}

describe('TokenGeneretor', () => {
  test('Should return null if JWT returns null', async () => {
    const sut = makeSut()
    jwt.token = null
    const token = await sut.generate('any_id')
    expect(token).toBeNull()
  })

  test('Should return token if JWT returns token', async () => {
    const sut = makeSut()
    const token = await sut.generate('any_id')
    expect(token).toBe(jwt.token)
  })

  test('Should call JWT with correct values', async () => {
    const sut = makeSut()
    await sut.generate('any_id')
    expect(jwt.id).toBe('any_id')
    expect(jwt.secret).toBe(sut.secret)
  })

  test('Should thorow if no secret is provided', async () => {
    const sut = new TokenGenerator()
    const promise = sut.generate('any_id')
    expect(promise).rejects.toThrow(new MissingParamError('secret'))
  })

  test('Should thorow if no id is provided', async () => {
    const sut = makeSut()
    const promise = sut.generate()
    expect(promise).rejects.toThrow(new MissingParamError('id'))
  })
})
