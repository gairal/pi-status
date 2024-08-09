import { io } from "../app";
import { logger } from "../config";

export class SocketController<T> {
  constructor(
    private getData: () => Promise<T>,
    private event: string,
  ) {}

  public async emit() {
    try {
      const data = await this.getData();
      return io.emit(this.event, data);
    } catch (err) {
      logger.error(err);
      return io.emit("error", err?.toString());
    }
  }

  static create<T>(getData: () => Promise<T>, event: string) {
    // biome-ignore lint/complexity/noThisInStatic: exception
    return new this(getData, event);
  }
}
