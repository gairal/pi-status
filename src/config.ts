import "dotenv/config";
import { createLogger, format, transports } from "winston";

export const config = {
  pollInterval: 2000,
};

// eslint-disable-next-line import/prefer-default-export
export const logger = createLogger({
  level: process.env.LOG_LEVEL || "info",
  transports: [new transports.Console({ format: format.simple() })],
});
