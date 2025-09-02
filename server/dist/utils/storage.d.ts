/**
 * @class Storage
 * This is a singleton that is used to grab files from either the public directory for local development
 * or from an Azure Blob if in production or testing Azure with AZURE_DEBUG.
 */
export declare class Storage {
    private static instance;
    private filePath;
    private constructor();
    static getStorageInstance(): Storage;
    get(fileName: string): string | undefined;
    private getFromPublicDir;
    private getFromAzureBlob;
}
//# sourceMappingURL=storage.d.ts.map