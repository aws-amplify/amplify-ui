import { act, renderHook } from '@testing-library/react';

import type { FileItem, LocationData } from '../../../../actions';
import { useFiles } from '../../../../files';
import { useStore } from '../../../../store';
import { INITIAL_STATUS_COUNTS, Task } from '../../../../tasks';
import { useAction } from '../../../../useAction';
import { useUploadView } from '../useUploadView';

jest.mock('../../../../files');
jest.mock('../../../../store');
jest.mock('../../../../useAction');

const rootLocation: LocationData = {
  id: 'an-id-👍🏼',
  bucket: 'test-bucket',
  permissions: ['write'],
  // a root `prefix` is an empty string
  prefix: '',
  type: 'BUCKET',
};

const testFileOne = new File([], 'test-ooo');
const fileItemOne = {
  id: 'some-uuid',
  file: testFileOne,
  key: testFileOne.name,
};
const testFileTwo = new File([], 'test-oooxxxxooooo');
const fileItemTwo = {
  id: 'some-uuid',
  file: testFileTwo,
  key: testFileTwo.name,
};
const invalidFile = new File([], 'invalid-file');
const invalidFileItem = {
  id: 'invalid-file-uuid',
  file: invalidFile,
  key: invalidFile.name,
};

const taskOne: Task<FileItem> = {
  data: fileItemOne,
  cancel: jest.fn(),
  message: undefined,
  progress: undefined,
  status: 'QUEUED',
};

const taskTwo: Task<FileItem> = {
  data: fileItemTwo,
  cancel: jest.fn(),
  message: undefined,
  progress: undefined,
  status: 'QUEUED',
};

describe('useUploadView', () => {
  const mockUserFilesState = {
    validItems: undefined,
    invalidItems: undefined,
  };

  const mockUserStoreState = {
    actionType: 'upload',
    location: { current: rootLocation, path: '', key: '' },
  };

  const mockUseAction = jest.mocked(useAction);
  const mockUseFiles = jest.mocked(useFiles);
  const mockUseStore = jest.mocked(useStore);

  const mockCancel = jest.fn();
  const mockFilesDispatch = jest.fn();
  const mockHandleUpload = jest.fn();
  const mockStoreDispatch = jest.fn();

  beforeEach(() => {
    mockUseStore.mockReturnValue([mockUserStoreState, mockStoreDispatch]);
    mockUseFiles.mockReturnValue([mockUserFilesState, mockFilesDispatch]);
    mockUseAction.mockReturnValue([
      {
        isProcessing: false,
        isProcessingComplete: false,
        reset: jest.fn(),
        statusCounts: INITIAL_STATUS_COUNTS,
        tasks: [
          { ...taskOne, status: 'PENDING', cancel: mockCancel },
          { ...taskTwo, status: 'PENDING', cancel: mockCancel },
        ],
      },
      mockHandleUpload,
    ]);
  });

  afterEach(jest.clearAllMocks);

  it('should call `filesDispatch` when onDropFiles is invoked', () => {
    const { result } = renderHook(() => useUploadView());

    act(() => {
      result.current.onDropFiles([testFileOne]);
    });

    expect(mockFilesDispatch).toHaveBeenCalledTimes(1);
    expect(mockFilesDispatch).toHaveBeenCalledWith({
      type: 'ADD_FILES',
      files: [testFileOne],
    });
  });

  it('should show invalid files if exists', () => {
    mockUseFiles.mockReturnValue([
      { validItems: undefined, invalidItems: [invalidFileItem] },
      mockFilesDispatch,
    ]);

    const { result } = renderHook(() => useUploadView());

    expect(result.current.invalidFiles).toEqual([invalidFileItem]);
  });

  it('should call `filesDispatch` when `onSelectFiles` is invoked with different types', () => {
    const { result } = renderHook(() => useUploadView());

    act(() => {
      result.current.onSelectFiles('FILE');
    });

    expect(mockFilesDispatch).toHaveBeenCalledTimes(1);
    expect(mockFilesDispatch).toHaveBeenCalledWith({
      type: 'SELECT_FILES',
      selectionType: 'FILE',
    });

    act(() => {
      result.current.onSelectFiles('FOLDER');
    });

    expect(mockFilesDispatch).toHaveBeenCalledTimes(2);
    expect(mockFilesDispatch).toHaveBeenCalledWith({
      type: 'SELECT_FILES',
      selectionType: 'FOLDER',
    });
  });

  it('should call `handleUpload` when `onActionStart` is invoked', () => {
    const { result } = renderHook(() => useUploadView());
    act(() => {
      result.current.onActionStart();
    });
    expect(mockHandleUpload).toHaveBeenCalledTimes(1);
  });

  it('should call cancel on each pending task when onCancel is invoked', () => {
    const { result } = renderHook(() => useUploadView());

    act(() => {
      result.current.onActionCancel();
    });

    expect(mockCancel).toHaveBeenCalledTimes(2);
  });

  it('should call remove on each task, provided onExit and dispatch actions when returned onExit is invoked', () => {
    const tasks: Task<FileItem>[] = [
      { ...taskOne, status: 'FAILED' },
      { ...taskTwo, status: 'COMPLETE' },
    ];

    mockUseAction.mockReturnValue([
      {
        tasks,
        isProcessing: true,
        isProcessingComplete: false,
        reset: jest.fn(),
        statusCounts: {
          ...INITIAL_STATUS_COUNTS,
          COMPLETE: 1,
          FAILED: 1,
          TOTAL: 2,
        },
      },
      mockHandleUpload,
    ]);

    const onExit = jest.fn();

    const { result } = renderHook(() => useUploadView({ onExit }));

    act(() => {
      result.current.onActionExit();
    });

    expect(onExit).toHaveBeenCalledTimes(1);
    expect(onExit).toHaveBeenCalledWith(rootLocation);

    expect(mockFilesDispatch.mock.calls).toEqual([
      [{ type: 'RESET_FILE_ITEMS' }],
    ]);

    expect(mockStoreDispatch.mock.calls).toEqual([
      [{ type: 'RESET_ACTION_TYPE' }],
    ]);
  });

  it('should change preventOverwrite state when onToggleOverwrite callback is called', () => {
    const { result } = renderHook(() => useUploadView());

    // initial
    expect(result.current.isOverwritingEnabled).toBe(false);

    act(() => {
      result.current.onToggleOverwrite();
    });

    expect(result.current.isOverwritingEnabled).toBe(true);
  });
});
