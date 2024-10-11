import * as Storage from 'aws-amplify/storage';

import { UploadFileProps, uploadFile } from '../uploadFile';

const imageFile = new File(['hello'], 'hello.png', { type: 'image/png' });
const key = imageFile.name;
const data = imageFile;

const onError = jest.fn();
const onComplete = jest.fn();
const onProgress = jest.fn();

const uploadDataSpy = jest.spyOn(Storage, 'uploadData');

describe('uploadFile', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('behaves as expected with an accessLevel provided in the input', async () => {
    const uploadDataOutput: Storage.UploadDataOutput = {
      cancel: jest.fn(),
      pause: jest.fn(),
      resume: jest.fn(),
      state: 'SUCCESS',
      result: Promise.resolve({ key, data }),
    };

    uploadDataSpy.mockReturnValueOnce(uploadDataOutput);
    const input: UploadFileProps['input'] = () =>
      Promise.resolve({
        data,
        key,
        options: {
          accessLevel: 'guest',
          contentType: 'image/png',
          onProgress,
        },
      });
    const { result } = await uploadFile({ input, onComplete });

    await result;

    expect(uploadDataSpy).toHaveBeenCalledWith({
      data,
      key,
      options: {
        accessLevel: 'guest',
        contentType: imageFile.type,
        onProgress: expect.any(Function),
      },
    });

    expect(onComplete).toHaveBeenCalledWith({ key, data });
    expect(onError).not.toHaveBeenCalled();
  });

  it('behaves as expected without an accessLevel provided in the input', async () => {
    const path = `my-path/${key}`;
    const uploadDataPathOutput: Storage.UploadDataWithPathOutput = {
      cancel: jest.fn(),
      pause: jest.fn(),
      resume: jest.fn(),
      state: 'SUCCESS',
      result: Promise.resolve({ path, data }),
    };
    // @ts-expect-error amplify storage doesn't expose the base overload of `uploadData`
    uploadDataSpy.mockReturnValueOnce(uploadDataPathOutput);
    const input: UploadFileProps['input'] = () =>
      Promise.resolve({
        data,
        path,
        options: { contentType: 'image/png', onProgress },
      });
    const { result } = await uploadFile({
      input,
      onComplete,
    });

    await result;

    expect(uploadDataSpy).toHaveBeenCalledWith({
      data,
      options: {
        contentType: imageFile.type,
        onProgress: expect.any(Function),
      },
      path,
    });

    expect(onComplete).toHaveBeenCalledWith({ path, data });
    expect(onError).not.toHaveBeenCalled();
  });

  it('calls onStart as expected', async () => {
    const onStart = jest.fn();
    const uploadDataOutput: Storage.UploadDataOutput = {
      cancel: jest.fn(),
      pause: jest.fn(),
      resume: jest.fn(),
      state: 'SUCCESS',
      result: Promise.resolve({ key, data }),
    };

    uploadDataSpy.mockReturnValueOnce(uploadDataOutput);
    const input: UploadFileProps['input'] = () =>
      Promise.resolve({
        data,
        key,
        options: {
          accessLevel: 'guest',
          contentType: 'image/png',
          onProgress,
        },
      });
    const { result } = await uploadFile({ input, onComplete, onStart });

    await result;

    expect(uploadDataSpy).toHaveBeenCalledWith({
      data,
      key,
      options: {
        accessLevel: 'guest',
        contentType: imageFile.type,
        onProgress: expect.any(Function),
      },
    });

    expect(onStart).toHaveBeenCalledWith({ key, uploadTask: uploadDataOutput });
  });

  it('calls errorCallback on upload error', async () => {
    const error = new Error('Error');
    uploadDataSpy.mockReturnValueOnce({
      cancel: jest.fn(),
      pause: jest.fn(),
      resume: jest.fn(),
      result: Promise.reject(error),
      state: 'ERROR',
    });

    const input: UploadFileProps['input'] = () =>
      Promise.resolve({
        data,
        key,
        options: {
          accessLevel: 'guest',
          contentType: 'image/png',
          onProgress,
        },
      });
    const { result } = await uploadFile({ input, onComplete, onError });

    await expect(result).rejects.toThrow();
    expect(onProgress).not.toHaveBeenCalled();
    expect(onError).toHaveBeenCalledTimes(1);
    expect(onError).toHaveBeenCalledWith({ error, key });
    expect(onComplete).not.toHaveBeenCalled();
  });
});
