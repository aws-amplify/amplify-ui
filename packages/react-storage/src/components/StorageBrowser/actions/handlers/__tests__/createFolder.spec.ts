import { createFolderHandler, CreateFolderHandlerInput } from '../createFolder';

import { uploadData, UploadDataInput } from '../../../storage-internal';

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
  data: { key: '', id: 'an-id' },
  destinationPrefix: 'prefix/',
};

describe('createFolderHandler', () => {
  const mockUploadDataReturnValue = {
    cancel: jest.fn(),
    pause: jest.fn(),
    resume: jest.fn(),
    result: Promise.resolve({ path: '' }),
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

    expect(await result).toStrictEqual({ status: 'COMPLETE' });
  });

  it('calls `uploadData` with the expected values', () => {
    createFolderHandler({ ...baseInput, options: { preventOverwrite: true } });

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
      },
      path: `${baseInput.destinationPrefix}${baseInput.data.key}`,
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

    expect(await result).toStrictEqual({ status: 'COMPLETE' });

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

    expect(await result).toStrictEqual({ status: 'COMPLETE' });

    expect(onProgress).toHaveBeenCalledTimes(1);
    expect(onProgress).toHaveBeenCalledWith(baseInput.data, undefined);
  });

  it('handles a failure as expected', async () => {
    const errorMessage = 'error-message';

    mockUploadData.mockReturnValue({
      ...mockUploadDataReturnValue,
      result: Promise.reject(new Error(errorMessage)),
      state: 'ERROR',
    });

    const { result } = createFolderHandler(baseInput);

    expect(await result).toStrictEqual({
      message: errorMessage,
      status: 'FAILED',
    });
  });

  it('returns "OVERWRITE_PREVENTED" on `PreconditionFailed` error', async () => {
    const message = 'No overwrite!';
    const overwritePreventedError = new Error(message);
    overwritePreventedError.name = 'PreconditionFailed';

    mockUploadData.mockReturnValue({
      ...mockUploadDataReturnValue,
      result: Promise.reject(overwritePreventedError),
      state: 'ERROR',
    });

    const { result } = createFolderHandler(baseInput);

    expect(await result).toStrictEqual({
      message,
      status: 'OVERWRITE_PREVENTED',
    });
  });
});
