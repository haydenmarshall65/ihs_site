import type { Request } from 'express';
type LogMessage = {
    message?: string;
    req?: Request;
    error?: Error;
};
export declare class Logger {
    private static instance;
    private logDirectory;
    private logFilePath;
    private errorLogPath;
    private constructor();
    static getLogger(): Logger;
    private ensureLogFilesExists;
    /**
     * @function log
     * @description Logs out details to a request. Can take in error details, request details and headers, and
     * a slot for a message. If intended to be an error, include the isError parameter as true
     * @param {LogMessage} logMessage
     * @param {boolean} isError
     */
    log(logMessage: LogMessage, isError?: boolean): void;
    private buildLogMessage;
}
export {};
//# sourceMappingURL=logger.d.ts.map