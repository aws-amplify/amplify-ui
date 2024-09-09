import { renderHook, act } from '@testing-library/react-hooks';
import { useReducer } from 'react';

import { UploadDataOutput } from 'aws-amplify/storage';

import { fileUploaderStateReducer } from '../reducer';
import {
  Action,
  FileUploaderActionTypes,
  UseFileUploaderState,
} from '../types';
import { FileStatus, StorageFile, StorageFiles } from '../../../types';

const imageFile = new File(['hello'], 'hello.png', { type: 'image/png' });
const initialState: UseFileUploaderState = {
  files: [],
};

// mock Date.now() so we can get accurate file IDs
const dateSpy = jest.spyOn(Date, 'now').mockImplementation(() => 1487076708000);

describe('fileUploaderStateReducer', () => {
  beforeEach(() => {
    dateSpy.mockClear();
  });

  it('should add files to state on ADD_FILES action', () => {
    const addFilesAction: Action = {
      type: FileUploaderActionTypes.ADD_FILES,
      files: [imageFile],
      status: FileStatus.QUEUED,
      getFileErrorMessage: jest.fn().mockReturnValue('Test error'),
    };

    const expectedFiles: StorageFiles = [
      {
        id: `${Date.now()}-${imageFile.name}`,
        file: imageFile,
        error: 'Test error',
        key: imageFile.name,
        status: FileStatus.ERROR,
        isImage: true,
        progress: -1,
      },
    ];
    const { result } = renderHook(() => {
      const [state, dispatch] = useReducer(
        fileUploaderStateReducer,
        initialState
      );
      return { state, dispatch };
    });

    expect(result.current.state.files).toStrictEqual([]);

    act(() => result.current.dispatch(addFilesAction));

    expect(result.current.state.files).toStrictEqual(expectedFiles);
  });

  it('should clear files from state on CLEAR_FILES action', () => {
    const { result } = renderHook(() => {
      const [state, dispatch] = useReducer(fileUploaderStateReducer, {
        files: [
          {
            id: imageFile.name,
            file: imageFile,
            error: '',
            key: imageFile.name,
            status: FileStatus.UPLOADING,
            isImage: true,
            progress: -1,
          },
        ],
      });
      return { state, dispatch };
    });

    const clearFilesAction: Action = {
      type: FileUploaderActionTypes.CLEAR_FILES,
    };
    act(() => result.current.dispatch(clearFilesAction));

    expect(result.current.state.files).toEqual([]);
  });

  it('should set uploading status and progress on SET_STATUS_UPLOADING action', () => {
    const { result } = renderHook(() => {
      const [state, dispatch] = useReducer(fileUploaderStateReducer, {
        files: [
          {
            id: imageFile.name,
            file: imageFile,
            error: '',
            key: imageFile.name,
            status: FileStatus.QUEUED,
            isImage: true,
            progress: -1,
          },
        ],
      });
      return { state, dispatch };
    });

    const testUploadTask = {} as UploadDataOutput;
    const uploadingAction: Action = {
      type: FileUploaderActionTypes.SET_STATUS_UPLOADING,
      id: imageFile.name,
      uploadTask: testUploadTask,
    };
    act(() => result.current.dispatch(uploadingAction));

    const expectedFiles: StorageFiles = [
      {
        id: imageFile.name,
        file: imageFile,
        error: '',
        key: imageFile.name,
        status: FileStatus.UPLOADING,
        isImage: true,
        progress: 0,
        uploadTask: testUploadTask,
      },
    ];
    expect(result.current.state.files).toEqual(expectedFiles);
  });

  it('should set upload progress of a file on SET_UPLOAD_PROGRESS action', () => {
    const { result } = renderHook(() => {
      const [state, dispatch] = useReducer(fileUploaderStateReducer, {
        files: [
          {
            id: imageFile.name,
            file: imageFile,
            error: '',
            key: imageFile.name,
            status: FileStatus.UPLOADING,
            isImage: true,
            progress: -1,
          },
        ],
      });
      return { state, dispatch };
    });

    const uploadProgressAction: Action = {
      type: FileUploaderActionTypes.SET_UPLOAD_PROGRESS,
      id: imageFile.name,
      progress: 50,
    };
    act(() => result.current.dispatch(uploadProgressAction));

    const expectedFiles: StorageFiles = [
      {
        id: imageFile.name,
        file: imageFile,
        error: '',
        key: imageFile.name,
        status: FileStatus.UPLOADING,
        isImage: true,
        progress: 50,
      },
    ];
    expect(result.current.state.files).toEqual(expectedFiles);
  });

  it('should return previous state if file not found on SET_UPLOAD_PROGRESS action', () => {
    const file: StorageFile = {
      id: imageFile.name,
      file: imageFile,
      error: '',
      key: imageFile.name,
      status: FileStatus.UPLOADING,
      isImage: true,
      progress: -1,
    };
    const { result } = renderHook(() => {
      const [state, dispatch] = useReducer(fileUploaderStateReducer, {
        files: [file],
      });
      return { state, dispatch };
    });

    const uploadProgressAction: Action = {
      type: FileUploaderActionTypes.SET_UPLOAD_PROGRESS,
      id: 'not-found',
      progress: 50,
    };
    act(() => result.current.dispatch(uploadProgressAction));

    expect(result.current.state.files).toEqual([file]);
  });

  it('should update the status of a file progress of a file on SET_STATUS action', () => {
    const { result } = renderHook(() => {
      const [state, dispatch] = useReducer(fileUploaderStateReducer, {
        files: [
          {
            id: imageFile.name,
            file: imageFile,
            error: '',
            key: imageFile.name,
            status: FileStatus.UPLOADING,
            isImage: true,
            progress: -1,
          },
        ],
      });
      return { state, dispatch };
    });

    const setStatusAction: Action = {
      type: FileUploaderActionTypes.SET_STATUS,
      id: imageFile.name,
      status: FileStatus.UPLOADED,
    };
    act(() => result.current.dispatch(setStatusAction));

    const expectedFiles: StorageFiles = [
      {
        id: imageFile.name,
        file: imageFile,
        error: '',
        key: imageFile.name,
        status: FileStatus.UPLOADED,
        isImage: true,
        progress: -1,
      },
    ];
    expect(result.current.state.files).toEqual(expectedFiles);
  });

  it('should return previous state if file not found on SET_STATUS action', () => {
    const file: StorageFile = {
      id: imageFile.name,
      file: imageFile,
      error: '',
      key: imageFile.name,
      status: FileStatus.UPLOADING,
      isImage: true,
      progress: -1,
    };
    const { result } = renderHook(() => {
      const [state, dispatch] = useReducer(fileUploaderStateReducer, {
        files: [file],
      });
      return { state, dispatch };
    });

    const setStatusAction: Action = {
      type: FileUploaderActionTypes.SET_STATUS,
      id: 'not-found',
      status: FileStatus.UPLOADED,
    };
    act(() => result.current.dispatch(setStatusAction));

    expect(result.current.state.files).toEqual([file]);
  });

  it('should remove file from state on REMOVE_UPLOAD action', () => {
    const { result } = renderHook(() => {
      const [state, dispatch] = useReducer(fileUploaderStateReducer, {
        files: [
          {
            id: imageFile.name,
            file: imageFile,
            error: '',
            key: imageFile.name,
            status: FileStatus.UPLOADING,
            isImage: true,
            progress: -1,
          },
        ],
      });
      return { state, dispatch };
    });

    const removeUploadAction: Action = {
      type: FileUploaderActionTypes.REMOVE_UPLOAD,
      id: imageFile.name,
    };
    act(() => result.current.dispatch(removeUploadAction));

    expect(result.current.state.files).toEqual([]);
  });

  it('should return previous state if file not found on REMOVE_UPLOAD action', () => {
    const file: StorageFile = {
      id: imageFile.name,
      file: imageFile,
      error: '',
      key: imageFile.name,
      status: FileStatus.UPLOADING,
      isImage: true,
      progress: -1,
    };
    const { result } = renderHook(() => {
      const [state, dispatch] = useReducer(fileUploaderStateReducer, {
        files: [file],
      });
      return { state, dispatch };
    });

    const removeUploadAction: Action = {
      type: FileUploaderActionTypes.REMOVE_UPLOAD,
      id: 'not-found',
    };
    act(() => result.current.dispatch(removeUploadAction));

    expect(result.current.state.files).toEqual([file]);
  });

  it('updates the key of a target file on SET_PROCESSED_FILE_KEY', () => {
    const file: StorageFile = {
      id: imageFile.name,
      file: imageFile,
      error: '',
      key: imageFile.name,
      status: FileStatus.QUEUED,
      isImage: true,
      progress: -1,
    };

    const { result } = renderHook(() => {
      const [state, dispatch] = useReducer(fileUploaderStateReducer, {
        files: [file],
      });
      return { state, dispatch };
    });

    const processedKey = `processed-${imageFile.name}`;
    const action: Action = {
      type: FileUploaderActionTypes.SET_PROCESSED_FILE_KEY,
      id: imageFile.name,
      processedKey,
    };

    expect(result.current.state.files[0].processedKey).toBeUndefined();

    act(() => result.current.dispatch(action));

    expect(result.current.state.files[0].processedKey).toBe(processedKey);
  });

  it('should only change added files to queued in QUEUE_FILES action', () => {
    const { result } = renderHook(() => {
      const [state, dispatch] = useReducer(fileUploaderStateReducer, {
        files: [
          {
            id: imageFile.name,
            file: imageFile,
            error: '',
            key: imageFile.name,
            status: FileStatus.ADDED,
            isImage: true,
            progress: -1,
          },
          {
            id: imageFile.name,
            file: imageFile,
            error: '',
            key: imageFile.name,
            status: FileStatus.UPLOADED,
            isImage: true,
            progress: 100,
          },
        ],
      });
      return { state, dispatch };
    });

    const queueFilesAction: Action = {
      type: FileUploaderActionTypes.QUEUE_FILES,
    };

    act(() => result.current.dispatch(queueFilesAction));

    expect(result.current.state.files).toEqual([
      {
        id: imageFile.name,
        file: imageFile,
        error: '',
        key: imageFile.name,
        status: FileStatus.QUEUED,
        isImage: true,
        progress: -1,
      },
      {
        id: imageFile.name,
        file: imageFile,
        error: '',
        key: imageFile.name,
        status: FileStatus.UPLOADED,
        isImage: true,
        progress: 100,
      },
    ]);
  });
});
