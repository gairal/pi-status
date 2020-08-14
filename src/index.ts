// import { createServer } from 'http';
// import { resolve } from 'path';

// import * as Koa from 'koa';
// import * as serve from 'koa-static';
// import Pug from 'koa-pug';
// import * as Socket from 'socket.io';

import { server } from './app';

import './config';
import start from './controller';

const init = () => {
  server.listen(process.env.PORT || 8080);
  start();
};

init();
