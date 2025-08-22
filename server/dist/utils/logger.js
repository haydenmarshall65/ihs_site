import fs from 'fs';
import path from 'path';
export class Logger {
    static instance = null;
    logDirectory;
    logFilePath;
    errorLogPath;
    constructor() {
        const fullLogDirectory = path.resolve('dist/logs');
        const fullPath = path.resolve('dist/logs/server.log');
        const fullErrorLogPath = path.resolve('dist/logs/error.log');
        this.logDirectory = fullLogDirectory;
        this.logFilePath = fullPath;
        this.errorLogPath = fullErrorLogPath;
        this.ensureLogFilesExists();
    }
    static getLogger() {
        if (Logger.instance === null) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }
    ensureLogFilesExists() {
        if (!fs.existsSync(this.logDirectory)) {
            fs.mkdirSync(this.logDirectory);
        }
        if (!fs.existsSync(this.logFilePath)) {
            fs.writeFile(this.logFilePath, '', 'utf-8', (err) => {
                if (err) {
                    console.error(`Error creating log file: ${err.message}`);
                }
            });
        }
        if (!fs.existsSync(this.errorLogPath)) {
            fs.writeFile(this.errorLogPath, '', 'utf-8', (err) => {
                if (err) {
                    console.error(`Error creating log file: ${err.message}`);
                }
            });
        }
    }
    log(logMessage) {
        const timeAndDate = new Date().toUTCString();
        const request = logMessage.req;
        const Url = request.url;
        const method = request.method;
        const userAgent = request.headers['user-agent'] ?? 'User-Agent Unknown';
        const message = '[#] ' + timeAndDate + ' - ' + userAgent + ' - ' + method + ' ' + Url + ' - ' + (logMessage.message ?? '') + '\n';
        const fullLogMessage = message;
        fs.appendFile(this.logFilePath, fullLogMessage, (err) => {
            if (err) {
                console.log(err.message);
            }
        });
    }
}
//# sourceMappingURL=logger.js.map