import { logger, config } from "../config";
import { pm2 } from "./pm2";
import { system } from "./system";
import { SocketController } from "./SocketController";

// const getClients = () =>
//   new Promise((resolve) => {
//     io.clients((err: Error, clients: string[]) => {
//       if (err) {
//         logger.error(err.toString());
//         return;
//       }
//
//       resolve(clients);
//     });
//   });

class Loop {
  private isRunning = false;

  constructor(
    private sockets: SocketController<unknown>[],
    private interval = config.pollInterval
  ) {}

  private delay() {
    return new Promise((resolve) => {
      setTimeout(resolve, this.interval);
    });
  }

  private emit() {
    return Promise.all(this.sockets.map((s) => s.emit()));
  }

  // public static async hasClient() {
  //   return getClients().then((clients) => !!clients.length);
  // }

  private async loop() {
    while (this.isRunning) {
      try {
        // eslint-disable-next-line no-await-in-loop
        await this.emit();
        // eslint-disable-next-line no-await-in-loop
        await this.delay();
      } catch (err) {
        logger.error(err?.toString());
      }
    }
  }

  /**
   * sets the running flag to true
   * resets the loop counter
   * starts the update loop
   */
  public start() {
    logger.debug("start");
    this.isRunning = true;
    return this.loop();
  }

  /**
   * stops the update loop
   */
  public async stop() {
    logger.debug("stop");
    this.isRunning = false;
    // ensures we don't start until we actually got out of the loop
    await this.delay();
  }

  static create(sockets: SocketController<unknown>[], interval?: number) {
    const loop = new this(sockets, interval);
    loop.start();
    return loop;
  }
}

export const startSockets = () => Loop.create([pm2(), system()]);
