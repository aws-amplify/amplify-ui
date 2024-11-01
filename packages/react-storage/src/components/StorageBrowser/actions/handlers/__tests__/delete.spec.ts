import * as StorageModule from '../../../storage-internal';

import { deleteHandler, DeleteHandlerInput } from '../delete';

const removeSpy = jest.spyOn(StorageModule, 'remove');

const baseInput: DeleteHandlerInput = {
  prefix: 'prefix/',
  key: 'prefix/key',
  config: {
    accountId: '012345678901',
    bucket: 'bucket',
    credentials: jest.fn(),
    region: 'region',
  },
  // @ts-expect-error
  // FIXME: The type for payload is never
  data: { id: 'id', payload: undefined },
};

describe('deleteHandler', () => {
  it('calls `remove` and returns the expected `key`', () => {
    const { key } = deleteHandler(baseInput);

    const expected: StorageModule.RemoveInput = {
      path: baseInput.key,
      options: {
        expectedBucketOwner: baseInput.config.accountId,
        bucket: {
          bucketName: baseInput.config.bucket,
          region: baseInput.config.region,
        },
        locationCredentialsProvider: baseInput.config.credentials,
      },
    };

    expect(removeSpy).toHaveBeenCalledWith(expected);

    expect(key).toBe(baseInput.key);
  });
});
