import type { Request } from 'express';
type LogMessage = {
    message?: string;
    req?: Request;
    error?: Error;
};
/**
 * This class is used for logging requests so if we get suspicious traffic, we can retrace our steps and look at them in the log files.
 * @method getLogger - gets the instance of Logger to make sure it is a singleton.
 * @method log - logs the latest request details to the server log file.
 * @method errLog - logs an error to the error log, taking in a message and an optional request details to share details if the error was regarding a request.
 */
export declare class Logger {
    private static instance;
    private logDirectory;
    private logFilePath;
    private errorLogPath;
    /**
     * This constructor uses the Singleton design pattern, which means there can only be one Logger instance
     * running at any time.
     */
    private constructor();
    /**
     * Gets the latest logger instance. Ensures only one exists at a time.
     * @returns {Logger}
     */
    static getLogger(): Logger;
    /**
     * Ensures the log files and their directory exists before attempting to write anything.
     */
    private ensureLogFilesExists;
    /**
     * Formats the IP from the request, returning either the original client IP instead of a proxy, or just the regular IP used to connect.
     * @param {Request} request
     * @returns {string}
     */
    private getIp;
    /**
     * @function log
     * @description Logs out details to a request. Can take in error details, request details and headers, and
     * a slot for a message.
     * @param {LogMessage} logMessage
     */
    log(logMessage: LogMessage): void;
    errorLog(logMessage: LogMessage): void;
    private buildLogMessage;
}
export {};
//# sourceMappingURL=logger.d.ts.map