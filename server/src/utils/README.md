# Utils for IHS API

This is a directory that includes many different utility classes for working in this API.

## Logger

Logger is a class used to log request details or errors directly to log files. It follows the singleton design pattern to ensure only one Logger exists at any time and contains three available methods:
- getLogger = a static method to get the Logger instance from the class.
- log = a method to log a message directly to the `server.log` file. See type `LogMessage` from logger.ts to see more about what it requires. This method logs details about requests if given, such as IP, URL, userAgent, time and date, etc.
- errLog = a method to log a message directly to the `error.log` file. WOrks exactly the same except includes a section specific to logging errors, including the stack trace.

## Storage

Storage is a class used to get files from either the public directory of the site for development testing, or from the Azure Blob for in production. Similar to the Logger class, this also follows the Singleton design pattern.

Storage includes two available methods:
- getStorageInstance = a static method to get the Storage instance
- get = a method to return the file contents of a file based on its file name. Will search either the public directory or an Azure container depending on whether APP_ENV is set to `"dev"` or `"prod"` and if AZURE_DEBUG is set to `true` or `false`.

## AzureBlobConnection

AzureConnection is a Facade class that abstracts the requirements of getting files from the Azure Container. It has one available method:
- getBlob = a method to get the contents of a file based on the fileName given and return the contents from a stream into a string.

### Requirements

In order for the AzureBlobConnection to work, some environment variables must be provided in `.env`. Please ensure the following are included in your `.env` file:
- `AZURE_TENANT_ID` = The Microsoft Entra tenant (directory) ID.
- `AZURE_CLIENT_ID` = The client (application) ID of an App Registration in the tenant.
- `AZURE_CLIENT_SECRET` = A client secret that was generated for the App Registration.