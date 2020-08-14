import { createServer } from 'http';
// import { resolve } from 'path';

import * as Koa from 'koa';
import * as serve from 'koa-static';
// import Pug from 'koa-pug';
import * as Socket from 'socket.io';

const app = new Koa();
// const pug = new Pug({ viewPath: resolve(__dirname, './views'), app });
// pug.use(app);
app.use(serve(`${__dirname}/public`));

export const server = createServer(app.callback());
export const io = new Socket(server);
