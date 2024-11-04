import * as StorageModule from '../../../storage-internal';

import { copyHandler, CopyHandlerInput } from '../copy';

const copySpy = jest.spyOn(StorageModule, 'copy');

const baseInput: CopyHandlerInput = {
  prefix: 'prefix/',
  config: {
    accountId: '012345678901',
    bucket: 'bucket',
    credentials: jest.fn(),
    region: 'region',
  },
  key: 'key',
  data: { id: 'identity', payload: { destinationPrefix: 'destination/' } },
};

describe('copyHandler', () => {
  it('calls `copy` and returns the expected `key`', () => {
    const { key } = copyHandler(baseInput);

    const bucket = {
      bucketName: `${baseInput.config.bucket}`,
      region: `${baseInput.config.region}`,
    };

    const expected: StorageModule.CopyInput = {
      destination: {
        expectedBucketOwner: baseInput.config.accountId,
        bucket,
        path: 'prefix/key',
      },
      source: {
        expectedBucketOwner: `${baseInput.config.accountId}`,
        bucket,
        path: `${baseInput.key}`,
      },
      options: {
        locationCredentialsProvider: baseInput.config.credentials,
      },
    };

    expect(copySpy).toHaveBeenCalledWith(expected);
    expect(key).toBe(baseInput.key);
  });
});
