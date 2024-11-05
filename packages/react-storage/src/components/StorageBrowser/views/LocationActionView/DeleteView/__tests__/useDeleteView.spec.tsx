import { renderHook, act } from '@testing-library/react';
import { getActionViewTableData } from '../../utils';
import * as Store from '../../../../providers/store';
import * as Config from '../../../../providers/configuration';
import * as Tasks from '../../../../tasks';
import { LocationData } from '../../../../actions';
import { FileData } from '../../../../actions/handlers';

import { useDeleteView } from '../useDeleteView';

const mockProcessTasks = jest.fn();
const mockDispatchStoreAction = jest.fn();

const credentials = jest.fn();
jest.spyOn(Config, 'useGetActionInput').mockReturnValue(() => ({
  accountId: '123456789012',
  bucket: 'XXXXXXXXXXX',
  credentials,
  region: 'us-west-2',
}));

describe('useDeleteView', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    jest.spyOn(Store, 'useStore').mockReturnValue([
      {
        actionType: 'DELETE',
        files: [],
        location: {
          current: {
            prefix: 'test-prefix/',
            bucket: 'bucket',
            id: 'id',
            permission: 'READ',
            type: 'PREFIX',
          },
          path: '',
          key: 'test-prefix/',
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

    // Mock the useProcessTasks hook
    jest.spyOn(Tasks, 'useProcessTasks').mockReturnValue([
      {
        isProcessing: false,
        tasks: [
          {
            status: 'QUEUED',
            data: { key: 'test-item', id: 'id' },
            cancel: jest.fn(),
            remove: jest.fn(),
            message: 'test-message',
            progress: undefined,
          },
          {
            status: 'QUEUED',
            data: { key: 'test-item2', id: 'id2' },
            cancel: jest.fn(),
            remove: jest.fn(),
            message: 'test-message',
            progress: undefined,
          },
          {
            status: 'QUEUED',
            data: { key: 'test-item3', id: 'id3' },
            cancel: jest.fn(),
            remove: jest.fn(),
            message: 'test-message',
            progress: undefined,
          },
        ],
      },
      mockProcessTasks,
    ]);
  });

  it('should return the correct initial state', () => {
    const { result } = renderHook(() => useDeleteView({}));

    expect(result.current).toEqual(
      expect.objectContaining({
        disableCancel: true,
        disableClose: false,
        disablePrimary: false,
        onActionCancel: expect.any(Function),
        onExit: expect.any(Function),
        onActionStart: expect.any(Function),
        tasks: expect.any(Array),
      })
    );

    expect(result.current.taskCounts).toEqual({
      CANCELED: 0,
      COMPLETE: 0,
      FAILED: 0,
      INITIAL: 0,
      OVERWRITE_PREVENTED: 0,
      PENDING: 0,
      QUEUED: 3,
      TOTAL: 3,
    });
  });

  it('should call processTasks when onActionStart is called', () => {
    const { result } = renderHook(() => useDeleteView({}));

    act(() => {
      result.current.onActionStart();
    });

    expect(mockProcessTasks).toHaveBeenCalledWith({
      config: {
        accountId: '123456789012',
        bucket: 'XXXXXXXXXXX',
        credentials,
        region: 'us-west-2',
      },
    });
  });

  it('should call cancel on tasks when onActionCancel is called', () => {
    const mockCancel = jest.fn();
    jest.spyOn(Tasks, 'useProcessTasks').mockReturnValue([
      {
        isProcessing: false,
        tasks: [
          {
            data: { key: 'test-item', id: 'id' },
            status: 'QUEUED',
            cancel: mockCancel(),
            remove: jest.fn(),
            message: 'test-message',
            progress: undefined,
          },
        ],
      },
      mockProcessTasks,
    ]);

    const { result } = renderHook(() => useDeleteView({}));

    act(() => {
      result.current.onActionCancel();
    });

    expect(mockCancel).toHaveBeenCalled();
  });

  it('should reset state when onExit is called', () => {
    const mockOnExit = jest.fn();
    const { result } = renderHook(() => useDeleteView({ onExit: mockOnExit }));

    act(() => {
      result.current.onExit({} as LocationData);
    });

    expect(mockOnExit).toHaveBeenCalled();
    expect(mockDispatchStoreAction).toHaveBeenCalledWith({
      type: 'RESET_LOCATION_ITEMS',
    });
    expect(mockDispatchStoreAction).toHaveBeenCalledWith({
      type: 'RESET_ACTION_TYPE',
    });
  });

  it('should disable close and primary when some tasks in progress', () => {
    jest.spyOn(Tasks, 'useProcessTasks').mockReturnValue([
      {
        isProcessing: true,
        tasks: [
          {
            data: { key: 'item1', id: 'id1' },
            progress: undefined,
            status: 'QUEUED',
            cancel: jest.fn(),
            remove: jest.fn(),
            message: 'test-message',
          },
          {
            data: { key: 'item2', id: 'id2' },
            progress: undefined,
            status: 'COMPLETE',
            cancel: jest.fn(),
            remove: jest.fn(),
            message: 'test-message',
          },
          {
            data: { key: 'item3', id: 'id3' },
            progress: undefined,
            status: 'PENDING',
            cancel: jest.fn(),
            remove: jest.fn(),
            message: 'test-message',
          },
        ],
      },
      jest.fn(),
    ]);

    const { result } = renderHook(() => useDeleteView({}));

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
      {
        isProcessing: true,
        tasks: [
          {
            data: { id: 'id1', key: 'item1' },
            progress: undefined,
            status: 'PENDING',
            cancel: jest.fn(),
            remove: jest.fn(),
            message: 'test-message',
          },
          {
            data: { id: 'id2', key: 'item2' },
            progress: undefined,
            status: 'PENDING',
            cancel: jest.fn(),
            remove: jest.fn(),
            message: 'test-message',
          },
          {
            data: { id: 'id3', key: 'item3' },
            progress: undefined,
            status: 'COMPLETE',
            cancel: jest.fn(),
            remove: jest.fn(),
            message: 'test-message',
          },
        ],
      },
      jest.fn(),
    ]);

    const { result } = renderHook(() => useDeleteView({}));

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
      {
        isProcessing: false,
        tasks: [
          {
            data: { id: 'id1', key: 'item1' },
            progress: undefined,
            status: 'COMPLETE',
            cancel: jest.fn(),
            remove: jest.fn(),
            message: 'test-message',
          },
          {
            data: { id: 'id2', key: 'item2' },
            progress: undefined,
            status: 'COMPLETE',
            cancel: jest.fn(),
            remove: jest.fn(),
            message: 'test-message',
          },
          {
            data: { id: 'id3', key: 'item3' },
            progress: undefined,
            status: 'COMPLETE',
            cancel: jest.fn(),
            remove: jest.fn(),
            message: 'test-message',
          },
        ],
      },
      jest.fn(),
    ]);

    const { result } = renderHook(() => useDeleteView({}));

    expect(result.current).toEqual(
      expect.objectContaining({
        disableCancel: true,
        disableClose: false,
        disablePrimary: true,
      })
    );
  });

  it('should provide tasks data and task counts', () => {
    const { result } = renderHook(() => useDeleteView({}));

    expect(result.current.tasks).toEqual(expect.any(Array));
    expect(result.current.taskCounts).toEqual({
      CANCELED: 0,
      COMPLETE: 0,
      FAILED: 0,
      INITIAL: 0,
      OVERWRITE_PREVENTED: 0,
      PENDING: 0,
      QUEUED: 3,
      TOTAL: 3,
    });
  });
});

