import { createServer } from "node:http";

import Koa from "koa";
import serve from "koa-static";
import { Server } from "socket.io";

export const app = new Koa();
app.use(serve(`${__dirname}/public`));

export const server = createServer(app.callback());
export const io = new Server(server);
