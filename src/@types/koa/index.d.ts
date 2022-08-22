import { BaseContext } from 'koa'

declare module 'koa' {
  import { User } from 'src/database/models/user'

  export interface Request {
    user: User | null
  }

  interface Context extends BaseContext {
    valid: { body?: any, query?: any, params?: any }
    ok(payload: any): any
    created(payload: any): any
    noContent(payload: any): any
    badRequest(payload: any): any
    unauthorized(payload: any): any
    forbidden(payload: any): any
    notFound(payload: any): any
    internalServerError(payload: any): any
  }
}