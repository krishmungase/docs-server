import winston from "winston";

const logger = winston.createLogger({
  level: "info",
  defaultMeta: { service: "docs-service" },
  transports: [
    new winston.transports.Console({
      level: "info",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
    }),
  ],
});

export default logger;
