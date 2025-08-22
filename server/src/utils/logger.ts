import type { Request } from 'express';
import fs from 'fs';
import path from 'path';

type LogMessage = {
    message?: string
    req: Request
}
type ErrorLogMessage = {
    message: string
    req?: Request
}

/**
 * This class is used for logging requests so if we get suspicious traffic, we can retrace our steps and look at them in the log files.
 * @method getLogger - gets the instance of Logger to make sure it is a singleton.
 * @method log - logs the latest request details to the server log file.
 * @method errLog - logs an error to the error log, taking in a message and an optional request details to share details if the error was regarding a request.
 */
export class Logger {
    private static instance: Logger | null = null;
    private logDirectory: string
    private logFilePath: string;
    private errorLogPath: string;

    /**
     * This constructor uses the Singleton design pattern, which means there can only be one Logger instance
     * running at any time. 
     */
    private constructor() {
        const fullLogDirectory = path.resolve('dist/logs');
        const fullPath = path.resolve('dist/logs/server.log');
        const fullErrorLogPath = path.resolve('dist/logs/error.log');
        this.logDirectory = fullLogDirectory;
        this.logFilePath = fullPath;
        this.errorLogPath = fullErrorLogPath;
        this.ensureLogFilesExists();
    }
    
    /**
     * Gets the latest logger instance. Ensures only one exists at a time.
     * @returns {Logger}
     */
    public static getLogger(): Logger {
        if (Logger.instance === null) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }

    /**
     * Ensures the log files and their directory exists before attempting to write anything.
     */
    private ensureLogFilesExists() {
        if(!fs.existsSync(this.logDirectory)) {
            fs.mkdirSync(this.logDirectory);
        }
        if (!fs.existsSync(this.logFilePath)) {
            fs.writeFile(this.logFilePath, '', 'utf-8', (err) => {
                if (err) {
                    console.error(`Error creating log file: ${err.message}`);
                }
            })
        }

        if(!fs.existsSync(this.errorLogPath)) {
            fs.writeFile(this.errorLogPath, '', 'utf-8', (err) => {
                if(err) {
                    console.error(`Error creating log file: ${err.message}`)
                }
            })
        }
    }

    /**
     * Formats the IP from the request, returning either the original client IP instead of a proxy, or just the regular IP used to connect.
     * @param {Request} request
     * @returns {string}
     */
    private getIp(request: Request): string {
        const ips = request.ips;
        let ip: string | undefined;
        if(ips.length === 0) {
            ip = request.ip
        } else {
            ip = ips[0]
        }

        return ip ?? "IP Unkown"
    }

    public log(logMessage: LogMessage) {
        const timeAndDate = new Date().toUTCString();
        const request: Request = logMessage.req;
        const Url = request.url;
        const method = request.method;
        const userAgent: String | undefined = request.headers['user-agent'] ?? 'User-Agent Unknown';
        const ip = this.getIp(request);
        const message = '[#] ' + timeAndDate + ' - ' + userAgent + ', IP: ' + ip + ' - ' + method + ' ' + Url + ' - ' + (logMessage.message ?? '') + '\n';
        
        const fullLogMessage = message;
        fs.appendFile(this.logFilePath, fullLogMessage, (err) => {
            if (err) {
                console.error(err.message)
            }
        })
    }
    
    public errLog(errorLog: ErrorLogMessage) {
        const timeAndDate = new Date().toUTCString();
        const request: Request | undefined = errorLog.req;
        
        let fullErrorMessage = '[X] ' + timeAndDate + ' - ERROR: ' + errorLog.message; 

        if(request) {
            const reqBody = request.body
            const url = request.url
            const method = request.method;
            const userAgent = request.headers['user-agent'] ?? 'User Agent Unknown'
            const ip = this.getIp(request)
            fullErrorMessage = fullErrorMessage + ' - Request: ' + url + ' ' + method + ', IP: ' + ip + ' - ' + userAgent;
        }

        fs.appendFile(this.errorLogPath, fullErrorMessage, (err) => {
            if (err) {
                console.error(err.message);
            }
        })
    }
}