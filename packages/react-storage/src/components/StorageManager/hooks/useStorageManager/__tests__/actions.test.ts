import { UploadTask } from '@aws-amplify/storage';
import { FileStatus } from '../../../types';

import {
  addFilesAction,
  clearFilesAction,
  removeUploadAction,
  setUploadingFileAction,
  setUploadProgressAction,
  setUploadStatusAction,
} from '../actions';
import { StorageManagerActionTypes } from '../types';

describe('addFilesAction', () => {
  it('creates an action with the ADD_FILES type and the given files and error message', () => {
    const files = [new File(['file contents'], 'filename')];
    const getFileErrorMessage = () => 'Something went wrong';
    const expectedAction = {
      type: StorageManagerActionTypes.ADD_FILES,
      files,
      getFileErrorMessage,
    };
    const action = addFilesAction({ files, getFileErrorMessage });
    expect(action).toEqual(expectedAction);
  });
});

describe('clearFilesAction', () => {
  it('creates an action with the CLEAR_FILES type', () => {
    const expectedAction = {
      type: StorageManagerActionTypes.CLEAR_FILES,
    };
    const action = clearFilesAction();
    expect(action).toEqual(expectedAction);
  });
});

describe('setUploadingFileAction', () => {
  it('creates an action with the SET_STATUS_UPLOADING type and the given id and upload task', () => {
    const id = 'test-id';
    const uploadTask = {} as UploadTask;
    const expectedAction = {
      type: StorageManagerActionTypes.SET_STATUS_UPLOADING,
      id,
      uploadTask,
    };
    const action = setUploadingFileAction({ id, uploadTask });
    expect(action).toEqual(expectedAction);
  });
});

describe('setUploadProgressAction', () => {
  it('creates an action with the SET_UPLOAD_PROGRESS type and the given id and progress', () => {
    const id = 'test-id';
    const progress = 50;
    const expectedAction = {
      type: StorageManagerActionTypes.SET_UPLOAD_PROGRESS,
      id,
      progress,
    };
    const action = setUploadProgressAction({ id, progress });
    expect(action).toEqual(expectedAction);
  });
});

describe('setUploadStatusAction', () => {
  it('creates an action with the SET_STATUS type and the given file status', () => {
    const id = 'test-id';
    const status = FileStatus.PAUSED;
    const expectedAction = {
      type: StorageManagerActionTypes.SET_STATUS,
      id,
      status,
    };
    const action = setUploadStatusAction({ id, status });
    expect(action).toEqual(expectedAction);
  });
});

describe('removeUploadAction', () => {
  it('creates an action with the REMOVE_UPLOAD type', () => {
    const id = 'test-id';
    const expectedAction = {
      type: StorageManagerActionTypes.REMOVE_UPLOAD,
      id,
    };
    const action = removeUploadAction({ id });
    expect(action).toEqual(expectedAction);
  });
});
