import type { Request } from 'express';
type LogMessage = {
    message?: string;
    req?: Request;
    error?: Error;
};
type ErrorLogMessage = {
    message: string;
    req?: Request;
};
/**
 * This class is used for logging requests so if we get suspicious traffic, we can retrace our steps and look at them in the log files.
 * @method getLogger - gets the instance of Logger to make sure it is a singleton.
 * @method log - logs the latest request details to the server log file.
 */
export declare class Logger {
    private static instance;
    private logDirectory;
    private logFilePath;
    private errorLogPath;
    private constructor();
    static getLogger(): Logger;
    private ensureLogFilesExists;
<<<<<<< HEAD
    log(logMessage: LogMessage): void;
    errLog(errorLog: ErrorLogMessage): void;
=======
    /**
     * @function log
     * @description Logs out details to a request. Can take in error details, request details and headers, and
     * a slot for a message. If intended to be an error, include the isError parameter as true
     * @param {LogMessage} logMessage
     * @param {boolean} isError
     */
    log(logMessage: LogMessage, isError?: boolean): void;
    private buildLogMessage;
>>>>>>> main
}
export {};
//# sourceMappingURL=logger.d.ts.map