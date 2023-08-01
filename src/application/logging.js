import winston from "winston/lib/winston/config";

export const logger = winston.createLogger({
	level: "info",
	format: winston.format.json(),
	transport: [new winston.transport.console({})],
});
