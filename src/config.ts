import "dotenv/config";
import { createLogger, format, transports } from "winston";

export const config = {
  pollInterval: 2000,
};

export const logger = createLogger({
  level: process.env.LOG_LEVEL || "info",
  transports: [new transports.Console({ format: format.simple() })],
});
