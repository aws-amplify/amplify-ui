import * as StorageModule from '../../../storage-internal';

import { copyHandler, CopyHandlerInput } from '../copy';

const copySpy = jest.spyOn(StorageModule, 'copy');

const baseInput: CopyHandlerInput = {
  destinationPrefix: 'destination/',
  config: {
    accountId: '012345678901',
    bucket: 'bucket',
    credentials: jest.fn(),
    customEndpoint: 'mock-endpoint',
    region: 'region',
  },
  data: {
    id: 'identity',
    key: 'some-prefixfix/some-key.hehe',
    fileKey: 'some-key.hehe',
    lastModified: new Date(),
    size: 100000000,
    type: 'FILE',
  },
};

describe('copyHandler', () => {
  afterEach(() => {
    copySpy.mockClear();
  });

  it('calls `copy` wth the expected values', () => {
    copyHandler(baseInput);

    const bucket = {
      bucketName: `${baseInput.config.bucket}`,
      region: `${baseInput.config.region}`,
    };

    const expected: StorageModule.CopyInput = {
      destination: {
        expectedBucketOwner: baseInput.config.accountId,
        bucket,
        path: `${baseInput.destinationPrefix}${baseInput.data.fileKey}`,
      },
      source: {
        expectedBucketOwner: `${baseInput.config.accountId}`,
        bucket,
        path: baseInput.data.key,
      },
      options: {
        locationCredentialsProvider: baseInput.config.credentials,
        customEndpoint: baseInput.config.customEndpoint,
      },
    };

    expect(copySpy).toHaveBeenCalledWith(expected);
  });

  it.each([
    ['unicode', 'bucket/path/☺️', 'bucket/path/%E2%98%BA%EF%B8%8F'],
    ['already encoded', 'bucket/path/%20', 'bucket/path/%2520'],
    [
      'characters to be uri encoded',
      'bucket/path/&$@=;:+,?',
      'bucket/path/%26%24%40%3D%3B%3A%2B%2C%3F',
    ],
  ])('encodes the source path that is %s', (_, sourcePath, expectedPath) => {
    copyHandler({
      ...baseInput,
      data: {
        ...baseInput.data,
        key: sourcePath,
      },
    });

    const expected = expect.objectContaining({
      source: expect.objectContaining({
        path: expectedPath,
      }),
    });

    expect(copySpy).toHaveBeenCalledWith(expected);
  });
});
