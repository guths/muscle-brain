import dotenv from 'dotenv';
import winston from 'winston';
import { v4 as uuid } from 'uuid';
import LoggerTemplate from './LoggerTemplate';

dotenv.config();

const logSilent = process.env.LOG_ENABLED === 'false' || false;
const appEnv = process.env.APP_ENV || 'local';

export const winstonLogger = winston.createLogger({
    level: process.env.level || 'info',
    format: winston.format.json(),
    silent: logSilent,
    transports: [
        new winston.transports.File({ filename: 'src/storage/logs/error.log', level: 'error' }),
    ]
});

if (appEnv === 'local') {
    winstonLogger.add(new winston.transports.Console({
        format: winston.format.json(),
    }))
}

export default class Logger {
    static requestId: string;

    private static createLogObj(title: string, args: object): object {
        if (this.requestId === undefined) {
            this.requestId = uuid();
        }

        const logTemplate = new LoggerTemplate();
        const message = { title, content: args };
        const requiredIdObj = { requestId: this.requestId };
        return { ...logTemplate, ...requiredIdObj, message };
    }

    static log(level: string, message: string, args: object): void {
        const logObj = this.createLogObj(message, args);
        winstonLogger.log(level, logObj);
    }

    static debug(message: string, args: object): void {
        Logger.log('debug', message, args);
    }

    static info(message: string, args: object): void {
        Logger.log('info', message, args);
    }

    static warning(message: string, args: object): void {
        Logger.log('warning', message, args);
    }

    static error(message: string, args: object): void {
        Logger.log('error', message, args);
    }

    static critical(message: string, args: object): void {
        Logger.log('critical', message, args);
    }
}


