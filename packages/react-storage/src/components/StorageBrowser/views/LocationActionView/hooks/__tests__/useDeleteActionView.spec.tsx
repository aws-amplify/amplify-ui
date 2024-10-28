import { renderHook, act } from '@testing-library/react-hooks';
import {
  useDeleteActionView,
  getDeleteActionViewTableData,
} from '../useDeleteActionView';
import { useStore } from '../../../../providers/store';
import { useGetActionInput } from '../../../../providers/configuration';
import { useProcessTasks } from '../../../../tasks';
import {} from '../useDeleteActionView';
import { TaskStatus } from '../../../../tasks';

// Mock the imported hooks and functions
jest.mock('../../../../providers/store');
jest.mock('../../../../providers/configuration');
jest.mock('../../../../tasks');

describe('useDeleteActionView', () => {
  const mockDispatchStoreAction = jest.fn();
  const mockHandleProcess = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useStore as jest.Mock).mockReturnValue([
      {
        history: { current: { prefix: 'test-prefix/' } },
        locationItems: { fileDataItems: [{ key: 'test-file.txt' }] },
      },
      mockDispatchStoreAction,
    ]);

    (useGetActionInput as jest.Mock).mockReturnValue(() => ({
      accountId: '123456789012',
      bucket: 'XXXXXXXXXXX',
      credentials: 'test-credentials',
      region: 'us-west-2',
    }));

    // Mock the useProcessTasks hook
    (useProcessTasks as jest.Mock).mockReturnValue([
      [
        { key: 'test-item', status: 'QUEUED' },
        { key: 'test-item2', status: 'QUEUED' },
        { key: 'test-item3', status: 'QUEUED' },
      ],
      jest.fn(),
    ]);
  });

  it('should return the correct initial state', () => {
    const { result } = renderHook(() => useDeleteActionView({}));

    expect(result.current).toEqual(
      expect.objectContaining({
        disableCancel: true,
        disableClose: false,
        disablePrimary: false,
        onCancel: expect.any(Function),
        onClose: expect.any(Function),
        onStart: expect.any(Function),
      })
    );

    expect(result.current.controlsContextValue).toEqual(
      expect.objectContaining({
        data: expect.any(Object),
        actionsConfig: { type: 'BATCH_ACTION', isCancelable: true },
      })
    );
  });

  it('should call processTasks when onStart is called', () => {
    const mockProcessTasks = jest.fn();
    (useProcessTasks as jest.Mock).mockReturnValue([[], mockProcessTasks]);

    const { result } = renderHook(() => useDeleteActionView({}));

    act(() => {
      result.current.onStart();
    });

    expect(mockProcessTasks).toHaveBeenCalledWith({
      prefix: 'test-prefix/',
      config: {
        accountId: '123456789012',
        bucket: 'XXXXXXXXXXX',
        credentials: 'test-credentials',
        region: 'us-west-2',
      },
    });
  });

  it('should call cancel on tasks when onCancel is called', () => {
    const mockCancel = jest.fn();
    (useProcessTasks as jest.Mock).mockReturnValue([
      [{ key: 'test-item', status: 'PENDING', cancel: mockCancel }],
      jest.fn(),
    ]);

    const { result } = renderHook(() => useDeleteActionView({}));

    act(() => {
      result.current.onCancel();
    });

    expect(mockCancel).toHaveBeenCalled();
  });

  it('should reset state when onClose is called', () => {
    const mockOnClose = jest.fn();
    const { result } = renderHook(() =>
      useDeleteActionView({ onClose: mockOnClose })
    );

    act(() => {
      result.current.onClose();
    });

    expect(mockOnClose).toHaveBeenCalled();
    expect(mockDispatchStoreAction).toHaveBeenCalledWith({
      type: 'RESET_FILE_ITEMS',
    });
    expect(mockDispatchStoreAction).toHaveBeenCalledWith({
      type: 'RESET_ACTION_TYPE',
    });
  });

  it('should disable close and primary when some tasks in progress', () => {
    (useProcessTasks as jest.Mock).mockReturnValue([
      [
        { key: 'item1', status: 'QUEUED' },
        { key: 'item1', status: 'COMPLETE' },
        { key: 'item2', status: 'PENDING' },
      ],
      jest.fn(),
    ]);

    const { result } = renderHook(() => useDeleteActionView({}));

    expect(result.current).toEqual(
      expect.objectContaining({
        disableCancel: false,
        disableClose: true,
        disablePrimary: true,
      })
    );
  });

  it('should disable cancel, close and primary when all tasks in progress or complete', () => {
    (useProcessTasks as jest.Mock).mockReturnValue([
      [
        { key: 'item1', status: 'PENDING' },
        { key: 'item2', status: 'PENDING' },
        { key: 'item1', status: 'COMPLETE' },
      ],
      mockHandleProcess,
    ]);

    const { result } = renderHook(() => useDeleteActionView({}));

    expect(result.current).toEqual(
      expect.objectContaining({
        disableCancel: true,
        disableClose: true,
        disablePrimary: true,
      })
    );
  });

  it('should provide table data in controlsContextValue', () => {
    const { result } = renderHook(() => useDeleteActionView({}));

    expect(result.current.controlsContextValue.data).toEqual({
      taskCounts: expect.any(Object),
      tableData: expect.any(Object),
    });
    expect(
      result.current.controlsContextValue.data?.tableData?.headers
    ).toEqual(expect.any(Array));
    expect(result.current.controlsContextValue.data?.tableData?.rows).toEqual(
      expect.any(Array)
    );
  });
});

