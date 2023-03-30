import { uploadFile } from '../uploadFile';
import { Storage } from 'aws-amplify';

const storageSpy = jest
  .spyOn(Storage, 'put')
  .mockImplementation(() => Promise.resolve({ key: 'file' }));
const imageFile = new File(['hello'], 'hello.png', { type: 'image/png' });

describe('uploadfile', () => {
  beforeEach(() => {
    storageSpy.mockClear();
  });

  it('calls Storage.put when isResumable is true', () => {
    const progressCallback = () => '';
    const errorCallback = () => '';
    const completeCallback = () => '';

    uploadFile({
      file: imageFile,
      fileName: imageFile.name,
      completeCallback,
      errorCallback,
      isResumable: true,
      level: 'public',
      progressCallback,
      provider: 'provider',
    });

    expect(storageSpy).toBeCalledWith(imageFile.name, imageFile, {
      completeCallback,
      contentType: 'image/png',
      errorCallback,
      level: 'public',
      progressCallback,
      provider: 'provider',
      resumable: true,
    });
  });

  it('calls Storage.put when isResumable is false', () => {
    const progressCallback = () => '';
    uploadFile({
      file: imageFile,
      fileName: imageFile.name,
      level: 'public',
      progressCallback: progressCallback,
      errorCallback: () => '',
      completeCallback: () => '',
      isResumable: false,
      provider: 'provider',
    });

    expect(storageSpy).toBeCalledWith(imageFile.name, imageFile, {
      level: 'public',
      progressCallback: progressCallback,
      resumable: false,
      contentType: 'image/png',
      provider: 'provider',
    });
  });

  it('calls uploadFile with contentType defined image type', () => {
    uploadFile({
      file: imageFile,
      fileName: imageFile.name,
      level: 'public',
      progressCallback: () => '',
      errorCallback: () => '',
      completeCallback: () => '',
      isResumable: false,
    });

    expect(storageSpy).toBeCalledWith(imageFile.name, imageFile, {
      level: 'public',
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
      fileName: imageFileTypeUndefined.name,
      level: 'public',
      progressCallback: () => '',
      errorCallback: () => '',
      completeCallback: () => '',
      isResumable: false,
    });

    expect(storageSpy).toBeCalledWith(
      imageFileTypeUndefined.name,
      imageFileTypeUndefined,
      {
        level: 'public',
        progressCallback: expect.any(Function),
        resumable: false,
        contentType: 'binary/octet-stream',
      }
    );
  });
});
