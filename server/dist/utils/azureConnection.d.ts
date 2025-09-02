import { BlobServiceClient, ContainerClient } from "@azure/storage-blob";
export default class AzureBlobConnection {
    account: string;
    containerName: string;
    blobServiceClient: BlobServiceClient;
    containerClient: ContainerClient;
    constructor(account: string, container: string);
    getBlob(fileName: string): Promise<string | undefined>;
    private streamToString;
}
//# sourceMappingURL=azureConnection.d.ts.map