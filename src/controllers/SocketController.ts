import { Namespace } from 'socket.io';

import { config, logger } from '../config';
import { io } from '../app';

export default class SocketController<T> {
  constructor(
    private getData: () => Promise<T>,
    private event: string,
    private interval = config.pollInterval
  ) {}

  private delay(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, this.interval));
  }

  private async emit(): Promise<Namespace> {
    try {
      const data = await this.getData();
      return io.emit(this.event, data);
    } catch (err) {
      logger.log(err);
      return io.emit('error', err.toString());
    }
  }

  private async loop(): Promise<void> {
    try {
      await this.emit();
      await this.delay();
    } catch (err) {
      logger.error(err.toString());
    }

    return this.loop();
  }

  static create<T>(
    getData: () => Promise<T>,
    event: string,
    interval?: number
  ): SocketController<T> {
    const controller = new this(getData, event, interval);
    controller.loop();
    return controller;
  }
}
