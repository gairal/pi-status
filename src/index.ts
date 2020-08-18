import { app, server } from './app';

import './config';
import startSockets from './sockets';
import router from './controllers';

app.use(router.routes());
startSockets();

server.listen(process.env.PORT || 8080);
