import { logger, config } from '../config';
import { io } from '../app';
import pm2 from './pm2';
import system from './system';
import SocketController from './SocketController';

const MAX_ITERATIONS = 1000;
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
  private count = MAX_ITERATIONS;

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

  private static async hasClient(): Promise<boolean> {
    return getClients().then((clients) => !!clients.length);
  }

  private async loop(): Promise<void> {
    while (this.isRunning && this.count > 0) {
      logger.debug(`loop: ${this.count}`);

      // avoid infinite loop
      this.count -= 1;

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

  private async onDisconnect() {
    logger.debug('disconnect');

    if (!(await Loop.hasClient())) {
      this.stop();
    }
  }

  /**
   * Rest the loop counter
   */
  private reset(): void {
    logger.debug('reset');
    this.count = MAX_ITERATIONS;
  }

  /**
   * sets the running flag to true
   * resets the loop counter
   * starts the update loop
   */
  private start(): void {
    logger.debug('start');
    this.isRunning = true;
    this.reset();
    this.loop();
  }

  /**
   * stops the update loop
   */
  private async stop(): Promise<void> {
    logger.debug('stop');
    this.isRunning = false;
    // ensures we don't start until we actually got out of the loop
    await this.delay();
  }

  private async restart(): Promise<void> {
    logger.debug('restart');
    await this.stop();
    this.start();
  }

  private init() {
    io.on('connection', async (socket) => {
      if (this.isRunning) {
        // for each new Connection we're simply resetting the loops
        this.reset();
      } else {
        //  if the loop was stopped then we restart it
        await this.restart();
      }

      socket.on('disconnect', this.onDisconnect.bind(this));
    });
  }

  static create(sockets: SocketController<unknown>[], interval?: number): Loop {
    const loop = new this(sockets, interval);
    loop.init();
    return loop;
  }
}

export default (): Loop => Loop.create([pm2(), system()]);
