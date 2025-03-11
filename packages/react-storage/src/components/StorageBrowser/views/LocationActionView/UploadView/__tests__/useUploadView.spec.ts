import { renderHook, act } from '@testing-library/react-hooks';
import { FileItem, LocationData } from '../../../../actions';

import { UseStoreState, useStore } from '../../../../providers/store';
import { Task, INITIAL_STATUS_COUNTS } from '../../../../tasks';
import { useAction } from '../../../../useAction';
import { UPLOAD_FILE_SIZE_LIMIT } from '../../../../validators/isFileTooBig';
import { useUploadView } from '../useUploadView';

jest.mock('../../../../providers/store');
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
const invalidFile = {
  ...new File([], 'invalid-file'),
  size: UPLOAD_FILE_SIZE_LIMIT + 1,
};
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
  const mockUserStoreState = {
    location: { current: rootLocation, path: '', key: '' },
    files: undefined,
  } as UseStoreState;

  const mockUseAction = jest.mocked(useAction);
  const mockUseStore = jest.mocked(useStore);
  const mockCancel = jest.fn();
  const mockDispatchStoreAction = jest.fn();
  const mockHandleUpload = jest.fn();

  beforeEach(() => {
    mockUseStore.mockReturnValue([
      { ...mockUserStoreState },
      mockDispatchStoreAction,
    ]);
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

  afterEach(() => {
    mockUseAction.mockReset();
    mockUseStore.mockReset();
    mockCancel.mockClear();
    mockDispatchStoreAction.mockClear();
    mockHandleUpload.mockClear();
  });

  it('should mockDispatchStoreAction when onDropFiles is invoked', () => {
    const { result } = renderHook(() => useUploadView());

    act(() => {
      result.current.onDropFiles([testFileOne]);
    });

    expect(mockDispatchStoreAction).toHaveBeenCalledTimes(1);
    expect(mockDispatchStoreAction).toHaveBeenCalledWith({
      type: 'ADD_FILE_ITEMS',
      files: [testFileOne],
    });
  });

  it('should show invalid files if exists', () => {
    mockUseStore.mockReturnValue([
      { ...mockUserStoreState, files: [invalidFileItem] },
      mockDispatchStoreAction,
    ]);
    const { result } = renderHook(() => useUploadView());

    expect(result.current.invalidFiles).toEqual([invalidFileItem]);
  });

  it('should mockDispatchStoreAction when onSelectFiles is invoked with different types', () => {
    const { result } = renderHook(() => useUploadView());

    act(() => {
      result.current.onSelectFiles('FILE');
    });

    expect(mockDispatchStoreAction).toHaveBeenCalledTimes(1);
    expect(mockDispatchStoreAction).toHaveBeenCalledWith({
      type: 'SELECT_FILES',
      selectionType: 'FILE',
    });

    act(() => {
      result.current.onSelectFiles('FOLDER');
    });

    expect(mockDispatchStoreAction).toHaveBeenCalledTimes(2);
    expect(mockDispatchStoreAction).toHaveBeenCalledWith({
      type: 'SELECT_FILES',
      selectionType: 'FOLDER',
    });
  });

  it('should call mockHandleUpload with the expected values', () => {
    mockUseStore.mockReturnValue([
      { ...mockUserStoreState, files: [invalidFileItem] },
      mockDispatchStoreAction,
    ]);
    const { result } = renderHook(() => useUploadView());
    act(() => {
      result.current.onActionStart();
    });
    expect(mockDispatchStoreAction).toHaveBeenCalledTimes(1);
    expect(mockDispatchStoreAction).toHaveBeenCalledWith({
      type: 'REMOVE_FILE_ITEM',
      id: invalidFileItem.id,
    });
  });

  it('should remove any invalid files action is started', () => {
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

    expect(mockDispatchStoreAction.mock.calls).toEqual([
      [{ type: 'RESET_FILE_ITEMS' }],
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
