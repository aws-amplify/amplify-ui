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
  key: 'key',
  // @ts-expect-error
  // FIXME: The type for payload is never
  data: { id: 'id', payload: undefined },
};

describe('downloadHandler', () => {
  it('calls `getUrl` and returns the expected `key`', () => {
    const { key } = downloadHandler(baseInput);

    const expected: StorageModule.GetUrlInput = {
      path: baseInput.key,
      options: {
        bucket: {
          bucketName: baseInput.config.bucket,
          region: baseInput.config.region,
        },
        locationCredentialsProvider: baseInput.config.credentials,
        validateObjectExistence: true,
        contentDisposition: 'attachment',
        expectedBucketOwner: baseInput.config.accountId,
      },
    };

    expect(downloadSpy).toHaveBeenCalledWith(expected);

    expect(key).toBe(baseInput.key);
  });
});
