import * as StorageModule from 'aws-amplify/storage';

import { deleteHandler, DeleteHandlerInput } from '../delete';

const removeSpy = jest.spyOn(StorageModule, 'remove');

const baseInput: DeleteHandlerInput = {
  prefix: 'prefix/',
  config: {
    accountId: '',
    bucket: 'bucket',
    credentials: jest.fn(),
    region: 'region',
  },
  data: { key: 'key' },
};

describe('deleteHandler', () => {
  it('calls `remove` and returns the expected `key`', () => {
    const { key } = deleteHandler(baseInput);

    const expected: StorageModule.RemoveWithPathInput = {
      path: `${baseInput.prefix}${baseInput.data.key}`,
      options: {
        bucket: {
          bucketName: baseInput.config.bucket,
          region: baseInput.config.region,
        },
        locationCredentialsProvider: baseInput.config.credentials,
      },
    };

    expect(removeSpy).toHaveBeenCalledWith(expected);

    expect(key).toBe(baseInput.data.key);
  });
});
