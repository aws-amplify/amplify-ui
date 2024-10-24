import * as StorageModule from '../../../storage-internal';

import { downloadHandler, DownloadHandlerInput } from '../download';

const downloadSpy = jest.spyOn(StorageModule, 'getUrl');

const baseInput: DownloadHandlerInput = {
  prefix: 'prefix/',
  config: {
    accountId: 'accountId',
    bucket: 'bucket',
    credentials: jest.fn(),
    region: 'region',
  },
  data: { key: 'key' },
};

describe('downloadHandler', () => {
  it('calls `getUrl` and returns the expected `key`', () => {
    const { key } = downloadHandler(baseInput);

    const expected: StorageModule.GetUrlInput = {
      path: `${baseInput.prefix}${baseInput.data.key}`,
      options: {
        bucket: {
          bucketName: baseInput.config.bucket,
          region: baseInput.config.region,
        },
        locationCredentialsProvider: baseInput.config.credentials,
        validateObjectExistence: true,
        contentDisposition: 'attachment',
      },
    };

    expect(downloadSpy).toHaveBeenCalledWith(expected);

    expect(key).toBe(baseInput.data.key);
  });
});
