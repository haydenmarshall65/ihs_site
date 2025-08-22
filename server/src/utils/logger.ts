import type { Request } from 'express';
import fs from 'fs';
import path from 'path';

type LogMessage = {
    message?: string
    req: Request
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

    public log(logMessage: LogMessage) {
        const timeAndDate = new Date().toUTCString();
        const request: Request = logMessage.req;
        const Url = request.url;
        const method = request.method;
        const userAgent: String | undefined = request.headers['user-agent'] ?? 'User-Agent Unknown'
        const message = '[#] ' + timeAndDate + ' - ' + userAgent + ' - ' + method + ' ' + Url + ' - ' + (logMessage.message ?? '') + '\n';
        
        const fullLogMessage = message;
        fs.appendFile(this.logFilePath, fullLogMessage, (err) => {
            if (err) {
                console.log(err.message)
            }
        })
    }
}