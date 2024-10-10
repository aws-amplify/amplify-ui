import { remove } from 'aws-amplify/storage';

import { deleteHandler } from '../delete';

jest.mock('aws-amplify/storage', () => {
  const originalModule = jest.requireActual('aws-amplify/storage');

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return {
    __esModule: true,
    ...originalModule,
    remove: jest.fn(() => Promise.resolve({})),
  };
});

describe('deleteHandler', () => {
  it('calls remove and returns key', () => {
    const locationProvider = jest.fn();
    const { key } = deleteHandler({
      prefix: 'prefix/',
      config: {
        accountId: '',
        bucket: 'bucket',
        credentials: locationProvider,
        region: 'region',
      },
      data: {
        key: 'key',
      },
      key: '',
    });
    expect(remove).toHaveBeenCalledWith({
      path: 'prefix/key',
      options: {
        bucket: {
          bucketName: 'bucket',
          region: 'region',
        },
        locationCredentialsProvider: locationProvider,
      },
    });
    expect(key).toBe('prefix/key');
  });
});
