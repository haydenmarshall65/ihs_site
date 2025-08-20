import fs from 'fs';
import path from 'path';
export class Logger {
    static instance = null;
    logFilePath;
    constructor() {
        const fullPath = path.resolve('src/logs/server.log');
        this.logFilePath = fullPath;
        this.ensureLogFileExists();
    }
    static getLogger() {
        if (Logger.instance === null) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }
    ensureLogFileExists() {
        if (!fs.existsSync(this.logFilePath)) {
            fs.open(this.logFilePath, 'w', (err, fd) => {
                if (err) {
                    console.error(`Error creating log file: ${err.message}`);
                }
                else {
                    fs.close(fd, (err) => {
                        if (err) {
                            console.error(`Error closing log file: ${err.message}`);
                        }
                        else {
                            console.log(`Log file created at ${this.logFilePath}`);
                        }
                    });
                }
            });
        }
    }
}
//# sourceMappingURL=logger.js.map