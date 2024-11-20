import { createFolderHandler, CreateFolderHandlerInput } from '../createFolder';

import * as InternalStorageModule from '../../../storage-internal';

const uploadDataSpy = jest.spyOn(InternalStorageModule, 'uploadData');

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
};

const error = new Error('Failed!');

describe('createFolderHandler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('behaves as expected in the happy path', async () => {
    uploadDataSpy.mockReturnValueOnce({
      cancel: jest.fn(),
      pause: jest.fn(),
      resume: jest.fn(),
      result: Promise.resolve({ path: '' }),
      state: 'SUCCESS',
    });

    const { result } = createFolderHandler(baseInput);

    expect(await result).toStrictEqual({ status: 'COMPLETE' });
  });

  it('calls `uploadData` with the expected values', () => {
    createFolderHandler({ ...baseInput, options: { preventOverwrite: true } });

    const expected: InternalStorageModule.UploadDataInput = {
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
      path: baseInput.data.key,
    };

    expect(uploadDataSpy).toHaveBeenCalledWith(expected);
  });

  it('calls provided onProgress callback as expected in the happy path', async () => {
    uploadDataSpy.mockImplementation(({ options }) => {
      // @ts-expect-error - `options` is potentially `undefined` in the `uploadData` input interface
      options.onProgress({ totalBytes: 23, transferredBytes: 23 });

      return {
        cancel: jest.fn(),
        pause: jest.fn(),
        resume: jest.fn(),
        result: Promise.resolve({ path: '' }),
        state: 'SUCCESS',
      };
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
    uploadDataSpy.mockImplementation(({ options }) => {
      // @ts-expect-error - `options` is potentially `undefined` in the `uploadData` input interface
      options.onProgress({ transferredBytes: 23 });

      return {
        cancel: jest.fn(),
        pause: jest.fn(),
        resume: jest.fn(),
        result: Promise.resolve({ path: '' }),
        state: 'SUCCESS',
      };
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
    uploadDataSpy.mockReturnValueOnce({
      cancel: jest.fn(),
      pause: jest.fn(),
      resume: jest.fn(),
      result: Promise.reject(error),
      state: 'ERROR',
    });

    const { result } = createFolderHandler(baseInput);

    expect(await result).toStrictEqual({
      message: error.message,
      status: 'FAILED',
    });
  });

  it('returns "OVERWRITE_PREVENTED" on `PreconditionFailed` error', async () => {
    const message = 'No overwrite!';
    const overwritePreventedError = new Error(message);
    overwritePreventedError.name = 'PreconditionFailed';

    uploadDataSpy.mockReturnValueOnce({
      cancel: jest.fn(),
      pause: jest.fn(),
      resume: jest.fn(),
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
