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
  region: 'region',
};

const payload = new File([], 'test-o');
const prefix = 'prefix';

const onCancel = jest.fn();
const onComplete = jest.fn();
const onError = jest.fn();
const onProgress = jest.fn();

const baseInput: UploadHandlerInput = {
  config,
  key: payload.name,
  data: { id: 'an-id', payload },
  prefix,
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
      result: Promise.resolve({ path: payload.name }),
      state: 'SUCCESS',
    });

    const { key, result } = uploadHandler({
      ...baseInput,
      options: { onComplete },
    });

    expect(await result).toBe('COMPLETE');

    expect(key).toBe(baseInput.key);
    expect(onComplete).toHaveBeenCalledTimes(1);
    expect(onComplete).toHaveBeenCalledWith(baseInput.key);
  });

  it('calls upload with the expected values', () => {
    uploadHandler({ ...baseInput, options: { preventOverwrite: true } });

    const expected: InternalStorageModule.UploadDataInput = {
      data: payload,
      options: {
        expectedBucketOwner: config.accountId,
        bucket: {
          bucketName: config.bucket,
          region: config.region,
        },
        locationCredentialsProvider: credentials,
        onProgress: expect.any(Function),
        preventOverwrite: true,
      },
      path: `${prefix}${payload.name}`,
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
        result: Promise.resolve({ path: payload.name }),
        state: 'SUCCESS',
      };
    });

    const { key, result } = uploadHandler({
      ...baseInput,
      options: { onProgress },
    });

    expect(await result).toBe('COMPLETE');

    expect(key).toBe(baseInput.key);
    expect(onProgress).toHaveBeenCalledTimes(1);
    expect(onProgress).toHaveBeenCalledWith(baseInput.key, 1);
  });

  it('calls provided onProgress callback as expected when `totalBytes` is `undefined`', async () => {
    uploadDataSpy.mockImplementation(({ options }) => {
      // @ts-expect-error - `options` is potentially `undefined` in the `uploadData` input interface
      options.onProgress({ transferredBytes: 23 });

      return {
        cancel,
        pause,
        resume,
        result: Promise.resolve({ path: payload.name }),
        state: 'SUCCESS',
      };
    });

    const { key, result } = uploadHandler({
      ...baseInput,
      options: { onProgress },
    });

    expect(await result).toBe('COMPLETE');

    expect(key).toBe(baseInput.key);
    expect(onProgress).toHaveBeenCalledTimes(1);
    expect(onProgress).toHaveBeenCalledWith(baseInput.key, undefined);
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
      result: Promise.resolve({ path: payload.name }),
      state: 'SUCCESS',
    });

    const { key, result, ...callbacks } = uploadHandler({
      ...baseInput,
      key: bigFile.name,
      data: { id: 'hi!', payload: bigFile },
    });

    expect(await result).toBe('COMPLETE');

    expect(key).toBe(bigFile.name);
    expect(callbacks).toStrictEqual({ cancel, pause, resume });
  });

  it('returns undefined callback values for a file size less than 5 mb', async () => {
    const smallFile = new File([], '😅');

    uploadDataSpy.mockReturnValueOnce({
      cancel,
      pause,
      resume,
      result: Promise.resolve({ path: payload.name }),
      state: 'SUCCESS',
    });

    const { key, result, ...callbacks } = uploadHandler({
      ...baseInput,
      key: smallFile.name,
      data: { id: 'ohh', payload: smallFile },
    });

    expect(await result).toBe('COMPLETE');

    expect(key).toBe(smallFile.name);
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

    const { result } = uploadHandler({ ...baseInput, options: { onError } });

    expect(await result).toBe('FAILED');

    expect(onError).toHaveBeenCalledTimes(1);
    expect(onError).toHaveBeenCalledWith(baseInput.key, error.message);
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

    const { result } = uploadHandler({ ...baseInput, options: { onCancel } });

    expect(await result).toBe('CANCELED');

    expect(onCancel).toHaveBeenCalledTimes(1);
    expect(onCancel).toHaveBeenCalledWith(baseInput.key);
  });
});
