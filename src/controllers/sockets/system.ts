import getSystem, { System } from '../../lib/system';
import SocketController from './SocketController';

export default (): SocketController<System | null> =>
  SocketController.create<System | null>(getSystem, 'system');
