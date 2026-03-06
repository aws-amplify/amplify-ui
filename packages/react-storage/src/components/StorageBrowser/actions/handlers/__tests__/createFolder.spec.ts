import { createFolderHandler, CreateFolderHandlerInput } from '../createFolder';

import { uploadData, UploadDataInput } from '../../../storage-internal';
import { DEFAULT_CHECKSUM_ALGORITHM } from '../constants';

jest.mock('../../../storage-internal');

const credentials = jest.fn();

const config: CreateFolderHandlerInput['config'] = {
  accountId: '012345678901',
  bucket: 'bucket',
  credentials,
  customEndpoint: 'mock-endpoint',
  region: 'region',
};

const onProgress = jest.fn();

const baseInput: CreateFolderHandlerInput = {
  config,
  data: { key: 'prefix/', id: 'an-id' },
  all: [{ key: 'prefix/', id: 'an-id' }],
};

describe('createFolderHandler', () => {
  const path = 'path';
  const mockUploadDataReturnValue = {
    cancel: jest.fn(),
    pause: jest.fn(),
    resume: jest.fn(),
    result: Promise.resolve({ path }),
    state: 'SUCCESS' as const,
  };
  const mockUploadData = jest.mocked(uploadData);

  beforeEach(() => {
    jest.clearAllMocks();
    mockUploadData.mockReturnValue(mockUploadDataReturnValue);
  });

  afterEach(() => {
    mockUploadData.mockReset();
  });

  beforeEach(() => {});

  it('behaves as expected in the happy path', async () => {
    const { result } = createFolderHandler(baseInput);

    expect(await result).toStrictEqual({
      status: 'COMPLETE',
      value: { key: path },
    });
  });

  it('calls `uploadData` with the expected values', () => {
    createFolderHandler({
      ...baseInput,
      data: { ...baseInput.data, preventOverwrite: true },
    });

    const expected: UploadDataInput = {
      data: '',
      options: {
        expectedBucketOwner: config.accountId,
        bucket: {
          bucketName: config.bucket,
          region: config.region,
        },
        customEndpoint: config.customEndpoint,
        locationCredentialsProvider: credentials,
        onProgress: expect.any(Function),
        preventOverwrite: true,
        checksumAlgorithm: DEFAULT_CHECKSUM_ALGORITHM,
      },
      path: baseInput.data.key,
    };

    expect(mockUploadData).toHaveBeenCalledWith(expected);
  });

  it('calls provided onProgress callback as expected in the happy path', async () => {
    mockUploadData.mockImplementation(({ options }) => {
      options?.onProgress?.({ totalBytes: 23, transferredBytes: 23 });

      return mockUploadDataReturnValue;
    });

    const { result } = createFolderHandler({
      ...baseInput,
      options: { onProgress },
    });

    expect(await result).toStrictEqual({
      status: 'COMPLETE',
      value: { key: path },
    });

    expect(onProgress).toHaveBeenCalledTimes(1);
    expect(onProgress).toHaveBeenCalledWith(baseInput.data, 1);
  });

  it('calls provided onProgress callback as expected when `totalBytes` is `undefined`', async () => {
    mockUploadData.mockImplementation(({ options }) => {
      options?.onProgress?.({ transferredBytes: 23 });

      return mockUploadDataReturnValue;
    });

    const { result } = createFolderHandler({
      ...baseInput,
      options: { onProgress },
    });

    expect(await result).toStrictEqual({
      status: 'COMPLETE',
      value: { key: path },
    });

    expect(onProgress).toHaveBeenCalledTimes(1);
    expect(onProgress).toHaveBeenCalledWith(baseInput.data, undefined);
  });

  it('handles a failure as expected', async () => {
    const error = new Error('No new folder!');

    mockUploadData.mockReturnValue({
      ...mockUploadDataReturnValue,
      result: Promise.reject(error),
      state: 'ERROR',
    });

    const { result } = createFolderHandler(baseInput);

    expect(await result).toStrictEqual({
      error,
      message: error.message,
      status: 'FAILED',
    });
  });

  it('returns "OVERWRITE_PREVENTED" on `PreconditionFailed` error', async () => {
    const error = new Error('No overwrite!');
    error.name = 'PreconditionFailed';

    mockUploadData.mockReturnValue({
      ...mockUploadDataReturnValue,
      result: Promise.reject(error),
      state: 'ERROR',
    });

    const { result } = createFolderHandler(baseInput);

    expect(await result).toStrictEqual({
      error,
      message: error.message,
      status: 'OVERWRITE_PREVENTED',
    });
  });
});
