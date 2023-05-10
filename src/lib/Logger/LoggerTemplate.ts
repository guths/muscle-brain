export default class LoggerTemplate {
    timestamp: string;

    level: string;

    pid: number;

    version: string;

    application: string;

    constructor() {
        this.timestamp = new Date().toISOString();
        this.level = process.env.LOG_LEVEL || 'info';
        this.pid = process.pid;
        this.version = process.env.version as string;
        this.application = process.env.application as string;
    }
}