import * as jwt from 'jsonwebtoken'
import { config } from 'src/config';
import { Context } from 'koa';
import Bluebird from 'bluebird';
import { UnauthorizedError } from 'src/utils/errors';
import { userRepository } from 'src/database/repositories/users';

const BEARER_PREFIX = 'Bearer '

interface IAuthorizationTokenPayload {
  userId: number;
}

const verifyAccessToken = (accessToken: string): Bluebird<{}> => Bluebird.fromCallback(done => jwt.verify(accessToken, config.auth.pepper, { algorithms: ['HS256'] }, done ))

export const authorization = async (ctx: Context, middleware: () => Promise<void>): Promise<void> => {
  const authHeader = ctx.headers.authorization
  ctx.request.user = null

  if (!authHeader) {
    await middleware()
    return
  }

  let payload
  try {
    payload = await verifyAccessToken(authHeader.replace(BEARER_PREFIX, '')) as IAuthorizationTokenPayload
  } catch (err) {
    console.log('verify access token error' + err)
    throw new UnauthorizedError()
  }

  ctx.request.user = await userRepository.findById(payload.userId)  
  await middleware()
}