describe('getDeleteActionViewTableData', () => {
  const mockRemove = jest.fn();
  const taskCounts = {
    INITIAL: 0,
    QUEUED: 1,
    PENDING: 1,
    FAILED: 1,
    COMPLETE: 1,
    CANCELED: 1,
    TOTAL: 5,
  };
  const tasks = [
    {
      id: '1',
      key: 'file1.txt',
      status: 'QUEUED' as TaskStatus,
      remove: mockRemove,
      cancel: jest.fn(),
      item: {},
      message: '',
      size: 1000,
    },
    {
      id: '2',
      key: 'file2.jpg',
      status: 'PENDING' as TaskStatus,
      remove: mockRemove,
      cancel: jest.fn(),
      item: {},
      message: '',
      size: 1000,
    },
    {
      id: '3',
      key: 'file3.pdf',
      status: 'COMPLETE' as TaskStatus,
      remove: mockRemove,
      cancel: jest.fn(),
      item: {},
      message: '',
      size: 1000,
    },
    {
      id: '4',
      key: 'file4.doc',
      status: 'FAILED' as TaskStatus,
      remove: mockRemove,
      cancel: jest.fn(),
      item: {},
      message: '',
      size: 1000,
    },
    {
      id: '5',
      key: 'file5',
      status: 'CANCELED' as TaskStatus,
      remove: mockRemove,
      cancel: jest.fn(),
      item: {},
      message: '',
      size: 1000,
    },
  ];

  it('should return correct table data for all task statuses', () => {
    const result = getDeleteActionViewTableData({
      tasks,
      taskCounts,
      path: '',
    });

    expect(result.rows).toMatchSnapshot('tabledata');
  });

  it('should handle tasks with prefix keys', () => {
    const taskCounts = {
      INITIAL: 0,
      QUEUED: 1,
      PENDING: 0,
      FAILED: 0,
      COMPLETE: 1,
      CANCELED: 0,
      TOTAL: 2,
    };
    const tasksWithPaths = [
      {
        id: '1',
        key: 'folder/subfolder/file1.txt',
        status: 'QUEUED' as TaskStatus,
        remove: mockRemove,
        cancel: jest.fn(),
        item: {},
        message: '',
        size: 1000,
      },
      {
        id: '2',
        key: '/root/file2.jpg',
        status: 'COMPLETE' as TaskStatus,
        remove: mockRemove,
        cancel: jest.fn(),
        item: {},
        message: '',
        size: 1000,
      },
    ];

    const result = getDeleteActionViewTableData({
      tasks: tasksWithPaths,
      taskCounts,
      path: '',
    });

    expect(result.rows).toMatchSnapshot();
  });

  it('should have remove handler on queued files', () => {
    const taskCounts = {
      INITIAL: 0,
      QUEUED: 1,
      PENDING: 0,
      FAILED: 0,
      COMPLETE: 1,
      CANCELED: 0,
      TOTAL: 2,
    };
    const mockRemove = jest.fn();
    const mockCancel = jest.fn();
    const tasksWithPaths = [
      {
        id: '1',
        key: 'folder/subfolder/file1.txt',
        status: 'QUEUED' as TaskStatus,
        remove: mockRemove,
        cancel: mockCancel,
        item: {},
        message: '',
        size: 1000,
      },
    ];

    const result = getDeleteActionViewTableData({
      tasks: tasksWithPaths,
      taskCounts,
      path: 'folder/subfolder/',
    });
    const actionCell = result.rows[0].content.filter(
      (cell) => cell.key === 'action-folder/subfolder/file1.txt'
    )[0];
    expect(actionCell.content).toHaveProperty('onClick');
    expect(actionCell.content).toHaveProperty(
      'ariaLabel',
      'Cancel item: folder/subfolder/file1.txt'
    );
    expect(result.rows).toMatchSnapshot();
  });
});
