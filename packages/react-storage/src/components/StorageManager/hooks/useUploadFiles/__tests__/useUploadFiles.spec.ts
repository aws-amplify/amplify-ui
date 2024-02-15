import { renderHook } from '@testing-library/react-hooks';
import { waitFor } from '@testing-library/react';

import * as Storage from 'aws-amplify/storage';

import { FileStatus, StorageFile, StorageManagerProps } from '../../../types';
import { useUploadFiles, UseUploadFilesProps } from '../useUploadFiles';

const uploadDataSpy = jest
  .spyOn(Storage, 'uploadData')
  .mockImplementation((input: Storage.UploadDataInput) => {
    return {
      cancel: jest.fn(),
      pause: jest.fn(),
      resume: jest.fn(),
      state: 'SUCCESS',
      result: Promise.resolve({ key: input.key, data: input.data }),
    };
  });

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
    jest.clearAllMocks();
  });

  it('should upload all queued files', async () => {
    const { waitForNextUpdate } = renderHook(() =>
      useUploadFiles({ ...props, files: [mockUploadingFile, mockQueuedFile] })
    );

    waitForNextUpdate();

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
    const { waitForNextUpdate } = renderHook(() =>
      useUploadFiles({
        ...props,
        isResumable: true,
        files: [mockUploadingFile, mockQueuedFile],
      })
    );

    waitForNextUpdate();

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
    const { waitForNextUpdate } = renderHook(() =>
      useUploadFiles({ ...props, maxFileCount: 0, files: [mockQueuedFile] })
    );

    waitForNextUpdate();

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
    const { waitForNextUpdate } = renderHook(() =>
      useUploadFiles({ ...props, files: [mockQueuedFile] })
    );

    waitForNextUpdate();

    await waitFor(() => {
      expect(mockOnUploadError).toHaveBeenCalledTimes(1);
      expect(mockOnUploadError).toHaveBeenCalledWith('Error', { key: 'key' });
    });
  });

  it('should start upload after processFile', async () => {
    const processFile: StorageManagerProps['processFile'] = ({ file }) => ({
      file,
      key: 'test.png',
    });

    const { waitForNextUpdate } = renderHook(() =>
      useUploadFiles({
        ...props,
        isResumable: true,
        processFile,
        files: [mockQueuedFile],
      })
    );

    waitForNextUpdate();

    await waitFor(() => {
      expect(mockOnUploadStart).toHaveBeenCalledWith({ key: 'test.png' });
    });
  });

  it('should start upload after processFile promise resolves', async () => {
    const processFile: StorageManagerProps['processFile'] = ({ file }) =>
      new Promise((resolve) => resolve({ file, key: 'test.png' }));

    const { waitForNextUpdate } = renderHook(() =>
      useUploadFiles({
        ...props,
        isResumable: true,
        processFile,
        files: [mockQueuedFile],
      })
    );

    waitForNextUpdate();

    await waitFor(() => {
      expect(mockOnUploadStart).toHaveBeenCalledWith({
        key: 'test.png',
      });
    });
  });

  it('prepends valid provided `path` to `processedKey`', async () => {
    const path = 'test-path/';
    const { waitForNextUpdate } = renderHook(() =>
      useUploadFiles({
        ...props,
        isResumable: true,
        files: [mockQueuedFile],
        path,
      })
    );
    const expected = { key: `${path}${mockQueuedFile.key}` };

    waitForNextUpdate();

    await waitFor(() => {
      expect(mockOnUploadStart).toHaveBeenCalledWith(expected);
      expect(uploadDataSpy).toHaveBeenCalledTimes(1);
      expect(uploadDataSpy).toHaveBeenCalledWith(
        expect.objectContaining(expected)
      );
    });
  });
});
