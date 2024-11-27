import { remove, RemoveInput } from '../../../storage-internal';

import { deleteHandler, DeleteHandlerInput } from '../delete';

jest.mock('../../../storage-internal');

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
  const mockRemove = jest.mocked(remove);

  beforeEach(() => {
    mockRemove.mockResolvedValue({ path: '' });
  });

  afterEach(() => {
    mockRemove.mockReset();
  });

  it('calls `remove` and returns the expected `key`', () => {
    deleteHandler(baseInput);

    const expected: RemoveInput = {
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

    expect(mockRemove).toHaveBeenCalledWith(expected);
  });

  it('returns a complete status', async () => {
    const { result } = deleteHandler(baseInput);

    expect(await result).toEqual({ status: 'COMPLETE' });
  });

  it('returns failed status', async () => {
    const errorMessage = 'error-message';
    mockRemove.mockRejectedValue(new Error(errorMessage));
    const { result } = deleteHandler(baseInput);

    expect(await result).toEqual({
      status: 'FAILED',
      message: errorMessage,
    });
  });
});
