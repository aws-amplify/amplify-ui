import { renderHook } from '@testing-library/react-hooks';

import { Storage, UploadTask } from '@aws-amplify/storage';

import { FileStatus, StorageFile, StorageManagerProps } from '../../../types';
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
const mockOnUploadStart = jest.fn();
const props: Omit<UseUploadFilesProps, 'files'> = {
  accessLevel: 'public',
  maxFileCount: 2,
  setUploadingFile: mockSetUploadingFile,
  setUploadProgress: mockSetUploadProgress,
  setUploadSuccess: mockSetUploadSuccess,
  onUploadError: mockOnUploadError,
  onUploadStart: mockOnUploadStart,
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

    await waitFor(() => {
      expect(mockSetUploadingFile).toHaveBeenCalledTimes(1);
      expect(mockSetUploadingFile).toHaveBeenCalledWith({
        id: mockQueuedFile.id,
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
    (Storage.put as jest.Mock).mockResolvedValue(storageOutput);
    renderHook(() =>
      useUploadFiles({
        ...props,
        isResumable: true,
        files: [mockUploadingFile, mockQueuedFile],
      })
    );
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
      expect(mockOnUploadError).toHaveBeenCalledWith(mockError, { key: 'key' });
    });
  });

  it('should start upload after processFile', async () => {
    (Storage.put as jest.Mock).mockResolvedValue(storageOutput);
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

    await waitFor(() => {
      expect(mockOnUploadStart).toHaveBeenCalledWith({
        key: 'test.png',
      });
    });
  });

  it('should start upload after processFile promise resolves', async () => {
    (Storage.put as jest.Mock).mockResolvedValue(storageOutput);
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
