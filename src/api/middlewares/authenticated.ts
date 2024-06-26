import { Context } from "koa";
import { UnauthorizedError } from "src/utils/errors";

export const authenticated = async (ctx: Context, middleware: () => Promise<void>): Promise<void> => {
  if (!ctx.request.user) {
    throw new UnauthorizedError()
  }

  await middleware()
}