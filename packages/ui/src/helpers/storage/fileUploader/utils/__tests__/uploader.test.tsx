import {
  returnAcceptedFiles,
  uploadFile,
  humanFileSize,
  isValidExtension,
} from '../uploader';
import { Storage } from 'aws-amplify';

const storageSpy = jest.spyOn(Storage, 'put');
const imageFile = new File(['hello'], 'hello.png', { type: 'image/png' });
const docFile = new File(['goodbye'], 'goodbye.doc', {
  type: 'application/msword',
});
describe('Uploader utils', () => {
  describe('returnAcceptedFiles', () => {
    it('returns only image files with mimetype image/*', () => {
      const acceptedFileTypes = ['image/*'];
      const acceptedFiles = returnAcceptedFiles(
        [imageFile, docFile],
        acceptedFileTypes
      );
      expect(acceptedFiles).toEqual([imageFile]);
    });
    it('returns only doc files', () => {
      const acceptedFileTypes = ['.doc'];
      const acceptedFiles = returnAcceptedFiles(
        [imageFile, docFile],
        acceptedFileTypes
      );
      expect(acceptedFiles).toEqual([docFile]);
    });
    it('returns no acceptable files', () => {
      const acceptedFileTypes = ['.xls'];
      const acceptedFiles = returnAcceptedFiles(
        [imageFile, docFile],
        acceptedFileTypes
      );
      expect(acceptedFiles).toEqual([]);
    });
  });
  describe('uploadfile', () => {
    it('calls isResumable true with storage put', () => {
      storageSpy.mockImplementation();
      uploadFile({
        file: imageFile,
        fileName: imageFile.name,
        level: 'public',
        progressCallback: () => '',
        errorCallback: () => '',
        completeCallback: () => '',
        isResumable: true,
      });

      expect(storageSpy).toBeCalledWith(imageFile.name, imageFile, {
        completeCallback: expect.any(Function),
        errorCallback: expect.any(Function),
        level: 'public',
        progressCallback: expect.any(Function),
        resumable: true,
        contentType: 'image/png',
      });
    });
    it('calls isResumable false with storage put', () => {
      storageSpy.mockImplementation(() => Promise.resolve() as any);
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
    it('calls uploadFile with contentType image/png', () => {
      storageSpy.mockImplementation(() => Promise.resolve() as any);
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
      storageSpy.mockImplementation(() => Promise.resolve() as any);

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

  describe('humanFileSize', () => {
    it('returns the correct human readable string for 100000 bytes metric false ', () => {
      const message = humanFileSize(100000);

      expect(message).toEqual('97.7 KiB');
    });
    it('returns the correct human readable string for 100000 bytes metric true', () => {
      const message = humanFileSize(100000, true);

      expect(message).toEqual('100.0 kB');
    });
    it('returns the correct human readable string for 0 bytes', () => {
      const message = humanFileSize(0);

      expect(message).toEqual('0 B');
    });
    it('returns the correct human readable string for negative bytes', () => {
      const message = humanFileSize(-1);

      expect(message).toEqual('-1 B');
    });
  });
  describe('isValidExtension', () => {
    it('returns back true if both extensions are the same', () => {
      const isValid = isValidExtension('test.jpg', 'test2.jpg');

      expect(isValid).toBeTruthy();
    });
    it('returns back false if both extensions are not the same', () => {
      const isValid = isValidExtension('test.png', 'test2.jpg');

      expect(isValid).toBeFalsy();
    });
  });
});
