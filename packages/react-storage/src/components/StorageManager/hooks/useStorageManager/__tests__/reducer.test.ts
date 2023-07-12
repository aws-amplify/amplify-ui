import { renderHook, act } from '@testing-library/react-hooks';
import { useReducer } from 'react';

import { storageManagerStateReducer } from '../reducer';
import {
  Action,
  StorageManagerActionTypes,
  UseStorageManagerState,
} from '../types';
import { FileStatus, StorageFile, StorageFiles } from '../../../types';
import { UploadTask } from '@aws-amplify/storage';

const imageFile = new File(['hello'], 'hello.png', { type: 'image/png' });
const initialState: UseStorageManagerState = {
  files: [],
};

describe('storageManagerStateReducer', () => {
  it('should add files to state on ADD_FILES action', () => {
    const addFilesAction: Action = {
      type: StorageManagerActionTypes.ADD_FILES,
      files: [imageFile],
      getFileErrorMessage: jest.fn().mockReturnValue('Test error'),
    };

    const expectedFiles: StorageFiles = [
      {
        id: imageFile.name,
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
        storageManagerStateReducer,
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
      const [state, dispatch] = useReducer(storageManagerStateReducer, {
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
      type: StorageManagerActionTypes.CLEAR_FILES,
    };
    act(() => result.current.dispatch(clearFilesAction));

    expect(result.current.state.files).toEqual([]);
  });

  it('should set uploading status and progress on SET_STATUS_UPLOADING action', () => {
    const { result } = renderHook(() => {
      const [state, dispatch] = useReducer(storageManagerStateReducer, {
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

    const testUploadTask = {} as UploadTask;
    const uploadingAction: Action = {
      type: StorageManagerActionTypes.SET_STATUS_UPLOADING,
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
      const [state, dispatch] = useReducer(storageManagerStateReducer, {
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
      type: StorageManagerActionTypes.SET_UPLOAD_PROGRESS,
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
      const [state, dispatch] = useReducer(storageManagerStateReducer, {
        files: [file],
      });
      return { state, dispatch };
    });

    const uploadProgressAction: Action = {
      type: StorageManagerActionTypes.SET_UPLOAD_PROGRESS,
      id: 'not-found',
      progress: 50,
    };
    act(() => result.current.dispatch(uploadProgressAction));

    expect(result.current.state.files).toEqual([file]);
  });

  it('should update the status of a file progress of a file on SET_STATUS action', () => {
    const { result } = renderHook(() => {
      const [state, dispatch] = useReducer(storageManagerStateReducer, {
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
      type: StorageManagerActionTypes.SET_STATUS,
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
      const [state, dispatch] = useReducer(storageManagerStateReducer, {
        files: [file],
      });
      return { state, dispatch };
    });

    const setStatusAction: Action = {
      type: StorageManagerActionTypes.SET_STATUS,
      id: 'not-found',
      status: FileStatus.UPLOADED,
    };
    act(() => result.current.dispatch(setStatusAction));

    expect(result.current.state.files).toEqual([file]);
  });

  it('should remove file from state on REMOVE_UPLOAD action', () => {
    const { result } = renderHook(() => {
      const [state, dispatch] = useReducer(storageManagerStateReducer, {
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
      type: StorageManagerActionTypes.REMOVE_UPLOAD,
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
      const [state, dispatch] = useReducer(storageManagerStateReducer, {
        files: [file],
      });
      return { state, dispatch };
    });

    const removeUploadAction: Action = {
      type: StorageManagerActionTypes.REMOVE_UPLOAD,
      id: 'not-found',
    };
    act(() => result.current.dispatch(removeUploadAction));

    expect(result.current.state.files).toEqual([file]);
  });
});
