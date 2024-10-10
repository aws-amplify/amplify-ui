import { copy } from 'aws-amplify/storage';

import { copyHandler } from '../copy';

jest.mock('aws-amplify/storage', () => {
  const originalModule = jest.requireActual('aws-amplify/storage');

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return {
    __esModule: true,
    ...originalModule,
    copy: jest.fn(() => Promise.resolve({})),
  };
});

describe('copyHandler', () => {
  it('calls copy and returns key', () => {
    const locationProvider = jest.fn();
    const { key } = copyHandler({
      prefix: 'prefix/',
      config: {
        accountId: '',
        bucket: 'bucket',
        credentials: locationProvider,
        region: 'region',
      },
      data: {
        destinationPrefix: 'destination/',
        key: 'key',
      },
      key: '',
    });
    expect(copy).toHaveBeenCalledWith({
      source: {
        path: 'prefix/key',
        bucket: {
          bucketName: 'bucket',
          region: 'region',
        },
      },
      destination: {
        path: 'destination/key',
        bucket: {
          bucketName: 'bucket',
          region: 'region',
        },
      },
      options: {
        locationCredentialsProvider: locationProvider,
      },
    });
    expect(key).toBe('destination/key');
  });
});
