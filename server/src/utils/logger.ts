import { error } from 'console';
import type { Request } from 'express';
import fs from 'fs';
import path from 'path';

type LogMessage = {
    message?: string
    req?: Request
    error?: Error
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

    /**
     * @function log
     * @description Logs out details to a request. Can take in error details, request details and headers, and 
     * a slot for a message. If intended to be an error, include the isError parameter as true
     * @param {LogMessage} logMessage
     * @param {boolean} isError 
     */
    public log(logMessage: LogMessage, isError: boolean = false) {
        const fullLogMessage = this.buildLogMessage(logMessage); 

        let filePath;

        if (isError) {
            filePath = this.errorLogPath;
        } else {
            filePath = this.logFilePath;
        }
        
        fs.appendFile(filePath, fullLogMessage, (err) => {
            if (err) {
                console.error(err.message)
            }
        })
    }
    
    private buildLogMessage(logMessage: LogMessage): string {
        const timeAndDate = new Date().toUTCString();
        const request: Request | undefined = logMessage.req;

        let message = '[#] ' + timeAndDate + ' | ';

        if (logMessage.error !== undefined) {
            message = message + "ERROR: " +  logMessage.error.name + ': ' + logMessage.error.cause + ' ' + logMessage.error.stack + ' | '
        }

        if (request !== undefined) {
            const ip = this.getIp(request);
            const Url = request.url;
            const method = request.method;
            const userAgent: String | undefined = request.headers['user-agent'] ?? 'User-Agent Unknown'
            message = message + ' - ' + userAgent + ' - ' + method + ' ' + Url + ' IP: ' + ip + ' | '
        }

        message = message + ' - ' + (logMessage.message ?? '') + '\n';
        
        return message;
    }
}