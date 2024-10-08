import * as StorageModule from 'aws-amplify/storage';

import {
  MULTIPART_UPLOAD_THRESHOLD_BYTES,
  uploadHandler,
  UploadHandlerInput,
} from '../upload';

const isCancelErrorSpy = jest.spyOn(StorageModule, 'isCancelError');
const uploadDataSpy = jest.spyOn(StorageModule, 'uploadData');

const credentials = jest.fn();

const config: UploadHandlerInput['config'] = {
  accountId: 'accountId',
  bucket: 'bucket',
  credentials,
  region: 'region',
};

const data = new File([], 'test-o');
const prefix = 'prefix';

const onCancel = jest.fn();
const onComplete = jest.fn();
const onError = jest.fn();
const onProgress = jest.fn();

const baseInput: UploadHandlerInput = {
  config,
  data,
  prefix,
  key: data.name,
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
      result: Promise.resolve({ key: data.name }),
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

    const expected: StorageModule.UploadDataWithPathInput = {
      data,
      options: {
        bucket: {
          bucketName: config.bucket,
          region: config.region,
        },
        locationCredentialsProvider: credentials,
        onProgress: expect.any(Function),
        preventOverwrite: true,
      },
      path: `${prefix}${data.name}`,
    };

    expect(uploadDataSpy).toHaveBeenCalledWith(expected);
  });

  it('calls provided onProgress callback as expected in the happy path', async () => {
    uploadDataSpy.mockImplementation(({ options }) => {
      // @ts-expect-error
      options.onProgress({ totalBytes: 23, transferredBytes: 23 });

      return {
        cancel,
        pause,
        resume,
        result: Promise.resolve({ key: data.name }),
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
      // @ts-expect-error
      options.onProgress({ transferredBytes: 23 });

      return {
        cancel,
        pause,
        resume,
        result: Promise.resolve({ key: data.name }),
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
    const bigData = new File(
      [new ArrayBuffer(MULTIPART_UPLOAD_THRESHOLD_BYTES * 2)],
      '😅'
    );

    uploadDataSpy.mockReturnValueOnce({
      cancel,
      pause,
      resume,
      result: Promise.resolve({ key: data.name }),
      state: 'SUCCESS',
    });

    const { key, result, ...callbacks } = uploadHandler({
      ...baseInput,
      key: bigData.name,
      data: bigData,
    });

    expect(await result).toBe('COMPLETE');

    expect(key).toBe(bigData.name);
    expect(callbacks).toStrictEqual({ cancel, pause, resume });
  });

  it('returns undefined callback values for a file size less than 5 mb', async () => {
    const smallData = new File([], '😅');

    uploadDataSpy.mockReturnValueOnce({
      cancel,
      pause,
      resume,
      result: Promise.resolve({ key: data.name }),
      state: 'SUCCESS',
    });

    const { key, result, ...callbacks } = uploadHandler({
      ...baseInput,
      key: smallData.name,
      data: smallData,
    });

    expect(await result).toBe('COMPLETE');

    expect(key).toBe(smallData.name);
    expect(callbacks).toStrictEqual({
      cancel: undefined,
      pause: undefined,
      resume: undefined,
    });
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
