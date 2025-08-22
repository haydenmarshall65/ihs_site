import type { Request } from 'express';
type LogMessage = {
    message?: string;
    req: Request;
};
export declare class Logger {
    private static instance;
    private logDirectory;
    private logFilePath;
    private errorLogPath;
    private constructor();
    static getLogger(): Logger;
    private ensureLogFilesExists;
    log(logMessage: LogMessage): void;
}
export {};
//# sourceMappingURL=logger.d.ts.map