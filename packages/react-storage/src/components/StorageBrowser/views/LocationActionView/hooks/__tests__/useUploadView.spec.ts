import { renderHook, act } from '@testing-library/react-hooks';
import { useUploadView } from '../useUploadView';
import * as ConfigModule from '../../../../providers/configuration';
import * as StoreModule from '../../../../providers/store';
import * as TasksModule from '../../../../tasks';

const useStoreSpy = jest.spyOn(StoreModule, 'useStore');
const useProcessTasksSpy = jest.spyOn(TasksModule, 'useProcessTasks');
const rootLocation = {
  id: 'an-id-👍🏼',
  bucket: 'test-bucket',
  permission: 'READWRITE',
  // a root `prefix` is an empty string
  prefix: '',
  type: 'PREFIX',
};
const dispatchStoreAction = jest.fn();
useStoreSpy.mockReturnValue([
  {
    history: { current: rootLocation, previous: [rootLocation] },
  } as StoreModule.UseStoreState,
  dispatchStoreAction,
]);
const credentials = jest.fn();
const config: ConfigModule.GetActionInput = jest.fn(() => ({
  credentials,
  bucket: rootLocation.bucket,
  region: 'region',
}));
const testFile = new File([], 'test-ooo');
const fileItem = { id: 'some-uuid', item: testFile, key: testFile.name };

jest.spyOn(ConfigModule, 'useGetActionInput').mockReturnValue(config);
const handleProcessTasks = jest.fn();

describe('useUploadView', () => {
  beforeAll(() => {});
  it('should return the same tasks as received from other hooks', () => {
    const tasks: TasksModule.Task<File>[] = [
      {
        ...fileItem,
        cancel: undefined,
        message: undefined,
        remove: jest.fn(),
        status: 'QUEUED',
      },
    ];
    useProcessTasksSpy.mockReturnValue([tasks, handleProcessTasks]);
    const { result } = renderHook(() => useUploadView({}));

    expect(result.current.tasks).toBe(tasks);
  });

  it('should return all isDisabled flags as true when all tasks are compconste and none are canceled nor pending', () => {
    const tasks: TasksModule.Task<File>[] = [
      {
        ...fileItem,
        cancel: undefined,
        message: undefined,
        remove: jest.fn(),
        status: 'FAILED',
      },
      {
        ...fileItem,
        cancel: undefined,
        message: undefined,
        remove: jest.fn(),
        status: 'COMPLETE',
      },
    ];

    useProcessTasksSpy.mockReturnValue([tasks, handleProcessTasks]);
    const { result } = renderHook(() => useUploadView({}));

    expect(result.current.tasks).toBe(tasks);
    expect(result.current.disableStart).toBe(true);
    expect(result.current.isOverwriteDisabled).toBe(true);
    expect(result.current.isSelectFilesDisabled).toBe(true);
    expect(result.current.disableCancel).toBe(true);
  });

  it('should return disableStart as true and disableCancel as false when there are only pending tasks', () => {
    const tasks: TasksModule.Task<File>[] = [
      {
        ...fileItem,
        cancel: undefined,
        message: undefined,
        remove: jest.fn(),
        status: 'PENDING',
      },
    ];

    useProcessTasksSpy.mockReturnValue([tasks, handleProcessTasks]);
    const { result } = renderHook(() => useUploadView({}));

    expect(result.current.tasks).toBe(tasks);
    expect(result.current.disableCancel).toBe(false);
    expect(result.current.disableStart).toBe(true);
  });

  it('should return only disableCancel as true when there are are only queued tasks', () => {
    const tasks: TasksModule.Task<File>[] = [
      {
        ...fileItem,
        cancel: undefined,
        message: undefined,
        remove: jest.fn(),
        status: 'QUEUED',
      },
    ];

    useProcessTasksSpy.mockReturnValue([tasks, handleProcessTasks]);
    const { result } = renderHook(() => useUploadView({}));

    expect(result.current.tasks).toBe(tasks);
    expect(result.current.disableCancel).toBe(true);
    expect(result.current.disableStart).toBe(false);
    expect(result.current.isOverwriteDisabled).toBe(false);
    expect(result.current.isSelectFilesDisabled).toBe(false);
  });

  describe('callbacks', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should dispatchStoreAction when onDropFiles is invoked', () => {
      const { result } = renderHook(() => useUploadView({}));
      act(() => {
        result.current.onDropFiles([testFile]);
      });
      expect(dispatchStoreAction).toHaveBeenCalledTimes(1);
      expect(dispatchStoreAction).toHaveBeenCalledWith({
        type: 'ADD_FILE_ITEMS',
        files: [testFile],
      });
    });

    it('should dispatchStoreAction when onSelectFiles is invoked with different types', () => {
      const { result } = renderHook(() => useUploadView({}));
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
    it('should call handleProcess with the expected values', () => {
      const tasks: TasksModule.Task<File>[] = [
        {
          ...fileItem,
          cancel: undefined,
          message: undefined,
          remove: jest.fn(),
          status: 'QUEUED',
        },
      ];
      useProcessTasksSpy.mockReturnValue([tasks, handleProcessTasks]);
      const { result } = renderHook(() => useUploadView({}));
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
        prefix: '',
      });
    });
    it('should call cancel on each task when onCancel is invoked', () => {
      const tasks: TasksModule.Task<File>[] = [
        {
          ...fileItem,
          cancel: jest.fn(),
          message: undefined,
          remove: jest.fn(),
          status: 'QUEUED',
        },
        {
          ...fileItem,
          cancel: jest.fn(),
          message: undefined,
          remove: jest.fn(),
          status: 'QUEUED',
        },
      ];
      useProcessTasksSpy.mockReturnValue([tasks, handleProcessTasks]);
      const { result } = renderHook(() => useUploadView({}));
      act(() => {
        result.current.onActionCancel();
      });
      expect(tasks[0].cancel).toHaveBeenCalledTimes(1);
      expect(tasks[1].cancel).toHaveBeenCalledTimes(1);
    });

    it('should call remove on each task, call onClose and dispatch actions when onClose is invoked', () => {
      const tasks: TasksModule.Task<File>[] = [
        {
          ...fileItem,
          cancel: jest.fn(),
          message: undefined,
          remove: jest.fn(),
          status: 'QUEUED',
        },
        {
          ...fileItem,
          cancel: jest.fn(),
          message: undefined,
          remove: jest.fn(),
          status: 'QUEUED',
        },
      ];
      useProcessTasksSpy.mockReturnValue([tasks, handleProcessTasks]);
      const onClose = jest.fn();
      const { result } = renderHook(() => useUploadView({ onClose }));
      act(() => {
        result.current.onClose();
      });
      expect(tasks[0].remove).toHaveBeenCalledTimes(1);
      expect(tasks[1].remove).toHaveBeenCalledTimes(1);
      expect(onClose).toHaveBeenCalledTimes(1);
      expect(dispatchStoreAction.mock.calls).toEqual([
        [{ type: 'RESET_FILE_ITEMS' }],
        [{ type: 'RESET_ACTION_TYPE' }],
      ]);
    });
    it('should change preventOverwrite state when onToggleOverwrite callback is called', () => {
      const { result } = renderHook(() => useUploadView({}));
      act(() => {
        result.current.onToggleOverwrite();
      });
      expect(result.current.preventOverwrite).toBe(false);
    });
  });
});
