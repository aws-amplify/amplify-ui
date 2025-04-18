import { copy, CopyInput } from '../../../storage-internal';
import { copyHandler, CopyHandlerInput } from '../copy';

jest.mock('../../../storage-internal');

const baseInput: CopyHandlerInput = {
  config: {
    accountId: '012345678901',
    bucket: 'bucket',
    credentials: jest.fn(),
    customEndpoint: 'mock-endpoint',
    region: 'region',
  },
  data: {
    id: 'identity',
    key: 'destination/some-prefixfix/some-key.hehe',
    sourceKey: 'some-prefixfix/some-key.hehe',
    fileKey: 'some-key.hehe',
    lastModified: new Date(),
    size: 100,
    type: 'FILE',
  },
};

describe('copyHandler', () => {
  const path = 'path';

  const mockCopy = jest.mocked(copy);

  beforeEach(() => {
    mockCopy.mockResolvedValue({ path });
  });

  afterEach(() => {
    mockCopy.mockReset();
  });

  it('calls `copy` wth the expected values', () => {
    copyHandler(baseInput);

    const bucket = {
      bucketName: baseInput.config.bucket,
      region: baseInput.config.region,
    };

    const expected: CopyInput = {
      destination: {
        expectedBucketOwner: baseInput.config.accountId,
        bucket,
        path: baseInput.data.key,
      },
      source: {
        expectedBucketOwner: baseInput.config.accountId,
        bucket,
        path: baseInput.data.sourceKey,
        eTag: baseInput.data.eTag,
        notModifiedSince: baseInput.data.lastModified,
      },
      options: {
        locationCredentialsProvider: baseInput.config.credentials,
        customEndpoint: baseInput.config.customEndpoint,
      },
    };

    expect(mockCopy).toHaveBeenCalledWith(expected);
  });

  it('provides eTag and notModifiedSince to copy for durableness', () => {
    copyHandler(baseInput);

    const bucket = {
      bucketName: `${baseInput.config.bucket}`,
      region: `${baseInput.config.region}`,
    };

    const copyInput = mockCopy.mock.lastCall?.[0];
    expect(copyInput).toHaveProperty('source', {
      expectedBucketOwner: `${baseInput.config.accountId}`,
      bucket,
      path: baseInput.data.sourceKey,
      eTag: baseInput.data.eTag,
      notModifiedSince: baseInput.data.lastModified,
    });
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
      data: { ...baseInput.data, sourceKey: sourcePath },
    });

    const expected = expect.objectContaining({
      source: expect.objectContaining({
        path: expectedPath,
      }),
    });

    expect(mockCopy).toHaveBeenCalledWith(expected);
  });

  it('returns a complete status', async () => {
    const { result } = copyHandler(baseInput);

    expect(await result).toEqual({ status: 'COMPLETE', value: { key: path } });
  });

  it('returns failed status', async () => {
    const error = new Error('No copy!');

    mockCopy.mockRejectedValue(error);
    const { result } = copyHandler(baseInput);

    expect(await result).toEqual({
      error,
      message: error.message,
      status: 'FAILED',
    });
  });
});
