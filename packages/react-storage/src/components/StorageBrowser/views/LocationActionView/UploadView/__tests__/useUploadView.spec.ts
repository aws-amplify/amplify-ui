import { renderHook, act } from '@testing-library/react-hooks';
import { useUploadView } from '../useUploadView';
import * as ConfigModule from '../../../../providers/configuration';
import * as StoreModule from '../../../../providers/store';
import * as TasksModule from '../../../../tasks';

const useStoreSpy = jest.spyOn(StoreModule, 'useStore');

const rootLocation = {
  id: 'an-id-👍🏼',
  bucket: 'test-bucket',
  permission: 'READWRITE',
  // a root `prefix` is an empty string
  prefix: '',
  type: 'BUCKET',
};

const dispatchStoreAction = jest.fn();
useStoreSpy.mockReturnValue([
  {
    location: { current: rootLocation, path: '', key: '' },
  } as StoreModule.UseStoreState,
  dispatchStoreAction,
]);

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
  beforeEach(jest.clearAllMocks);

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
    expect(result.current.isOverwriteEnabled).toBe(false);

    act(() => {
      result.current.onToggleOverwrite();
    });

    expect(result.current.isOverwriteEnabled).toBe(true);
  });
});
