import { Namespace } from 'socket.io';
import { logger } from './config';
import getPM2 from './pm2';
import { io } from './app';

const INTERVAL = 1000;
const delay = () => new Promise((resolve) => setTimeout(resolve, INTERVAL));

const emitPM2 = () => getPM2().then((pm2) => io.emit('pm2', pm2));

const loop = () =>
  delay()
    .then(emitPM2)
    .catch((err) => {
      logger.log(err);
    })
    .finally(loop);

export default async (): Promise<void | Namespace> => emitPM2().then(loop);
