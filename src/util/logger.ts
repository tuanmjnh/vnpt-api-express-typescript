import winston from "winston";
import { Logger } from "winston";
// import { ENVIRONMENT } from "./secrets";

const logger = new (Logger)({
  transports: [
    new (winston.transports.Console)({
      level: process.env.NODE_ENV === "production" ? "error" : "debug"
    }),
    new (winston.transports.File)({
      level: process.env.NODE_ENV === "production" ? "error" : "debug",
      filename: process.env.NODE_ENV === "production" ? "error.log" : "debug.log"
    })
  ]
});

if (process.env.NODE_ENV !== "production") {
  logger.debug("Logging initialized at debug level");
}

export default logger;

