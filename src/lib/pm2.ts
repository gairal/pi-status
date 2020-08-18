import * as pm2 from 'pm2';
import { formatISO9075 } from 'date-fns';

import { logger } from '../config';
import { round } from './utils';

const connect = () =>
  new Promise((resolve, reject) =>
    pm2.connect((err) => (err ? reject(err) : resolve()))
  );
const list = (): Promise<pm2.ProcessDescription[]> =>
  new Promise((resolve, reject) =>
    pm2.list((err, data) => (err ? reject(err) : resolve(data)))
  );

enum ProcessStatus {
  Online = 'online',
  Stopping = 'stopping',
  Stopped = 'stopped',
  Launching = 'launching',
  Errored = 'errored',
  OneLaunchStatus = 'one-launch-status',
}

export interface PM2Data {
  cpu?: number;
  id?: number;
  instances?: number | 'max';
  memory?: number;
  name?: string;
  pid?: number;
  restarts?: number;
  status: ProcessStatus;
  uptime?: string;
}

const get = async (): Promise<PM2Data[]> => {
  try {
    const data = await connect().then(list);

    /* eslint-disable camelcase */
    const result = data.map(({ monit, name, pid, pm_id, pm2_env }) => {
      const { cpu, memory } = monit || {};
      const { instances, pm_uptime, status = '', unstable_restarts } =
        pm2_env || {};

      const color =
        ({
          [ProcessStatus.Online]: 'green',
          [ProcessStatus.Errored]: 'red',
        } as Record<ProcessStatus, string>)[status as ProcessStatus] || 'blue';

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
        uptime: pm_uptime ? formatISO9075(new Date(pm_uptime)) : '',
      };
    });
    /* eslint-enable camelcase */

    return result;
  } catch (err) {
    logger.error(err.toString());
  }

  return [];
};

export default get;
