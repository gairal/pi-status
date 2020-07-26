import { resolve } from 'path';

import * as Koa from 'koa';
import Pug from 'koa-pug';

import './config';
import controller from './controller';

const init = () => {
  const app = new Koa();
  const pug = new Pug({ viewPath: resolve(__dirname, './views'), app });

  pug.use(app);
  app.use(controller);

  app.listen(process.env.PORT || 8080);
};

init();
