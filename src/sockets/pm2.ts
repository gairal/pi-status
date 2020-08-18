import { list, PM2Data } from '../lib/pm2';
import SocketController from './SocketController';

export default (): SocketController<PM2Data[]> =>
  SocketController.create<PM2Data[]>(list, 'pm2');
