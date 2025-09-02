import path from "path";
import AzureConnection from "./azureConnection.js";
import { readFileSync } from "fs";
export class Storage {
    static instance = null;
    filePath;
    constructor() {
        this.filePath = path.resolve('dist/public/papers');
        const environment = process.env.APP_ENV;
    }
    static getStorageInstance() {
        if (Storage.instance === null) {
            Storage.instance = new Storage();
        }
        return Storage.instance;
    }
    get(fileName) {
        if (process.env.APP_ENV === 'dev') {
            const fileContents = this.getFromPublicDir(fileName);
            return fileContents;
        }
        else {
            let azureFileContents;
            this.getFromAzureBlob(fileName).then((contents) => {
                azureFileContents = contents;
            });
            return azureFileContents;
        }
    }
    getFromPublicDir(fileName) {
        const filePath = this.filePath + '/' + fileName;
        const contents = readFileSync(filePath);
        return contents.toString();
    }
    async getFromAzureBlob(fileName) {
        // TODO get actual azure Account and Container names
        const azureAccount = '';
        const azureContainer = '';
        const conn = new AzureConnection(azureAccount, azureContainer);
        const contents = await conn.getBlob(fileName);
        return contents;
    }
}
//# sourceMappingURL=storage.js.map