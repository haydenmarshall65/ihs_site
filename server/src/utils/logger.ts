import { error } from 'console';
import type { Request } from 'express';
import fs from 'fs';
import path from 'path';

type LogMessage = {
    message?: string
    req?: Request
    error?: Error
}

export class Logger {
    private static instance: Logger | null = null;
    private logDirectory: string
    private logFilePath: string;
    private errorLogPath: string;

    private constructor() {
        const fullLogDirectory = path.resolve('dist/logs');
        const fullPath = path.resolve('dist/logs/server.log');
        const fullErrorLogPath = path.resolve('dist/logs/error.log');
        this.logDirectory = fullLogDirectory;
        this.logFilePath = fullPath;
        this.errorLogPath = fullErrorLogPath;
        this.ensureLogFilesExists();
    }
    
    public static getLogger(): Logger {
        if (Logger.instance === null) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }

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
                console.log(err.message)
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
            const Url = request.url;
            const method = request.method;
            const userAgent: String | undefined = request.headers['user-agent'] ?? 'User-Agent Unknown'
            message = message + ' - ' + userAgent + ' - ' + method + ' ' + Url + ' | '
        }

        message = message + ' - ' + (logMessage.message ?? '') + '\n';
        
        return message;
    }
}