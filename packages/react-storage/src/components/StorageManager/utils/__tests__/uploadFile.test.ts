import { setImmediate } from 'timers';
import * as Storage from 'aws-amplify/storage';

import { UploadFileProps, uploadFile } from '../uploadFile';

const uploadDataSpy = jest.spyOn(Storage, 'uploadData');
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

const flushPromises = () => new Promise(setImmediate);

describe('uploadFile', () => {
  beforeEach(() => {
    uploadDataSpy.mockClear();
    jest.resetAllMocks();
  });

  it('uploads a file with default options', async () => {
    uploadDataSpy.mockImplementationOnce((input: Storage.UploadDataInput) => {
      return {
        cancel: jest.fn(),
        pause: jest.fn(),
        resume: jest.fn(),
        state: 'SUCCESS',
        result: Promise.resolve({ key: input.key, data: input.data }),
      };
    });
    uploadFile(defaultProps);

    expect(uploadDataSpy).toHaveBeenCalledWith({
      key,
      data: file,
      options: {
        accessLevel: 'guest',
        contentType: imageFile.type,
        onProgress: expect.any(Function),
      },
    });

    await flushPromises();

    expect(completeCallback).toHaveBeenCalledWith({ key });
    expect(errorCallback).not.toHaveBeenCalled();
  });

  it('calls errorCallback on upload error', async () => {
    const errorMessage = new Error('Error');
    uploadDataSpy.mockImplementationOnce(() => {
      return {
        cancel: jest.fn(),
        pause: jest.fn(),
        resume: jest.fn(),
        state: 'ERROR',
        result: Promise.reject(errorMessage),
      };
    });

    uploadFile(defaultProps);

    await flushPromises();

    expect(progressCallback).not.toHaveBeenCalled();
    expect(errorCallback).toHaveBeenCalledWith('Error');
    expect(completeCallback).not.toHaveBeenCalled();
  });

  it('calls uploadFile with contentType binary/octet-stream when file.type is undefined', () => {
    uploadDataSpy.mockImplementationOnce((input: Storage.UploadDataInput) => {
      return {
        cancel: jest.fn(),
        pause: jest.fn(),
        resume: jest.fn(),
        state: 'SUCCESS',
        result: Promise.resolve({ key: input.key, data: input.data }),
      };
    });
    const imageFileTypeUndefined = new File(['hello2'], 'hello2.png', {
      type: undefined,
    });

    uploadFile({
      ...defaultProps,
      file: imageFileTypeUndefined,
      key: imageFileTypeUndefined.name,
    });

    expect(uploadDataSpy).toBeCalledWith({
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
    uploadDataSpy.mockImplementationOnce((input: Storage.UploadDataInput) => {
      return {
        cancel: jest.fn(),
        pause: jest.fn(),
        resume: jest.fn(),
        state: 'SUCCESS',
        result: Promise.resolve({ key: input.key, data: input.data }),
      };
    });
    uploadFile({
      ...defaultProps,
      contentDisposition: 'attachment',
      metadata: {
        foo: 'bar',
      },
    });

    expect(uploadDataSpy).toBeCalledWith({
      data: imageFile,
      key: imageFile.name,
      options: {
        accessLevel: 'guest',
        onProgress: expect.any(Function),
        contentType: 'image/png',
        contentDisposition: 'attachment',
        metadata: {
          foo: 'bar',
        },
      },
    });
  });
});
