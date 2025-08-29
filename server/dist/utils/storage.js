import path from "path";
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
            const azureFileContents = this.getFromAzureBlob(fileName);
            return azureFileContents;
        }
    }
    getFromPublicDir(fileName) {
        // TODO implement
        return '';
    }
    getFromAzureBlob(fileName) {
        // TODO implement && npm install @azure/storage-blob @azure/identity
        return '';
    }
}
//# sourceMappingURL=storage.js.map