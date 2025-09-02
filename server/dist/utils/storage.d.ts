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