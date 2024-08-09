import { createServer } from "node:http";

// biome-ignore lint/style/noNamespaceImport: exception
import * as Koa from "koa";
// biome-ignore lint/style/noNamespaceImport: exception
import * as serve from "koa-static";
import { Server } from "socket.io";

export const app = new Koa();
app.use(serve(`${__dirname}/public`));

export const server = createServer(app.callback());
export const io = new Server(server);
