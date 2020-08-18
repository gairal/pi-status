import { logger, config } from '../config';
import { io } from '../app';
import pm2 from './pm2';
import system from './system';
import SocketController from './SocketController';

const getClients = (): Promise<string[]> =>
  new Promise((resolve) => {
    io.clients((err: Error, clients: string[]) => {
      if (err) {
        logger.error(err.toString());
        return;
      }

      resolve(clients);
    });
  });

class Loop {
  private isRunning = false;

  constructor(
    private sockets: SocketController<unknown>[],
    private interval = config.pollInterval
  ) {}

  private delay(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, this.interval));
  }

  private emit() {
    return Promise.all(this.sockets.map((s) => s.emit()));
  }

  public static async hasClient(): Promise<boolean> {
    return getClients().then((clients) => !!clients.length);
  }

  private async loop(): Promise<void> {
    while (this.isRunning) {
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

  /**
   * sets the running flag to true
   * resets the loop counter
   * starts the update loop
   */
  public start(): void {
    logger.debug('start');
    this.isRunning = true;
    this.loop();
  }

  /**
   * stops the update loop
   */
  public async stop(): Promise<void> {
    logger.debug('stop');
    this.isRunning = false;
    // ensures we don't start until we actually got out of the loop
    await this.delay();
  }

  static create(sockets: SocketController<unknown>[], interval?: number): Loop {
    const loop = new this(sockets, interval);
    loop.start();
    return loop;
  }
}

export default (): Loop => Loop.create([pm2(), system()]);
