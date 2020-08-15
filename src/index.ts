import { server } from './app';

import './config';
import startPM2 from './controllers/pm2';
import startSystem from './controllers/system';

server.listen(process.env.PORT || 8080);

startPM2();
startSystem();
