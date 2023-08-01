// import winston from "winston/lib/winston/config";
import winston from "winston";
export const logger = winston.createLogger({
	level: "info",
	format: winston.format.json(),
	transports: [new winston.transports.Console({})],
});
