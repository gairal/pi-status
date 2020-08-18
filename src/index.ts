import { server } from './app';

import './config';
import startSockets from './controllers/sockets';

server.listen(process.env.PORT || 8080);

startSockets();
