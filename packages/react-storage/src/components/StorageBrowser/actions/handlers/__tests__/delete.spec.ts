import * as StorageModule from '../../../storage-internal';

import { deleteHandler, DeleteHandlerInput } from '../delete';

const removeSpy = jest.spyOn(StorageModule, 'remove');

const baseInput: DeleteHandlerInput = {
  config: {
    accountId: '012345678901',
    bucket: 'bucket',
    credentials: jest.fn(),
    customEndpoint: 'mock-endpoint',
    region: 'region',
  },
  data: {
    id: 'id',
    key: 'prefix/key.png',
    fileKey: 'key.png',
    lastModified: new Date(),
    size: 829292,
    type: 'FILE',
  },
};

describe('deleteHandler', () => {
  it('calls `remove` and returns the expected `key`', () => {
    deleteHandler(baseInput);

    const expected: StorageModule.RemoveInput = {
      path: baseInput.data.key,
      options: {
        expectedBucketOwner: baseInput.config.accountId,
        bucket: {
          bucketName: baseInput.config.bucket,
          region: baseInput.config.region,
        },
        customEndpoint: baseInput.config.customEndpoint,
        locationCredentialsProvider: baseInput.config.credentials,
      },
    };

    expect(removeSpy).toHaveBeenCalledWith(expected);
  });
});
