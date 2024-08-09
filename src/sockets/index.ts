import { config, logger } from "../config";
import type { SocketController } from "./SocketController";
import { pm2 } from "./pm2";
import { system } from "./system";

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
  private sockets: SocketController<unknown>[];
  private interval: number;

  constructor(
    sockets: SocketController<unknown>[],
    interval = config.pollInterval,
  ) {
    this.sockets = sockets;
    this.interval = interval;
  }

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
        await this.emit();
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
    // biome-ignore lint/complexity/noThisInStatic: exception
    const loop = new this(sockets, interval);
    loop.start();
    return loop;
  }
}

export const startSockets = () => Loop.create([pm2(), system()]);
