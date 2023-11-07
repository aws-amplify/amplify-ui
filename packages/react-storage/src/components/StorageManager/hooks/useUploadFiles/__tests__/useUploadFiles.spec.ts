import { renderHook } from '@testing-library/react-hooks';
import { waitFor } from '@testing-library/react';
import { setImmediate } from 'timers';
import * as Storage from 'aws-amplify/storage';

import { FileStatus, StorageFile, StorageManagerProps } from '../../../types';
import { useUploadFiles, UseUploadFilesProps } from '../useUploadFiles';

const uploadDataSpy = jest.spyOn(Storage, 'uploadData');

const flushPromises = () => new Promise(setImmediate);

const mockUploadingFile: StorageFile = {
  id: 'uploading',
  status: FileStatus.UPLOADING,
  progress: 0,
  error: '',
  isImage: false,
  key: '',
};

const imageFile = new File(['hello'], 'hello.png', { type: 'image/png' });

const mockQueuedFile: StorageFile = {
  id: 'queued',
  status: FileStatus.QUEUED,
  progress: 0,
  error: '',
  isImage: false,
  key: 'key',
  file: imageFile,
};

const mockSetUploadingFile = jest.fn();
const mockSetUploadProgress = jest.fn();
const mockSetUploadSuccess = jest.fn();
const mockOnUploadError = jest.fn();
const mockOnUploadStart = jest.fn();
const props: Omit<UseUploadFilesProps, 'files'> = {
  accessLevel: 'guest',
  maxFileCount: 2,
  setUploadingFile: mockSetUploadingFile,
  setUploadProgress: mockSetUploadProgress,
  setUploadSuccess: mockSetUploadSuccess,
  onUploadError: mockOnUploadError,
  onUploadStart: mockOnUploadStart,
};

describe('useUploadFiles', () => {
  beforeEach(() => {
    uploadDataSpy.mockClear();
    jest.resetAllMocks();
  });

  it('should upload all queued files', async () => {
    uploadDataSpy.mockImplementationOnce((input: Storage.UploadDataInput) => {
      return {
        cancel: jest.fn(),
        pause: jest.fn(),
        resume: jest.fn(),
        state: 'SUCCESS',
        result: Promise.resolve({ key: input.key, data: input.data }),
      };
    });
    renderHook(() =>
      useUploadFiles({
        ...props,
        files: [mockUploadingFile, mockQueuedFile],
      })
    );

    await flushPromises();

    await waitFor(() => {
      expect(mockSetUploadingFile).toHaveBeenCalledTimes(1);
      expect(mockSetUploadingFile).toHaveBeenCalledWith({
        id: mockQueuedFile.id,
        uploadTask: expect.any(Object),
      });
      expect(mockSetUploadingFile).not.toHaveBeenCalledWith({
        id: mockUploadingFile.id,
      });
      expect(mockSetUploadSuccess).toHaveBeenCalledTimes(1);
      expect(mockSetUploadSuccess).toHaveBeenCalledWith({
        id: mockQueuedFile.id,
      });
      expect(mockSetUploadSuccess).not.toHaveBeenCalledWith({
        id: mockUploadingFile.id,
      });
      expect(mockOnUploadError).not.toHaveBeenCalled();
    });
  });

  it('should upload all resumable queued files', async () => {
    uploadDataSpy.mockImplementationOnce((input: Storage.UploadDataInput) => {
      return {
        cancel: jest.fn(),
        pause: jest.fn(),
        resume: jest.fn(),
        state: 'SUCCESS',
        result: Promise.resolve({ key: input.key, data: input.data }),
      };
    });
    renderHook(() =>
      useUploadFiles({
        ...props,
        isResumable: true,
        files: [mockUploadingFile, mockQueuedFile],
      })
    );
    await flushPromises();

    await waitFor(() => {
      expect(mockSetUploadingFile).toHaveBeenCalledTimes(1);
      expect(mockSetUploadingFile).toHaveBeenCalledWith({
        id: mockQueuedFile.id,
        uploadTask: expect.any(Object),
      });
      expect(mockSetUploadingFile).not.toHaveBeenCalledWith({
        id: mockUploadingFile.id,
      });
    });
  });

  it('should do nothing if number of queued files exceeds max number of files', async () => {
    uploadDataSpy.mockImplementationOnce((input: Storage.UploadDataInput) => {
      return {
        cancel: jest.fn(),
        pause: jest.fn(),
        resume: jest.fn(),
        state: 'SUCCESS',
        result: Promise.resolve({ key: input.key, data: input.data }),
      };
    });
    renderHook(() =>
      useUploadFiles({ ...props, maxFileCount: 0, files: [mockQueuedFile] })
    );
    await flushPromises();

    expect(mockSetUploadingFile).not.toHaveBeenCalled();

    await waitFor(() => {
      expect(mockSetUploadSuccess).not.toHaveBeenCalled();
    });
  });

  it('should call onUploadError when upload fails', async () => {
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
    renderHook(() => useUploadFiles({ ...props, files: [mockQueuedFile] }));

    await flushPromises();

    await waitFor(() => {
      expect(mockOnUploadError).toHaveBeenCalledTimes(1);
      expect(mockOnUploadError).toHaveBeenCalledWith('Error', { key: 'key' });
    });
  });

  it('should start upload after processFile', async () => {
    uploadDataSpy.mockImplementationOnce((input: Storage.UploadDataInput) => {
      return {
        cancel: jest.fn(),
        pause: jest.fn(),
        resume: jest.fn(),
        state: 'SUCCESS',
        result: Promise.resolve({ key: input.key, data: input.data }),
      };
    });
    const processFile: StorageManagerProps['processFile'] = ({ file }) => {
      return {
        file,
        key: 'test.png',
      };
    };
    renderHook(() =>
      useUploadFiles({
        ...props,
        isResumable: true,
        processFile,
        files: [mockQueuedFile],
      })
    );

    await flushPromises();

    await waitFor(() => {
      expect(mockOnUploadStart).toHaveBeenCalledWith({
        key: 'test.png',
      });
    });
  });

  it('should start upload after processFile promise resolves', async () => {
    uploadDataSpy.mockImplementationOnce((input: Storage.UploadDataInput) => {
      return {
        cancel: jest.fn(),
        pause: jest.fn(),
        resume: jest.fn(),
        state: 'SUCCESS',
        result: Promise.resolve({ key: input.key, data: input.data }),
      };
    });
    const processFile: StorageManagerProps['processFile'] = ({ file }) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ file, key: 'test.png' });
        }, 100);
      });
    };
    renderHook(() =>
      useUploadFiles({
        ...props,
        isResumable: true,
        processFile,
        files: [mockQueuedFile],
      })
    );

    await flushPromises();

    await waitFor(
      () => {
        expect(mockOnUploadStart).toHaveBeenCalledWith({
          key: 'test.png',
        });
      },
      {
        timeout: 200,
      }
    );
  });
});
