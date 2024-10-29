import { renderHook, act } from '@testing-library/react';
import { useDeleteActionView } from '../useDeleteActionView';
import { getDeleteActionViewTableData } from '../../utils';
import * as Store from '../../../../providers/store';
import * as Config from '../../../../providers/configuration';
import * as Tasks from '../../../../tasks';
import { TaskStatus } from '../../../../tasks';

const mockProcessTasks = jest.fn();
const mockDispatchStoreAction = jest.fn();

describe('useDeleteActionView', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    jest.spyOn(Store, 'useStore').mockReturnValue([
      {
        actionType: 'DELETE',
        files: [],
        history: {
          current: {
            prefix: 'test-prefix/',
            bucket: 'bucket',
            id: 'id',
            permission: 'READ',
            type: 'PREFIX',
          },
          previous: [
            {
              prefix: 'test-prefix/',
              bucket: 'bucket',
              id: 'id',
              permission: 'READ',
              type: 'PREFIX',
            },
          ],
        },
        locationItems: {
          fileDataItems: [
            {
              key: 'test-file.txt',
              lastModified: new Date(),
              id: 'id',
              size: 10,
              type: 'FILE',
            },
          ],
        },
      },
      mockDispatchStoreAction,
    ]);

    jest.spyOn(Config, 'useGetActionInput').mockReturnValue(() => ({
      accountId: '123456789012',
      bucket: 'XXXXXXXXXXX',
      credentials: jest.fn(),
      region: 'us-west-2',
    }));

    // Mock the useProcessTasks hook
    jest.spyOn(Tasks, 'useProcessTasks').mockReturnValue([
      [
        {
          key: 'test-item',
          status: 'QUEUED',
          id: 'id',
          item: {},
          cancel: jest.fn(),
          remove: jest.fn(),
          message: 'test-message',
        },
        {
          key: 'test-item2',
          status: 'QUEUED',
          id: 'id2',
          item: {},
          cancel: jest.fn(),
          remove: jest.fn(),
          message: 'test-message',
        },
        {
          key: 'test-item3',
          status: 'QUEUED',
          id: 'id3',
          item: {},
          cancel: jest.fn(),
          remove: jest.fn(),
          message: 'test-message',
        },
      ],
      mockProcessTasks,
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
        tasks: expect.any(Array),
      })
    );

    expect(result.current.taskCounts).toEqual({
      CANCELED: 0,
      COMPLETE: 0,
      FAILED: 0,
      INITIAL: 0,
      PENDING: 0,
      QUEUED: 3,
      TOTAL: 3,
    });
  });

  it('should call processTasks when onStart is called', () => {
    const { result } = renderHook(() => useDeleteActionView({}));

    act(() => {
      result.current.onStart();
    });

    expect(mockProcessTasks).toHaveBeenCalledWith({
      prefix: 'test-prefix/',
      config: {
        accountId: '123456789012',
        bucket: 'XXXXXXXXXXX',
        credentials: expect.any(Function),
        region: 'us-west-2',
      },
    });
  });

  it('should call cancel on tasks when onCancel is called', () => {
    const mockCancel = jest.fn();
    jest.spyOn(Tasks, 'useProcessTasks').mockReturnValue([
      [
        {
          key: 'test-item',
          status: 'QUEUED',
          id: 'id',
          item: {},
          cancel: mockCancel(),
          remove: jest.fn(),
          message: 'test-message',
        },
      ],
      mockProcessTasks,
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
      type: 'RESET_LOCATION_ITEMS',
    });
    expect(mockDispatchStoreAction).toHaveBeenCalledWith({
      type: 'RESET_ACTION_TYPE',
    });
  });

  it('should disable close and primary when some tasks in progress', () => {
    jest.spyOn(Tasks, 'useProcessTasks').mockReturnValue([
      [
        {
          key: 'item1',
          status: 'QUEUED',
          id: 'id',
          item: {},
          cancel: jest.fn(),
          remove: jest.fn(),
          message: 'test-message',
        },
        {
          key: 'item1',
          status: 'COMPLETE',
          id: 'id',
          item: {},
          cancel: jest.fn(),
          remove: jest.fn(),
          message: 'test-message',
        },
        {
          key: 'item2',
          status: 'PENDING',
          id: 'id',
          item: {},
          cancel: jest.fn(),
          remove: jest.fn(),
          message: 'test-message',
        },
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
    jest.spyOn(Tasks, 'useProcessTasks').mockReturnValue([
      [
        {
          key: 'item1',
          status: 'PENDING',
          id: 'id',
          item: {},
          cancel: jest.fn(),
          remove: jest.fn(),
          message: 'test-message',
        },
        {
          key: 'item1',
          status: 'PENDING',
          id: 'id',
          item: {},
          cancel: jest.fn(),
          remove: jest.fn(),
          message: 'test-message',
        },
        {
          key: 'item2',
          status: 'COMPLETE',
          id: 'id',
          item: {},
          cancel: jest.fn(),
          remove: jest.fn(),
          message: 'test-message',
        },
      ],
      jest.fn(),
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

  it('should disable cancel, primary, but allow close when all tasks in progress or complete', () => {
    jest.spyOn(Tasks, 'useProcessTasks').mockReturnValue([
      [
        {
          key: 'item1',
          status: 'COMPLETE',
          id: 'id',
          item: {},
          cancel: jest.fn(),
          remove: jest.fn(),
          message: 'test-message',
        },
        {
          key: 'item1',
          status: 'COMPLETE',
          id: 'id',
          item: {},
          cancel: jest.fn(),
          remove: jest.fn(),
          message: 'test-message',
        },
        {
          key: 'item2',
          status: 'COMPLETE',
          id: 'id',
          item: {},
          cancel: jest.fn(),
          remove: jest.fn(),
          message: 'test-message',
        },
      ],
      jest.fn(),
    ]);

    const { result } = renderHook(() => useDeleteActionView({}));

    expect(result.current).toEqual(
      expect.objectContaining({
        disableCancel: true,
        disableClose: false,
        disablePrimary: true,
      })
    );
  });

  it('should provide tasks data and task counts', () => {
    const { result } = renderHook(() => useDeleteActionView({}));

    expect(result.current.tasks).toEqual(expect.any(Array));
    expect(result.current.taskCounts).toEqual({
      CANCELED: 0,
      COMPLETE: 0,
      FAILED: 0,
      INITIAL: 0,
      PENDING: 0,
      QUEUED: 3,
      TOTAL: 3,
    });
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
      (cell) => cell.key === 'action-1'
    )[0];
    expect(actionCell.content).toHaveProperty('onClick');
    expect(actionCell.content).toHaveProperty(
      'ariaLabel',
      'Cancel item: folder/subfolder/file1.txt'
    );
    expect(result.rows).toMatchSnapshot();
  });
});
