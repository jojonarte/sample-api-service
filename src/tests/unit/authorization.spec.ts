import { authorization } from "src/api/middlewares/authorization"
import { UnauthorizedError } from "src/utils/errors"
import { createUserWithTokens } from "../data/users"

const middlewareMock = jest.fn()

describe('Authorization', () => {
  let ctx: any

  beforeEach(async () => {
      ctx = { request: {}, response: {}, headers: {} }
  })

  it('sets user object to null if no authorization is provided in headers', async () => {
    await authorization(ctx, middlewareMock)

    expect(ctx.request.user).toBeNull()
  })

  it('throws an error when authorization header is not valid JWT token', async () => {
    ctx.headers = { authorization: 'Foobar' }

    await expect(authorization(ctx, middlewareMock)).rejects.toThrow(UnauthorizedError)
  })

  it('sets correct user object based on id from JWT token', async () => {
    const { user, accessToken } = await createUserWithTokens()
    ctx.headers = { authorization: accessToken }

    expect(ctx.request.user.id).toEqual(user.id)
  })
})