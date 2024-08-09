import { promisify } from "node:util";

import { formatISO9075 } from "date-fns";
// biome-ignore lint/style/noNamespaceImport: exception
import * as pm2 from "pm2";

import { logger } from "../config";
import { round } from "./utils";

const promized = {
  connect: promisify(pm2.connect.bind(pm2)),
  disconnect: promisify(pm2.disconnect.bind(pm2)),
  list: promisify(pm2.list.bind(pm2)),
  restart: promisify(pm2.restart.bind(pm2)),
  start: promisify(pm2.start.bind(pm2)),
  stop: promisify(pm2.stop.bind(pm2)),
};

const exec = <T>(operation: () => Promise<T>) =>
  promized.connect().then(operation).finally(promized.disconnect);

enum ProcessStatus {
  Errored = "errored",
  Launching = "launching",
  OneLaunchStatus = "one-launch-status",
  Online = "online",
  Stopped = "stopped",
  Stopping = "stopping",
}

export interface Pm2Data {
  cpu?: number;
  id?: number;
  instances?: number | "max";
  memory?: number;
  name?: string;
  pid?: number;
  restarts?: number;
  status: ProcessStatus;
  uptime?: string;
}

export const list = async () => {
  try {
    const data = await exec(promized.list);

    const result = data.map(({ monit, name, pid, pm_id, pm2_env }) => {
      const { cpu, memory } = monit || {};
      const {
        instances,
        pm_uptime,
        status = "",
        unstable_restarts,
      } = pm2_env || {};

      const color =
        (
          {
            [ProcessStatus.Online]: "green",
            [ProcessStatus.Errored]: "red",
          } as Record<ProcessStatus, string>
        )[status as ProcessStatus] || "blue";

      return {
        color,
        cpu,
        id: pm_id,
        instances,
        memory: memory ? round(memory / 1024 / 1024) : 0,
        name,
        pid,
        restarts: unstable_restarts,
        status: status as ProcessStatus,
        uptime: pm_uptime ? formatISO9075(new Date(pm_uptime)) : "",
      };
    });

    return result;
  } catch (err) {
    logger.error(err?.toString());
  }

  return [];
};

export const restart = async (name: string) => {
  if (!name) {
    logger.error("restart: missing name");
    return null;
  }

  return exec(() => promized.restart(name));
};

export const stop = async (name: string) => {
  if (!name) {
    logger.error("stop: missing name");
    return null;
  }

  return exec(() => promized.stop(name));
};
