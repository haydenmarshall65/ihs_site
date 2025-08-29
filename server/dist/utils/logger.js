import { error } from 'console';
import fs from 'fs';
import path from 'path';
/**
 * This class is used for logging requests so if we get suspicious traffic, we can retrace our steps and look at them in the log files.
 * @method getLogger - gets the instance of Logger to make sure it is a singleton.
 * @method log - logs the latest request details to the server log file.
 */
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
    /**
     * @function log
     * @description Logs out details to a request. Can take in error details, request details and headers, and
     * a slot for a message. If intended to be an error, include the isError parameter as true
     * @param {LogMessage} logMessage
     * @param {boolean} isError
     */
    log(logMessage, isError = false) {
        const fullLogMessage = this.buildLogMessage(logMessage);
        let filePath;
        if (isError) {
            filePath = this.errorLogPath;
        }
        else {
            filePath = this.logFilePath;
        }
        fs.appendFile(filePath, fullLogMessage, (err) => {
            if (err) {
                console.error(err.message);
            }
        });
    }
    errLog(errorLog) {
        const fullErrorMessage = errorLog.message;
        fs.appendFile(this.errorLogPath, fullErrorMessage, (err) => {
            if (err) {
                console.error(err.message);
            }
        });
    }
    buildLogMessage(logMessage) {
        const timeAndDate = new Date().toUTCString();
        const request = logMessage.req;
        let message = '[#] ' + timeAndDate + ' | ';
        if (logMessage.error !== undefined) {
            message = message + "ERROR: " + logMessage.error.name + ': ' + logMessage.error.cause + ' ' + logMessage.error.stack + ' | ';
        }
        if (request !== undefined) {
            const Url = request.url;
            const method = request.method;
            const userAgent = request.headers['user-agent'] ?? 'User-Agent Unknown';
            message = message + ' - ' + userAgent + ' - ' + method + ' ' + Url + ' | ';
        }
        message = message + ' - ' + (logMessage.message ?? '') + '\n';
        return message;
    }
}
//# sourceMappingURL=logger.js.map