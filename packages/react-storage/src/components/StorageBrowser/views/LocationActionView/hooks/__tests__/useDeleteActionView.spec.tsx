import { renderHook, act } from '@testing-library/react-hooks';
import { UseDeleteActionView } from '../useDeleteActionView';
import { useGetLocationConfig } from '../../../../context/config';
import { useControl } from '../../../../context/control';
import { useProcessTasks } from '../../../../tasks';
import { getDeleteActionViewTableData } from '../useDeleteActionView';
import { TaskStatus } from '../../../../tasks';

// Mock the imported hooks and functions
jest.mock('../../../../context/config');
jest.mock('../../../../context/control');
jest.mock('../../../../tasks');
jest.mock('../../../../actions/handlers');

describe('UseDeleteActionView', () => {
  beforeEach(() => {
    // Mock the useGetLocationConfig hook
    (useGetLocationConfig as jest.Mock).mockReturnValue(() => ({
      bucket: 'XXXXXXXXXXX',
      credentialsProvider: 'test-credentials',
      region: 'us-west-2',
      accountId: '123456789012',
    }));

    // Mock the useControl hook
    (useControl as jest.Mock).mockReturnValue([
      { path: 'test-path', selected: { items: [{ key: 'test-item' }] } },
      jest.fn(),
    ]);

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
    const { result } = renderHook(() => UseDeleteActionView());

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

    const { result } = renderHook(() => UseDeleteActionView());

    act(() => {
      result.current.onStart();
    });

    expect(mockProcessTasks).toHaveBeenCalledWith({
      prefix: 'test-path',
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

    const { result } = renderHook(() => UseDeleteActionView());

    act(() => {
      result.current.onCancel();
    });

    expect(mockCancel).toHaveBeenCalled();
  });

  it('should clear the state when onClose is called', () => {
    const mockUpdateState = jest.fn();
    (useControl as jest.Mock).mockReturnValue([
      { path: 'test-path', selected: { items: [{ key: 'test-item' }] } },
      mockUpdateState,
    ]);

    const { result } = renderHook(() => UseDeleteActionView());

    act(() => {
      result.current.onClose();
    });

    expect(mockUpdateState).toHaveBeenCalledWith({ type: 'CLEAR' });
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

    const { result } = renderHook(() => UseDeleteActionView());

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
      jest.fn(),
    ]);

    const { result } = renderHook(() => UseDeleteActionView());

    expect(result.current).toEqual(
      expect.objectContaining({
        disableCancel: true,
        disableClose: true,
        disablePrimary: true,
      })
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
      key: 'file1.txt',
      status: 'QUEUED' as TaskStatus,
      remove: mockRemove,
      cancel: jest.fn(),
      item: {},
      message: '',
      size: 1000,
    },
    {
      key: 'file2.jpg',
      status: 'PENDING' as TaskStatus,
      remove: mockRemove,
      cancel: jest.fn(),
      item: {},
      message: '',
      size: 1000,
    },
    {
      key: 'file3.pdf',
      status: 'COMPLETE' as TaskStatus,
      remove: mockRemove,
      cancel: jest.fn(),
      item: {},
      message: '',
      size: 1000,
    },
    {
      key: 'file4.doc',
      status: 'FAILED' as TaskStatus,
      remove: mockRemove,
      cancel: jest.fn(),
      item: {},
      message: '',
      size: 1000,
    },
    {
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
        key: 'folder/subfolder/file1.txt',
        status: 'QUEUED' as TaskStatus,
        remove: mockRemove,
        cancel: jest.fn(),
        item: {},
        message: '',
        size: 1000,
      },
      {
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
