import path from "path";
import AzureConnection from "./azureConnection.js";
import { readFileSync } from "fs";

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

    public get(fileName: string): string | undefined {
        if (process.env.APP_ENV === 'dev') {
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
        const filePath: string = 'papers/' + fileName;

        const contents = readFileSync(filePath);
        
        return contents.toString();
    }
    
    private async getFromAzureBlob(fileName: string): Promise<string | undefined> {
        // TODO get actual azure Account and Container names
        const azureAccount = '';
        const azureContainer = '';

        const conn = new AzureConnection(azureAccount, azureContainer);

        const contents = await conn.getBlob(fileName);
        return contents;
    }
}