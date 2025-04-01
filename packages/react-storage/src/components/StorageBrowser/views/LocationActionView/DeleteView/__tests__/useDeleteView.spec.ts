import { renderHook, act } from '@testing-library/react';

import { useStore } from '../../../../providers/store';
import { useAction } from '../../../../useAction';
import { FileDataItem } from '../../../../actions';

import { useDeleteView } from '../useDeleteView';
import { INITIAL_STATUS_COUNTS } from '../../../../tasks';

jest.mock('../../../../providers/store');
jest.mock('../../../../useAction');

const fileDataItems: FileDataItem[] = [
  {
    key: 'pretend-prefix/test-file.txt',
    fileKey: 'test-file.txt',
    lastModified: new Date(),
    id: 'id-1',
    size: 10,
    type: 'FILE',
  },
  {
    key: 'pretend-prefix/deeply-nested/test-file.txt',
    fileKey: 'test-file.txt',
    lastModified: new Date(),
    id: 'id-2',
    size: 10,
    type: 'FILE',
  },
];

describe('useDeleteView', () => {
  const mockUseAction = jest.mocked(useAction);
  const mockUseStore = jest.mocked(useStore);
  const mockCancel = jest.fn();
  const mockDispatchStoreAction = jest.fn();
  const mockHandleDelete = jest.fn();
  const mockReset = jest.fn();

  beforeEach(() => {
    mockUseStore.mockReturnValue([
      {
        actionType: 'DELETE',
        files: [],
        location: {
          current: {
            prefix: 'test-prefix/',
            bucket: 'bucket',
            id: 'id',
            permissions: ['delete'],
            type: 'PREFIX',
          },
          path: '',
          key: 'test-prefix/',
        },
        locationItems: { fileDataItems },
      },
      mockDispatchStoreAction,
    ]);

    mockUseAction.mockReturnValue([
      {
        isProcessing: false,
        isProcessingComplete: false,
        reset: mockReset,
        statusCounts: { ...INITIAL_STATUS_COUNTS, QUEUED: 3, TOTAL: 3 },
        tasks: [
          {
            status: 'QUEUED',
            data: { key: 'test-item', id: 'id' },
            cancel: mockCancel,
            message: 'test-message',
            progress: undefined,
          },
          {
            status: 'QUEUED',
            data: { key: 'test-item2', id: 'id2' },
            cancel: mockCancel,
            message: 'test-message',
            progress: undefined,
          },
          {
            status: 'QUEUED',
            data: { key: 'test-item3', id: 'id3' },
            cancel: mockCancel,
            message: 'test-message',
            progress: undefined,
          },
        ],
      },
      mockHandleDelete,
    ]);
  });

  afterEach(() => {
    mockCancel.mockClear();
    mockDispatchStoreAction.mockClear();
    mockHandleDelete.mockClear();
    mockReset.mockClear();
    mockUseAction.mockReset();
    mockUseStore.mockReset();
  });

  it('should return the correct initial state', () => {
    const { result } = renderHook(() => useDeleteView());

    expect(result.current).toEqual(
      expect.objectContaining({
        onActionCancel: expect.any(Function),
        onActionExit: expect.any(Function),
        onActionStart: expect.any(Function),
        tasks: expect.any(Array),
      })
    );

    expect(result.current.statusCounts).toEqual({
      CANCELED: 0,
      COMPLETE: 0,
      FAILED: 0,
      OVERWRITE_PREVENTED: 0,
      PENDING: 0,
      QUEUED: 3,
      TOTAL: 3,
    });
  });

  it('should call processTasks when onActionStart is called', () => {
    const { result } = renderHook(() => useDeleteView());

    act(() => {
      result.current.onActionStart();
    });

    expect(mockHandleDelete).toHaveBeenCalledTimes(1);
  });

  it('should call cancel on tasks when onActionCancel is called', () => {
    const { result } = renderHook(() => useDeleteView());

    act(() => {
      result.current.onActionCancel();
    });

    expect(mockCancel).toHaveBeenCalledTimes(3);
  });

  it('should reset state when onActionExit is called', () => {
    const mockOnExit = jest.fn();
    const { result } = renderHook(() => useDeleteView({ onExit: mockOnExit }));

    act(() => {
      result.current.onActionExit();
    });

    expect(mockOnExit).toHaveBeenCalled();
    expect(mockDispatchStoreAction).toHaveBeenCalledWith({
      type: 'RESET_LOCATION_ITEMS',
    });
    expect(mockDispatchStoreAction).toHaveBeenCalledWith({
      type: 'RESET_ACTION_TYPE',
    });
  });

  it('provides the unmodified value of `fileDataItems` to `useAction` as `items`', () => {
    renderHook(() => useDeleteView());

    expect(mockUseAction).toHaveBeenCalledTimes(1);
    expect(mockUseAction).toHaveBeenCalledWith(
      'delete',
      expect.objectContaining({ items: fileDataItems })
    );
  });
});
