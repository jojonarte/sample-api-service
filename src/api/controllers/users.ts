import { Context } from "koa";
import compose from "koa-compose";
import { createUser } from "src/operations/v1/users/create";
import { validate } from "../middlewares/controller-validation";
import * as schema from '../validations/schema/users'

export const create = compose([
  validate({ body: schema.create }),
  async (ctx: Context) => {
    const operationResult = await createUser.execute(ctx.request.body)
    ctx.created({
      user: operationResult.user,
      accessToken: operationResult.accessToken.token,
    })
  }
])