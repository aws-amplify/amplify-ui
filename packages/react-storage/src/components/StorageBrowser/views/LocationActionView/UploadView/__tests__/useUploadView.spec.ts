import { renderHook, act } from '@testing-library/react-hooks';
import { useUploadView } from '../useUploadView';
import { LocationData } from '../../../../actions';
import * as ConfigModule from '../../../../providers/configuration';
import * as StoreModule from '../../../../providers/store';
import * as TasksModule from '../../../../tasks';
import { UPLOAD_FILE_SIZE_LIMIT } from '../../constants';

const useStoreSpy = jest.spyOn(StoreModule, 'useStore');

const rootLocation: LocationData = {
  id: 'an-id-👍🏼',
  bucket: 'test-bucket',
  permissions: ['write'],
  // a root `prefix` is an empty string
  prefix: '',
  type: 'BUCKET',
};

const mockUserStoreState = {
  location: { current: rootLocation, path: '', key: '' },
  files: undefined,
} as StoreModule.UseStoreState;
const dispatchStoreAction = jest.fn();
useStoreSpy.mockReturnValue([mockUserStoreState, dispatchStoreAction]);

const credentials = jest.fn();
const config: ConfigModule.GetActionInput = jest.fn(() => ({
  credentials,
  bucket: rootLocation.bucket,
  region: 'region',
}));

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

jest.spyOn(ConfigModule, 'useGetActionInput').mockReturnValue(config);
const handleProcessTasks = jest.fn();

const taskOne: TasksModule.Task<StoreModule.FileItem> = {
  data: fileItemOne,
  cancel: jest.fn(),
  message: undefined,
  progress: undefined,
  status: 'QUEUED',
};

const taskTwo: TasksModule.Task<StoreModule.FileItem> = {
  data: fileItemTwo,
  cancel: jest.fn(),
  message: undefined,
  progress: undefined,
  status: 'QUEUED',
};

const useProcessTasksSpy = jest
  .spyOn(TasksModule, 'useProcessTasks')
  .mockReturnValue([
    {
      isProcessing: false,
      isProcessingComplete: false,
      statusCounts: TasksModule.INITIAL_STATUS_COUNTS,
      tasks: [],
    },
    handleProcessTasks,
  ]);

describe('useUploadView', () => {
  afterEach(() => {
    mockUserStoreState.files = undefined;
    jest.clearAllMocks();
  });

  it('should dispatchStoreAction when onDropFiles is invoked', () => {
    const { result } = renderHook(() => useUploadView());

    act(() => {
      result.current.onDropFiles([testFileOne]);
    });

    expect(dispatchStoreAction).toHaveBeenCalledTimes(1);
    expect(dispatchStoreAction).toHaveBeenCalledWith({
      type: 'ADD_FILE_ITEMS',
      files: [testFileOne],
    });
  });

  it('should dispatchStoreAction when onRemoveFile is invoked', () => {
    mockUserStoreState.files = [invalidFileItem];
    const { result } = renderHook(() => useUploadView());

    expect(dispatchStoreAction).toHaveBeenCalledWith({
      type: 'REMOVE_FILE_ITEM',
      id: invalidFileItem.id,
    });

    expect(result.current.invalidFiles).toEqual([invalidFileItem]);
  });

  it('should dispatchStoreAction when onSelectFiles is invoked with different types', () => {
    const { result } = renderHook(() => useUploadView());

    act(() => {
      result.current.onSelectFiles('FILE');
    });

    expect(dispatchStoreAction).toHaveBeenCalledTimes(1);
    expect(dispatchStoreAction).toHaveBeenCalledWith({
      type: 'SELECT_FILES',
      selectionType: 'FILE',
    });

    act(() => {
      result.current.onSelectFiles('FOLDER');
    });

    expect(dispatchStoreAction).toHaveBeenCalledTimes(2);
    expect(dispatchStoreAction).toHaveBeenCalledWith({
      type: 'SELECT_FILES',
      selectionType: 'FOLDER',
    });
  });

  it('should call handleProcessTasks with the expected values', () => {
    const { result } = renderHook(() => useUploadView());
    act(() => {
      result.current.onActionStart();
    });
    expect(handleProcessTasks).toHaveBeenCalledTimes(1);
    expect(handleProcessTasks).toHaveBeenCalledWith({
      config: {
        bucket: rootLocation.bucket,
        credentials,
        region: 'region',
      },
      options: { preventOverwrite: true },
      destinationPrefix: '',
    });
  });

  it('should call cancel on each pending task when onCancel is invoked', () => {
    const tasks: TasksModule.Task<StoreModule.FileItem>[] = [
      { ...taskOne, status: 'PENDING' },
      { ...taskTwo, status: 'PENDING' },
    ];

    useProcessTasksSpy.mockReturnValue([
      {
        tasks,
        isProcessing: true,
        isProcessingComplete: false,
        statusCounts: {
          ...TasksModule.INITIAL_STATUS_COUNTS,
          PENDING: 2,
          TOTAL: 2,
        },
      },
      handleProcessTasks,
    ]);

    const { result } = renderHook(() => useUploadView());

    act(() => {
      result.current.onActionCancel();
    });

    expect(tasks[0].cancel).toHaveBeenCalledTimes(1);
    expect(tasks[1].cancel).toHaveBeenCalledTimes(1);
  });

  it('should call remove on each task, provided onExit and dispatch actions when returned onExit is invoked', () => {
    const tasks: TasksModule.Task<StoreModule.FileItem>[] = [
      { ...taskOne, status: 'FAILED' },
      { ...taskTwo, status: 'COMPLETE' },
    ];

    useProcessTasksSpy.mockReturnValue([
      {
        tasks,
        isProcessing: true,
        isProcessingComplete: false,
        statusCounts: {
          ...TasksModule.INITIAL_STATUS_COUNTS,
          COMPLETE: 1,
          FAILED: 1,
          TOTAL: 2,
        },
      },
      handleProcessTasks,
    ]);

    const onExit = jest.fn();

    const { result } = renderHook(() => useUploadView({ onExit }));

    act(() => {
      result.current.onActionExit();
    });

    expect(onExit).toHaveBeenCalledTimes(1);
    expect(onExit).toHaveBeenCalledWith(rootLocation);

    expect(dispatchStoreAction.mock.calls).toEqual([
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
