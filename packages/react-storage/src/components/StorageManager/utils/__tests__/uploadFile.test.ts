import { uploadFile } from '../uploadFile';

import * as Storage from 'aws-amplify/storage';

const storageSpy = jest.spyOn(Storage, 'uploadData').mockImplementation();
const imageFile = new File(['hello'], 'hello.png', { type: 'image/png' });

describe('uploadfile', () => {
  beforeEach(() => {
    storageSpy.mockClear();
  });

  it('calls uploadData when isResumable is true', () => {
    const progressCallback = () => '';
    const errorCallback = () => '';
    const completeCallback = () => '';

    uploadFile({
      file: imageFile,
      key: imageFile.name,
      completeCallback,
      errorCallback,
      isResumable: true,
      level: 'guest',
      progressCallback,
    });

    expect(storageSpy).toBeCalledWith(imageFile.name, imageFile, {
      completeCallback,
      contentType: 'image/png',
      errorCallback,
      level: 'guest',
      progressCallback,
      resumable: true,
    });
  });

  it('calls uploadData when isResumable is false', () => {
    const progressCallback = () => '';
    uploadFile({
      file: imageFile,
      key: imageFile.name,
      level: 'guest',
      progressCallback: progressCallback,
      errorCallback: () => '',
      completeCallback: () => '',
      isResumable: false,
    });

    expect(storageSpy).toBeCalledWith(imageFile.name, imageFile, {
      level: 'guest',
      progressCallback: progressCallback,
      resumable: false,
      contentType: 'image/png',
    });
  });

  it('calls uploadFile with contentType defined image type', () => {
    uploadFile({
      file: imageFile,
      key: imageFile.name,
      level: 'guest',
      progressCallback: () => '',
      errorCallback: () => '',
      completeCallback: () => '',
      isResumable: false,
    });

    expect(storageSpy).toBeCalledWith(imageFile.name, imageFile, {
      level: 'guest',
      progressCallback: expect.any(Function),
      resumable: false,
      contentType: 'image/png',
    });
  });

  it('calls uploadFile with contentType binary/octet-stream when file.type is undefined', () => {
    const imageFileTypeUndefined = new File(['hello2'], 'hello2.png', {
      type: undefined,
    });

    uploadFile({
      file: imageFileTypeUndefined,
      key: imageFileTypeUndefined.name,
      level: 'guest',
      progressCallback: () => '',
      errorCallback: () => '',
      completeCallback: () => '',
      isResumable: false,
    });

    expect(storageSpy).toBeCalledWith(
      imageFileTypeUndefined.name,
      imageFileTypeUndefined,
      {
        level: 'guest',
        progressCallback: expect.any(Function),
        resumable: false,
        contentType: 'binary/octet-stream',
      }
    );
  });

  it('passes metadata to Storage.put', () => {
    uploadFile({
      file: imageFile,
      key: imageFile.name,
      level: 'guest',
      progressCallback: () => '',
      errorCallback: () => '',
      completeCallback: () => '',
      isResumable: false,
      metadata: {
        foo: 'bar',
      },
    });

    expect(storageSpy).toBeCalledWith(imageFile.name, imageFile, {
      level: 'guest',
      progressCallback: expect.any(Function),
      resumable: false,
      contentType: 'image/png',
      metadata: {
        foo: 'bar',
      },
    });
  });
});
