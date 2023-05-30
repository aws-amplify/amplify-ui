import { act, renderHook } from '@testing-library/react-hooks';

import { DefaultFile, FileStatus } from '../../../types';
import { useStorageManager } from '../useStorageManager';

jest.mock('@aws-amplify/storage');

const defaultFiles: DefaultFile[] = [{ key: 'file1' }, { key: 'file2' }];

describe('useUploadFiles', () => {
  afterEach(() => jest.clearAllMocks());

  it('should initialize with default files', () => {
    const { result } = renderHook(() => useStorageManager(defaultFiles));

    expect(result.current.files.length).toBe(2);

    result.current.files.forEach((file) => {
      expect(file.id).toBe(file.key);
      expect(file.status).toBe(FileStatus.UPLOADED);
    });
  });

  it('should add files', () => {
    const { result } = renderHook(() => useStorageManager());

    expect(result.current.files.length).toBe(0);
    act(() =>
      result.current.addFiles({
        files: [
          new File(['test1'], 'test1.txt', { type: 'text/plain' }),
          new File(['test2'], 'test2.txt', { type: 'text/plain' }),
        ],
        getFileErrorMessage: () => '',
      })
    );

    expect(result.current.files.length).toBe(2);

    expect(result.current.files[0].status).toStrictEqual(FileStatus.QUEUED);
    expect(result.current.files[1].status).toStrictEqual(FileStatus.QUEUED);
  });

  it('should clear files', () => {
    const { result } = renderHook(() => useStorageManager(defaultFiles));
    act(() =>
      result.current.addFiles({
        files: [
          new File(['test1'], 'test1.txt', { type: 'text/plain' }),
          new File(['test2'], 'test2.txt', { type: 'text/plain' }),
        ],
        getFileErrorMessage: () => '',
      })
    );

    expect(result.current.files.length).toBe(4);
    act(() => result.current.clearFiles());
    expect(result.current.files.length).toBe(0);
  });

  it('should set uploading file', () => {
    const { result } = renderHook(() => useStorageManager(defaultFiles));

    act(() =>
      result.current.setUploadingFile({
        id: 'file1',
        uploadTask: undefined,
      })
    );

    expect(result.current.files[0].status).toStrictEqual(FileStatus.UPLOADING);
  });

  it('should set upload progress', () => {
    const { result } = renderHook(() => useStorageManager(defaultFiles));

    act(() =>
      result.current.setUploadProgress({
        id: 'file1',
        progress: 50,
      })
    );

    expect(result.current.files[0].progress).toStrictEqual(50);
  });

  it('should set upload success', () => {
    const { result } = renderHook(() => useStorageManager(defaultFiles));

    act(() =>
      result.current.setUploadSuccess({
        id: 'file1',
      })
    );

    expect(result.current.files[0].status).toStrictEqual(FileStatus.UPLOADED);
  });

  it('should set upload paused', () => {
    const { result } = renderHook(() => useStorageManager(defaultFiles));

    act(() =>
      result.current.setUploadPaused({
        id: 'file1',
      })
    );

    expect(result.current.files[0].status).toStrictEqual(FileStatus.PAUSED);
  });

  it('should set upload resumed', () => {
    const { result } = renderHook(() => useStorageManager(defaultFiles));

    act(() =>
      result.current.setUploadResumed({
        id: 'file1',
      })
    );

    expect(result.current.files[0].status).toStrictEqual(FileStatus.UPLOADING);
  });

  it('should remove upload', () => {
    const { result } = renderHook(() => useStorageManager(defaultFiles));

    expect(result.current.files.length).toBe(2);
    act(() =>
      result.current.removeUpload({
        id: 'file1',
      })
    );
    expect(result.current.files.length).toBe(1);
  });

  describe('defaultFiles', () => {
    it('should handle good defaultFiles', () => {
      const { result } = renderHook(() =>
        useStorageManager([{ key: 'file.jpg' }])
      );
      expect(result.current.files).toHaveLength(1);
    });

    it('should handle null defaultFiles', () => {
      // @ts-expect-error
      const { result } = renderHook(() => useStorageManager(null));
      expect(result.current.files).toHaveLength(0);
    });

    it('should handle bad defaultFiles', () => {
      const { result } = renderHook(() =>
        useStorageManager([
          // @ts-expect-error
          null,
          // @ts-expect-error
          { key: null },
          // @ts-expect-error
          { foo: 'bar' },
        ])
      );
      expect(result.current.files).toHaveLength(0);
    });
  });
});
