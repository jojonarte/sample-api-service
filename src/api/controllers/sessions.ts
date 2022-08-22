import { Context } from "koa";
import compose from "koa-compose";
import { createSession } from "src/operations/v1/sessions/create";
import { validate } from "../middlewares/controller-validation";
import * as schema from '../validations/schema/sessions'

export const create = compose([
  validate({ body: schema.create }),
  async (ctx: Context) => {
    const { username, password } = ctx.request.body

    const operationResult = await createSession.execute({
      username,
      password
    })

    ctx.created({
      user: operationResult.user,
      accessToken: operationResult.accessToken.token,
    })
  }
])
