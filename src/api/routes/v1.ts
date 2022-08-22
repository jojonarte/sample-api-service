import { Context, DefaultState } from 'koa';
import Router from 'koa-router';
import * as controllers from 'src/api/controllers';

const mainRouter = new Router<DefaultState, Context>({ prefix: '/api/v1' });

mainRouter.post('/sessions/init', controllers.sessionsController.create)

mainRouter.post('/users', controllers.usersController.create)

mainRouter.get('/apps', controllers.appsController.getApps);
mainRouter.post('/apps', controllers.appsController.insertApp);
mainRouter.patch('/apps', controllers.appsController.updateApp)
mainRouter.delete('/apps/:appId', controllers.appsController.removeApp);



export default mainRouter.routes();