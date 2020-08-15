import { createServer } from 'http';

import * as Koa from 'koa';
import * as serve from 'koa-static';
import * as Socket from 'socket.io';

const app = new Koa();
app.use(serve(`${__dirname}/public`));

export const server = createServer(app.callback());
export const io = new Socket(server);
