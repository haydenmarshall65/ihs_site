import { BlobServiceClient, ContainerClient } from "@azure/storage-blob";
import { DefaultAzureCredential } from "@azure/identity";

export default class AzureConnection implements AzureConnection {
    account: string
    containerName: string;
    blobServiceClient: BlobServiceClient;
    containerClient: ContainerClient;

    public constructor(account: string, container: string) {
        this.account = account
        this.containerName = container

        this.blobServiceClient = new BlobServiceClient(
            `https://${account}.blob.core.windows.net`,
            new DefaultAzureCredential(),
        );

        this.containerClient = this.blobServiceClient.getContainerClient(this.containerName);
    }

    public async getBlob(fileName: string): Promise<string | undefined> {
        const blobClient = this.containerClient.getBlobClient(fileName);
        const downloadBlockBlobResponse = await blobClient.download();
        if (downloadBlockBlobResponse.readableStreamBody) {
            const content = await this.streamToString(downloadBlockBlobResponse.readableStreamBody);
            return content
        }
        return undefined
    }

    private async streamToString(stream: NodeJS.ReadableStream): Promise<string> {
        const result = await new Promise<Buffer<ArrayBuffer>>((resolve, reject) => {
            const chunks: Buffer[] = [];
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
