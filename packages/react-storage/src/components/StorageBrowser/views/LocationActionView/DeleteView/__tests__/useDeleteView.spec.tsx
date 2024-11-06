import { renderHook, act } from '@testing-library/react';

import * as Store from '../../../../providers/store';
import * as Config from '../../../../providers/configuration';
import * as Tasks from '../../../../tasks';
import { LocationData } from '../../../../actions';

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
        isProcessingComplete: false,
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
        disableStart: false,
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
        isProcessingComplete: false,
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

  it('should disable close and start when some tasks in progress', () => {
    jest.spyOn(Tasks, 'useProcessTasks').mockReturnValue([
      {
        isProcessing: true,
        isProcessingComplete: false,
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
        disableStart: true,
      })
    );
  });

  it('should disable cancel, close and primary when all tasks in progress or complete', () => {
    jest.spyOn(Tasks, 'useProcessTasks').mockReturnValue([
      {
        isProcessing: true,
        isProcessingComplete: false,
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
        isProcessingComplete: false,
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
        disableStart: true,
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
