import { Namespace } from 'socket.io';

import { logger } from '../config';
import { io } from '../app';

export default class SocketController<T> {
  constructor(private getData: () => Promise<T>, private event: string) {}

  public async emit(): Promise<Namespace> {
    try {
      const data = await this.getData();
      return io.emit(this.event, data);
    } catch (err) {
      logger.log(err);
      return io.emit('error', err.toString());
    }
  }

  static create<T>(
    getData: () => Promise<T>,
    event: string
  ): SocketController<T> {
    return new this(getData, event);
  }
}
