import { Context } from 'koa';
import compose from 'koa-compose';
import { validate } from 'src/api/middlewares/controller-validation';
import * as schema from 'src/api/validations/schema/apps'
import { App } from 'src/database/models/app';
import { createApp } from 'src/operations/v1/apps/create';
import { deleteApp } from 'src/operations/v1/apps/delete';
import { listApps } from 'src/operations/v1/apps/get-list';
import { patchApp } from 'src/operations/v1/apps/patch';
import { InternalServerError } from 'src/utils/errors';
import { authenticated } from '../middlewares/authenticated';


export const getApps = compose([
  authenticated,
  async (ctx: Context) => {
    ctx.ok(await listApps.execute({}))
  }]
)

export const insertApp = compose([
  authenticated,
  validate({ body: schema.create }),
  async (ctx: Context) => {
    return ctx.created(await createApp.execute(ctx.request.body as Partial<App>))
  }
])

export const removeApp = compose([
  authenticated,
  validate({ params: schema.deleteApp }),
  async (ctx: Context) => {
    const appId = Number(ctx.params.appId);

    try {
      return ctx.noContent(await deleteApp.execute({ appId }))
    } catch (error) {
      throw new InternalServerError();
    }
  }
])

export const updateApp = compose([
  validate({ body: schema.patch }),
  async (ctx: Context) => {
    return ctx.ok(await patchApp.execute(ctx.request.body))
  }
])