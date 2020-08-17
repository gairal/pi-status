import { Namespace } from 'socket.io';

import { config, logger } from '../config';
import { io } from '../app';

export default class SocketController<T> {
  private run = true;

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
    while (this.run) {
      try {
        // eslint-disable-next-line no-await-in-loop
        await this.emit();
        // eslint-disable-next-line no-await-in-loop
        await this.delay();
      } catch (err) {
        logger.error(err.toString());
      }
    }
  }

  public start(): void {
    this.run = true;
    this.loop();
  }

  public stop(): void {
    this.run = false;
  }

  static create<T>(
    getData: () => Promise<T>,
    event: string,
    interval?: number
  ): SocketController<T> {
    const controller = new this(getData, event, interval);
    controller.start();
    return controller;
  }
}
