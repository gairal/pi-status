import { currentLoad, mem } from "systeminformation";

import { logger } from "../config";
import { round } from "./utils";

export interface System {
  cpus: { load: number }[];
  currentLoad: number;
  memory: {
    free: string;
    total: string;
    used: string;
  };
}

const bytesToStr = (data: number) => {
  if (data < 1000000) {
    return `${round(data / 1024)}KB`;
  }

  if (data < 1000000000) {
    return `${round(data / 1024 ** 2)}MB`;
  }

  return `${round(data / 1024 ** 3)}GB`;
};

export const getSystem = async () => {
  try {
    const [{ cpus, currentLoad: currentload }, { free, total, used }] =
      await Promise.all([currentLoad(), mem()]);

    const system: System = {
      cpus: cpus.map(({ load }) => ({ load: Math.round(load) })),
      currentLoad: Math.round(currentload),
      memory: {
        free: bytesToStr(free),
        total: bytesToStr(total),
        used: bytesToStr(used),
      },
    };

    return system;
  } catch (err) {
    logger.error(err?.toString());
  }

  return null;
};
