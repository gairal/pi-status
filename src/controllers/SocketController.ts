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

  private emit(): Promise<Namespace> {
    return this.getData()
      .then((data) => io.emit(this.event, data))
      .catch((err) => {
        logger.log(err);
        return io.emit('error', err);
      });
  }

  private loop(): Promise<void> {
    return this.emit()
      .then(this.delay.bind(this))
      .catch((err) => {
        logger.error(err.toString());
      })
      .finally(this.loop.bind(this));
  }

  init(): Promise<void> {
    return this.loop();
  }

  static create<T>(
    getData: () => Promise<T>,
    event: string,
    interval?: number
  ): SocketController<T> {
    const controller = new this(getData, event, interval);
    controller.init();
    return controller;
  }
}
