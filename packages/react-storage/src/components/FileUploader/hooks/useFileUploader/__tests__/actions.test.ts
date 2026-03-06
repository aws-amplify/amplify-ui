import { UploadDataOutput } from 'aws-amplify/storage';

import { FileStatus } from '../../../types';
import {
  addFilesAction,
  clearFilesAction,
  queueFilesAction,
  removeUploadAction,
  setUploadingFileAction,
  setUploadProgressAction,
  setUploadStatusAction,
} from '../actions';
import { FileUploaderActionTypes } from '../types';

describe('addFilesAction', () => {
  it('creates an action with the ADD_FILES type and the given files and error message', () => {
    const files = [new File(['file contents'], 'filename')];
    const status = FileStatus.QUEUED;
    const getFileErrorMessage = () => 'Something went wrong';
    const expectedAction = {
      type: FileUploaderActionTypes.ADD_FILES,
      files,
      status,
      getFileErrorMessage,
    };
    const action = addFilesAction({ files, status, getFileErrorMessage });
    expect(action).toEqual(expectedAction);
  });
});

describe('queueFilesAction', () => {
  it('creates an action with the QUEUE_FILES type', () => {
    const expectedAction = {
      type: FileUploaderActionTypes.QUEUE_FILES,
    };
    const action = queueFilesAction();
    expect(action).toEqual(expectedAction);
  });
});

describe('clearFilesAction', () => {
  it('creates an action with the CLEAR_FILES type', () => {
    const expectedAction = {
      type: FileUploaderActionTypes.CLEAR_FILES,
    };
    const action = clearFilesAction();
    expect(action).toEqual(expectedAction);
  });
});

describe('setUploadingFileAction', () => {
  it('creates an action with the SET_STATUS_UPLOADING type and the given id and upload task', () => {
    const id = 'test-id';
    const uploadTask = {} as UploadDataOutput;
    const expectedAction = {
      type: FileUploaderActionTypes.SET_STATUS_UPLOADING,
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
      type: FileUploaderActionTypes.SET_UPLOAD_PROGRESS,
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
      type: FileUploaderActionTypes.SET_STATUS,
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
      type: FileUploaderActionTypes.REMOVE_UPLOAD,
      id,
    };
    const action = removeUploadAction({ id });
    expect(action).toEqual(expectedAction);
  });
});
