import path from "path";

export class Storage {
    private static instance: Storage | null = null
    private filePath: string;

    private constructor() {
        this.filePath = path.resolve('dist/public/papers');
        const environment = process.env.APP_ENV
    }

    public static getStorageInstance(): Storage {
        if(Storage.instance === null) {
            Storage.instance = new Storage();
        } 

        return Storage.instance;
    }

    public get(fileName: string): string {
        if (process.env.APP_ENV === 'dev') {
            const fileContents = this.getFromPublicDir(fileName)
            return fileContents;
        } else {
            const azureFileContents = this.getFromAzureBlob(fileName)
            return azureFileContents;
        }
    }

    private getFromPublicDir(fileName: string): string {
        // TODO implement
        return ''
    }
    
    private getFromAzureBlob(fileName: string): string {
        // TODO implement && npm install @azure/storage-blob @azure/identity
        return ''
    }
}