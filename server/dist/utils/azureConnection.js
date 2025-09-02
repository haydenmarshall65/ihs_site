import { BlobServiceClient, ContainerClient } from "@azure/storage-blob";
import { DefaultAzureCredential } from "@azure/identity";
export default class AzureBlobConnection {
    account;
    containerName;
    blobServiceClient;
    containerClient;
    constructor(account, container) {
        this.account = account;
        this.containerName = container;
        this.blobServiceClient = new BlobServiceClient(`https://${account}.blob.core.windows.net`, new DefaultAzureCredential());
        this.containerClient = this.blobServiceClient.getContainerClient(this.containerName);
    }
    async getBlob(fileName) {
        const blobClient = this.containerClient.getBlobClient(fileName);
        const downloadBlockBlobResponse = await blobClient.download();
        if (downloadBlockBlobResponse.readableStreamBody) {
            const content = await this.streamToString(downloadBlockBlobResponse.readableStreamBody);
            return content;
        }
        return undefined;
    }
    async streamToString(stream) {
        const result = await new Promise((resolve, reject) => {
            const chunks = [];
            stream.on("data", (data) => {
                chunks.push(Buffer.isBuffer(data) ? data : Buffer.from(data));
            });
            stream.on("end", () => {
                resolve(Buffer.concat(chunks));
            });
            stream.on("error", reject);
        });
        return result.toString();
    }
}
//# sourceMappingURL=azureConnection.js.map