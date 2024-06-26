import { Server } from 'http';
import Koa from 'koa';
import koaBody from 'koa-body'
import kcors from 'kcors'
import koaRespond = require('koa-respond');
import { Model } from 'objection';
import { config } from 'src/config';
import { initializeDb } from 'src/database/init';
import { handleErrors } from './middlewares/error-handling';
import v1Routes from './routes/v1';
import { logger } from 'src/utils/logger';
import { authorization } from './middlewares/authorization';

export default class Application {
  public app: Koa;

  private server: Server | null;

  public constructor() {
    this.app = new Koa();
    this.setup();
  }

  public static fatal(err: Error): void {
    // Remove termination listener
    process.removeAllListeners('uncaughtException')

    logger.fatal({ err }, 'Fatal error occurred. Exiting the app.')
  }

  public start(): Promise<void> {
    process.once('uncaughtException', Application.fatal)
    process.once('unhandledRejection', (reason, promise) => {
      process.removeAllListeners('unhandledRejection')
      logger.fatal('Unhandled Rejection at:', promise, 'reason:', reason)
    })

    // Handle expected termination
    process.once('SIGINT', () => this.stop())
    process.once('SIGTERM', () => this.stop())

    initializeDb()

    return new Promise(resolve => {
      this.server = this.app.listen(config.server.port, () => logger.info(`==> 🌎  Server listening on port ${config.server.port}.`))

      return resolve();
    })
  }

  public async stop(): Promise<void> {
    if (!this.server) {
      logger.warn('Server not initialized yet.')
      return
    }

    // Remove termination listener
    process.removeAllListeners('SIGINT')
    process.removeAllListeners('SIGTERM')

    logger.info('Closing database connection ...')
    try {
      await Model.knex().destroy()
    } catch {
      logger.info('Failed to close database connection.')
    }

    logger.info('Stopping server ...')
    this.server.close(() => {
      logger.info('Server stopped.')
    })
  }

  private setup(): void {
    this.app.use(handleErrors)
    this.app.use(koaRespond())
    this.app.use(koaBody())
    this.app.use(kcors({ origin: '*' }))

    this.app.use(authorization)
    this.app.use(v1Routes)

    this.app.on('error', err => logger.error({ err }, 'Unhandled application error.'));
  }
}

