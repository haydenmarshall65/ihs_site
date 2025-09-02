import path from "path";
import AzureBlobConnection from "./azureConnection.js";
import { readFileSync } from "fs";

/**
 * @class Storage
 * This is a singleton that is used to grab files from either the public directory for local development
 * or from an Azure Blob if in production or testing Azure with AZURE_DEBUG.
 */
export class Storage {
    private static instance: Storage | null = null
    private filePath: string;

    private constructor() {
        this.filePath = path.resolve('dist/public/papers');
    }

    public static getStorageInstance(): Storage {
        if(Storage.instance === null) {
            Storage.instance = new Storage();
        } 

        return Storage.instance;
    }

    public get(fileName: string): string | undefined {
        if (process.env.APP_ENV === 'dev' && process.env.AZURE_DEBUG === 'false') {
            const fileContents = this.getFromPublicDir(fileName)
            return fileContents;
        } else {
            let azureFileContents: string | undefined; 
            this.getFromAzureBlob(fileName).then((contents) => {
                azureFileContents = contents;
            })

            return azureFileContents;
        }
    }

    private getFromPublicDir(fileName: string): string {
        const filePath: string = this.filePath + '/' + fileName;

        const contents = readFileSync(filePath);
        
        return contents.toString();
    }
    
    private async getFromAzureBlob(fileName: string): Promise<string | undefined> {
        // TODO get actual azure Account and Container names
        const azureAccount = '';
        const azureContainer = '';

        const conn = new AzureBlobConnection(azureAccount, azureContainer);

        const contents = await conn.getBlob(fileName);
        return contents;
    }
}