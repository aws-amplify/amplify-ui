import * as Storage from 'aws-amplify/storage';

import { UploadFileProps, uploadFile } from '../uploadFile';

const imageFile = new File(['hello'], 'hello.png', { type: 'image/png' });
const key = imageFile.name;
const file = imageFile;

const errorCallback = jest.fn();
const completeCallback = jest.fn();
const progressCallback = jest.fn();

const defaultProps: UploadFileProps = {
  file,
  key,
  level: 'guest',
  progressCallback,
  errorCallback,
  completeCallback,
};

const uploadDataOutput: Storage.UploadDataOutput = {
  cancel: jest.fn(),
  pause: jest.fn(),
  resume: jest.fn(),
  state: 'SUCCESS',
  // @ts-expect-error remove this once StorageManager types are fixed
  result: Promise.resolve({
    key: defaultProps.key,
    data: defaultProps.data,
  }),
};

const uploadDataSpy = jest
  .spyOn(Storage, 'uploadData')
  .mockReturnValue(uploadDataOutput);

describe('uploadFile', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    uploadDataSpy.mockReturnValue(uploadDataOutput);
  });

  it('uploads a file with default options', async () => {
    const { result } = uploadFile(defaultProps);

    await result;

    expect(uploadDataSpy).toHaveBeenCalledWith({
      key,
      data: file,
      options: {
        accessLevel: 'guest',
        contentType: imageFile.type,
        onProgress: expect.any(Function),
      },
    });

    expect(completeCallback).toHaveBeenCalledWith({ key });
    expect(errorCallback).not.toHaveBeenCalled();
  });

  it('calls errorCallback on upload error', async () => {
    uploadDataSpy.mockReturnValueOnce({
      ...uploadDataOutput,
      result: Promise.reject(new Error('Error')),
      state: 'ERROR',
    });

    const { result } = uploadFile(defaultProps);

    await expect(result).rejects.toThrow();
    expect(progressCallback).not.toHaveBeenCalled();
    expect(errorCallback).toHaveBeenCalledTimes(1);
    expect(errorCallback).toHaveBeenCalledWith('Error');
    expect(completeCallback).not.toHaveBeenCalled();
  });

  it('calls uploadFile with contentType binary/octet-stream when file.type is undefined', () => {
    const imageFileTypeUndefined = new File(['hello2'], 'hello2.png', {
      type: undefined,
    });

    uploadFile({
      ...defaultProps,
      file: imageFileTypeUndefined,
      key: imageFileTypeUndefined.name,
    });

    expect(uploadDataSpy).toHaveBeenCalledWith({
      data: imageFileTypeUndefined,
      key: imageFileTypeUndefined.name,
      options: {
        accessLevel: 'guest',
        onProgress: expect.any(Function),
        contentType: 'binary/octet-stream',
      },
    });
  });

  it('passes other options to uploadData', () => {
    uploadFile({
      ...defaultProps,
      contentDisposition: 'attachment',
      metadata: { foo: 'bar' },
    });

    expect(uploadDataSpy).toHaveBeenCalledWith({
      data: imageFile,
      key: imageFile.name,
      options: {
        accessLevel: 'guest',
        onProgress: expect.any(Function),
        contentType: 'image/png',
        contentDisposition: 'attachment',
        metadata: { foo: 'bar' },
      },
    });
  });
});
