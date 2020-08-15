import 'dotenv/config';
import * as winston from 'winston';

export const config = {
  pollInterval: 2000,
};

// eslint-disable-next-line import/prefer-default-export
export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  transports: [
    new winston.transports.Console({ format: winston.format.simple() }),
  ],
});