describe('getActionViewTableData', () => {
  const mockRemove = jest.fn();
  const taskCounts = {
    INITIAL: 0,
    QUEUED: 1,
    PENDING: 1,
    FAILED: 1,
    COMPLETE: 1,
    CANCELED: 1,
    OVERWRITE_PREVENTED: 0,
    TOTAL: 5,
  };
  const tasks: Tasks.Tasks<FileData> = [
    {
      data: {
        id: '1',
        key: 'file1.txt',
        lastModified: new Date(),
        size: 1000,
        type: 'FILE',
      },
      status: 'QUEUED',
      remove: mockRemove,
      cancel: jest.fn(),
      message: '',
      progress: undefined,
    },
    {
      data: {
        id: '2',
        key: 'file2.jpg',
        lastModified: new Date(),
        size: 1000,
        type: 'FILE',
      },
      status: 'PENDING',
      remove: mockRemove,
      cancel: jest.fn(),
      message: '',
      progress: undefined,
    },
    {
      data: {
        id: '3',
        key: 'file3.pdf',
        lastModified: new Date(),
        size: 1000,
        type: 'FILE',
      },
      status: 'COMPLETE',
      remove: mockRemove,
      cancel: jest.fn(),
      message: '',
      progress: undefined,
    },
    {
      data: {
        id: '4',
        key: 'file4.doc',
        lastModified: new Date(),
        size: 1000,
        type: 'FILE',
      },
      status: 'FAILED',
      remove: mockRemove,
      cancel: jest.fn(),
      message: '',
      progress: undefined,
    },
    {
      data: {
        id: '5',
        key: 'file5',
        lastModified: new Date(),
        size: 1000,
        type: 'FILE',
      },
      status: 'CANCELED',
      remove: mockRemove,
      cancel: jest.fn(),
      message: '',
      progress: undefined,
    },
  ];

  it('should return correct table data for all task statuses', () => {
    const result = getActionViewTableData({
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
      OVERWRITE_PREVENTED: 0,
      TOTAL: 2,
    };
    const tasksWithPaths: Tasks.Tasks<FileData> = [
      {
        data: {
          id: '1',
          key: 'folder/subfolder/file1.txt',
          lastModified: new Date(),
          size: 1000,
          type: 'FILE',
        },
        status: 'QUEUED',
        remove: mockRemove,
        cancel: jest.fn(),
        progress: undefined,
        message: '',
      },
      {
        data: {
          id: '2',
          key: '/root/file2.jpg',
          lastModified: new Date(),
          size: 1000,
          type: 'FILE',
        },
        status: 'COMPLETE',
        remove: mockRemove,
        cancel: jest.fn(),
        message: '',
        progress: undefined,
      },
    ];

    const result = getActionViewTableData({
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
      OVERWRITE_PREVENTED: 0,
      TOTAL: 2,
    };
    const mockRemove = jest.fn();
    const mockCancel = jest.fn();
    const tasksWithPaths: Tasks.Tasks<FileData> = [
      {
        data: {
          id: '1',
          key: 'folder/subfolder/file1.txt',
          lastModified: new Date(),
          size: 1000,
          type: 'FILE',
        },
        status: 'QUEUED',
        remove: mockRemove,
        cancel: mockCancel,
        progress: undefined,
        message: '',
      },
    ];

    const result = getActionViewTableData({
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
