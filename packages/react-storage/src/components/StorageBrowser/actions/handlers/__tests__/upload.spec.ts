import * as InternalStorageModule from '../../../storage-internal';
import * as StorageModule from 'aws-amplify/storage';

import {
  MULTIPART_UPLOAD_THRESHOLD_BYTES,
  uploadHandler,
  UploadHandlerInput,
  UNDEFINED_CALLBACKS,
} from '../upload';

const isCancelErrorSpy = jest.spyOn(StorageModule, 'isCancelError');
const uploadDataSpy = jest.spyOn(InternalStorageModule, 'uploadData');

const credentials = jest.fn();

const config: UploadHandlerInput['config'] = {
  accountId: '012345678901',
  bucket: 'bucket',
  credentials,
  customEndpoint: 'mock-endpoint',
  region: 'region',
};

const file = new File([], 'test-o');

const onProgress = jest.fn();

const baseInput: UploadHandlerInput = {
  config,
  data: { key: `'prefix/'${file.name}`, id: 'an-id', file },
};

const cancel = jest.fn();
const pause = jest.fn();
const resume = jest.fn();

const error = new Error('Failed!');

describe('uploadHandler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('behaves as expected in the happy path', async () => {
    uploadDataSpy.mockReturnValueOnce({
      cancel,
      pause,
      resume,
      result: Promise.resolve({ path: file.name }),
      state: 'SUCCESS',
    });

    const { result } = uploadHandler(baseInput);

    expect(await result).toStrictEqual({ status: 'COMPLETE' });
  });

  it('calls upload with the expected values', () => {
    uploadHandler({ ...baseInput, options: { preventOverwrite: true } });

    const expected: InternalStorageModule.UploadDataInput = {
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

    expect(uploadDataSpy).toHaveBeenCalledWith(expected);
  });

  it('calls provided onProgress callback as expected in the happy path', async () => {
    uploadDataSpy.mockImplementation(({ options }) => {
      // @ts-expect-error - `options` is potentially `undefined` in the `uploadData` input interface
      options.onProgress({ totalBytes: 23, transferredBytes: 23 });

      return {
        cancel,
        pause,
        resume,
        result: Promise.resolve({ path: file.name }),
        state: 'SUCCESS',
      };
    });

    const { result } = uploadHandler({
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
        cancel,
        pause,
        resume,
        result: Promise.resolve({ path: file.name }),
        state: 'SUCCESS',
      };
    });

    const { result } = uploadHandler({
      ...baseInput,
      options: { onProgress },
    });

    expect(await result).toStrictEqual({ status: 'COMPLETE' });

    expect(onProgress).toHaveBeenCalledTimes(1);
    expect(onProgress).toHaveBeenCalledWith(baseInput.data, undefined);
  });

  it('returns the expected callback values for a file size greater than 5 mb', async () => {
    const bigFile = new File(
      [new ArrayBuffer(MULTIPART_UPLOAD_THRESHOLD_BYTES * 2)],
      '😅'
    );

    uploadDataSpy.mockReturnValueOnce({
      cancel,
      pause,
      resume,
      result: Promise.resolve({ path: file.name }),
      state: 'SUCCESS',
    });

    const { result, ...callbacks } = uploadHandler({
      ...baseInput,
      data: { key: bigFile.name, id: 'hi!', file: bigFile },
    });

    expect(await result).toStrictEqual({ status: 'COMPLETE' });

    expect(callbacks).toStrictEqual({ cancel, pause, resume });
  });

  it('returns undefined callback values for a file size less than 5 mb', async () => {
    const smallFile = new File([], '😅');

    uploadDataSpy.mockReturnValueOnce({
      cancel,
      pause,
      resume,
      result: Promise.resolve({ path: file.name }),
      state: 'SUCCESS',
    });

    const { result, ...callbacks } = uploadHandler({
      ...baseInput,
      data: { key: smallFile.name, id: 'ohh', file: smallFile },
    });

    expect(await result).toStrictEqual({ status: 'COMPLETE' });

    expect(callbacks).toStrictEqual(UNDEFINED_CALLBACKS);
  });

  it('handles a failure as expected', async () => {
    uploadDataSpy.mockReturnValueOnce({
      cancel,
      pause,
      resume,
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
    isCancelErrorSpy.mockReturnValue(true);
    uploadDataSpy.mockReturnValueOnce({
      cancel,
      pause,
      resume,
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

    uploadDataSpy.mockReturnValueOnce({
      cancel,
      pause,
      resume,
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
