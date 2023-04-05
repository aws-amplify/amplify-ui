import { renderHook } from '@testing-library/react-hooks';

import { Storage, UploadTask } from '@aws-amplify/storage';

import { FileStatus, StorageFile } from '../../../types';
import { useUploadFiles, UseUploadFilesProps } from '../useUploadFiles';
import { waitFor } from '@testing-library/react';

jest.mock('@aws-amplify/storage');

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
const props: Omit<UseUploadFilesProps, 'files'> = {
  accessLevel: 'public',
  maxFileCount: 2,
  setUploadingFile: mockSetUploadingFile,
  setUploadProgress: mockSetUploadProgress,
  setUploadSuccess: mockSetUploadSuccess,
  onUploadError: mockOnUploadError,
};

const storageOutput: UploadTask = {
  resume: jest.fn(),
  pause: jest.fn(),
  percent: 100,
  isInProgress: false,
};

describe('useUploadFiles', () => {
  afterEach(() => jest.clearAllMocks());

  it('should upload all queued files', async () => {
    (Storage.put as jest.Mock).mockResolvedValue(storageOutput);
    renderHook(() =>
      useUploadFiles({ ...props, files: [mockUploadingFile, mockQueuedFile] })
    );

    expect(mockSetUploadingFile).toHaveBeenCalledTimes(1);
    expect(mockSetUploadingFile).toHaveBeenCalledWith({
      id: mockQueuedFile.id,
    });
    expect(mockSetUploadingFile).not.toHaveBeenCalledWith({
      id: mockUploadingFile.id,
    });

    await waitFor(() => {
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

  it('should upload all resumable queued files', () => {
    (Storage.put as jest.Mock).mockResolvedValue(storageOutput);
    renderHook(() =>
      useUploadFiles({
        ...props,
        isResumable: true,
        files: [mockUploadingFile, mockQueuedFile],
      })
    );

    expect(mockSetUploadingFile).toHaveBeenCalledTimes(1);
    expect(mockSetUploadingFile).toHaveBeenCalledWith({
      id: mockQueuedFile.id,
      uploadTask: expect.any(Object),
    });
    expect(mockSetUploadingFile).not.toHaveBeenCalledWith({
      id: mockUploadingFile.id,
    });
  });

  it('should do nothing if number of queued files exceeds max number of files', async () => {
    (Storage.put as jest.Mock).mockResolvedValue(storageOutput);
    renderHook(() =>
      useUploadFiles({ ...props, maxFileCount: 0, files: [mockQueuedFile] })
    );

    expect(mockSetUploadingFile).not.toHaveBeenCalled();

    await waitFor(() => {
      expect(mockSetUploadSuccess).not.toHaveBeenCalled();
    });
  });

  it('should call onUploadError when upload fails', async () => {
    const mockError = new Error('Something wrong happened');
    (Storage.put as jest.Mock).mockRejectedValue(mockError);
    renderHook(() => useUploadFiles({ ...props, files: [mockQueuedFile] }));

    await waitFor(() => {
      expect(mockOnUploadError).toHaveBeenCalledTimes(1);
      expect(mockOnUploadError).toHaveBeenCalledWith(mockError);
    });
  });
});
