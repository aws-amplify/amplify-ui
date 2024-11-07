import * as StorageModule from '../../../storage-internal';

import { downloadHandler, DownloadHandlerInput } from '../download';

const downloadSpy = jest.spyOn(StorageModule, 'getUrl');

const baseInput: DownloadHandlerInput = {
  config: {
    accountId: 'accountId',
    bucket: 'bucket',
    credentials: jest.fn(),
    customEndpoint: 'mock-endpoint',
    region: 'region',
  },
  data: {
    id: 'id',
    key: 'prefix/file-name',
    fileKey: 'file-name',
    lastModified: new Date(),
    size: 1000022,
    type: 'FILE',
  },
};

describe('downloadHandler', () => {
  it('calls `getUrl` with the expected values', () => {
    downloadHandler(baseInput);

    const expected: StorageModule.GetUrlInput = {
      path: baseInput.data.key,
      options: {
        bucket: {
          bucketName: baseInput.config.bucket,
          region: baseInput.config.region,
        },
        customEndpoint: baseInput.config.customEndpoint,
        locationCredentialsProvider: baseInput.config.credentials,
        validateObjectExistence: true,
        contentDisposition: 'attachment',
        expectedBucketOwner: baseInput.config.accountId,
      },
    };

    expect(downloadSpy).toHaveBeenCalledWith(expected);
  });
});
