import { uploadData, UploadDataInput } from '../../../storage-internal';
import { isCancelError } from 'aws-amplify/storage';

import {
  MULTIPART_UPLOAD_THRESHOLD_BYTES,
  uploadHandler,
  UploadHandlerInput,
  UNDEFINED_CALLBACKS,
} from '../upload';

jest.mock('aws-amplify/storage');
jest.mock('../../../storage-internal');

const credentials = jest.fn();

const config: UploadHandlerInput['config'] = {
  accountId: '012345678901',
  bucket: 'bucket',
  credentials,
  customEndpoint: 'mock-endpoint',
  region: 'region',
};

const file = new File([], 'test-o');

const baseInput: UploadHandlerInput = {
  config,
  data: { key: `'prefix/'${file.name}`, id: 'an-id', file },
};

const error = new Error('Failed!');

describe('uploadHandler', () => {
  const mockUploadDataReturnValue = {
    cancel: jest.fn(),
    pause: jest.fn(),
    resume: jest.fn(),
    result: Promise.resolve({ path: file.name }),
    state: 'SUCCESS' as const,
  };
  const mockIsCancelError = jest.mocked(isCancelError);
  const mockUploadData = jest.mocked(uploadData);
  const mockOnProgress = jest.fn();

  beforeEach(() => {
    mockUploadData.mockReturnValue(mockUploadDataReturnValue);
  });

  afterEach(() => {
    mockOnProgress.mockClear();
    mockIsCancelError.mockReset();
    mockUploadData.mockReset();
  });

  it('behaves as expected in the happy path', async () => {
    const { result } = uploadHandler(baseInput);

    expect(await result).toStrictEqual({ status: 'COMPLETE' });
  });

  it('calls upload with the expected values', () => {
    uploadHandler({ ...baseInput, options: { preventOverwrite: true } });

    const expected: UploadDataInput = {
      data: file,
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
        checksumAlgorithm: 'crc-32',
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

    const { result } = uploadHandler({
      ...baseInput,
      options: { onProgress: mockOnProgress },
    });

    expect(await result).toStrictEqual({ status: 'COMPLETE' });

    expect(mockOnProgress).toHaveBeenCalledTimes(1);
    expect(mockOnProgress).toHaveBeenCalledWith(baseInput.data, 1);
  });

  it('calls provided onProgress callback as expected when `totalBytes` is `undefined`', async () => {
    mockUploadData.mockImplementation(({ options }) => {
      options?.onProgress?.({ transferredBytes: 23 });

      return mockUploadDataReturnValue;
    });

    const { result } = uploadHandler({
      ...baseInput,
      options: { onProgress: mockOnProgress },
    });

    expect(await result).toStrictEqual({ status: 'COMPLETE' });

    expect(mockOnProgress).toHaveBeenCalledTimes(1);
    expect(mockOnProgress).toHaveBeenCalledWith(baseInput.data, undefined);
  });

  it('returns the expected callback values for a file size greater than 5 mb', async () => {
    const bigFile = new File(
      [new ArrayBuffer(MULTIPART_UPLOAD_THRESHOLD_BYTES * 2)],
      '😅'
    );

    const { result, ...callbacks } = uploadHandler({
      ...baseInput,
      data: { key: bigFile.name, id: 'hi!', file: bigFile },
    });

    expect(await result).toStrictEqual({ status: 'COMPLETE' });

    expect(callbacks).toStrictEqual({
      cancel: expect.any(Function),
      pause: expect.any(Function),
      resume: expect.any(Function),
    });
  });

  it('returns undefined callback values for a file size less than 5 mb', async () => {
    const smallFile = new File([], '😅');

    const { result, ...callbacks } = uploadHandler({
      ...baseInput,
      data: { key: smallFile.name, id: 'ohh', file: smallFile },
    });

    expect(await result).toStrictEqual({ status: 'COMPLETE' });

    expect(callbacks).toStrictEqual(UNDEFINED_CALLBACKS);
  });

  it('handles a failure as expected', async () => {
    mockUploadData.mockReturnValue({
      ...mockUploadDataReturnValue,
      result: Promise.reject(error),
      state: 'ERROR',
    });

    const { result } = uploadHandler(baseInput);

    expect(await result).toStrictEqual({
      message: error.message,
      status: 'FAILED',
    });
  });

  it('handles a cancel failure as expected', async () => {
    // turn off console.warn in test output
    jest.spyOn(console, 'warn').mockReturnValueOnce();
    mockIsCancelError.mockReturnValue(true);
    mockUploadData.mockReturnValue({
      ...mockUploadDataReturnValue,
      result: Promise.reject(error),
      state: 'ERROR',
    });

    const { result } = uploadHandler(baseInput);

    expect(await result).toStrictEqual({
      message: 'Failed!',
      status: 'CANCELED',
    });
  });

  it('handles an overwrite failure as expected', async () => {
    const preconditionError = new Error('Failed!');
    preconditionError.name = 'PreconditionFailed';

    mockUploadData.mockReturnValue({
      ...mockUploadDataReturnValue,
      result: Promise.reject(preconditionError),
      state: 'ERROR',
    });

    const { result } = uploadHandler({
      ...baseInput,
      options: { preventOverwrite: true },
    });

    expect(await result).toStrictEqual({
      message: 'Failed!',
      status: 'OVERWRITE_PREVENTED',
    });
  });
});
