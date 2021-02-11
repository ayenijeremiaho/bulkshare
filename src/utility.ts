import {createConnection} from "typeorm";
import {createLogger, format, transports} from "winston";

//DB
export async function connectDb() {
    try {
        await createConnection();
    } catch (error) {
        return console.log(error);
    }
}

//LOG
export const logger = createLogger({
    level: 'info',
    format: format.json(),
    defaultMeta: {service: 'user-service'},
    transports: [
        // - Write all logs with level `info` and below to `combined.log`
        new transports.File({filename: 'logs/logger.log'}),
    ],
});

// @ts-ignore
logger.rejections.handle(
    new transports.File({filename: 'logs/rejections.log'})
);

logger.exceptions.handle(
    new transports.File({ filename: 'logs/exceptions.log' })
);

// If we're not in production then log to the `console` with the format:
if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console({
        format: format.combine(format.colorize(), format.simple())
    }));
}