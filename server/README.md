# IHS Site Server

This is the directory containing the code for the IHS Site API that will handle searching for research papers in the Azure CosmosDB and grabbing research papers directly from the Azure Blob storage bucket. The project is run using Node and TypeScript, running an Express server.

## How to get started

To get started, make sure to run `npm install` to install the dependencies. After installing the dependencies, use `npm run build` to build the project, and then `npm run start` to run the project.

### Details on static assets

For updating and accessing static assets, such as HTML, CSS, images, or any other static files, see `/dist/public`.

### Details on how to connect via Azure Blob Storage

Check out [this](https://learn.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-nodejs?tabs=managed-identity%2Croles-azure-portal%2Csign-in-azure-cli&pivots=blob-storage-quickstart-scratch#authenticate-to-azure-and-authorize-access-to-blob-data) article from Microsoft about permissions and how to set up connection to the blob storage.