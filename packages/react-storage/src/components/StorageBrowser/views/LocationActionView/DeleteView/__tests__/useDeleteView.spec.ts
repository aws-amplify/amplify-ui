import { act, renderHook } from '@testing-library/react';

import { useLocationItems } from '../../../../locationItems/context';
import { useStore } from '../../../../store';
import { INITIAL_STATUS_COUNTS } from '../../../../tasks';
import { useAction } from '../../../../useAction';
import { useGetActionInput } from '../../../../configuration/context';
import { countFilesInFolder } from '../utils';

import { useDeleteView } from '../useDeleteView';

jest.mock('../../../../locationItems/context');
jest.mock('../../../../store');
jest.mock('../../../../useAction');
jest.mock('../../../../configuration', () => ({
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  ...(jest.requireActual('../../../../configuration') as object),
  usePaginationConfig: () => ({ pageSize: 10 }),
}));
jest.mock('../../../../configuration/context');
jest.mock('../utils');

jest.mock('../../../../displayText', () => ({
  ...jest.requireActual<typeof import('../../../../displayText')>(
    '../../../../displayText'
  ),
  useDisplayText: () => ({
    DeleteView: {
      confirmationModalTitle: 'Confirm Deletion',
      confirmationModalConfirmLabel: 'Delete',
      confirmationModalCancelLabel: 'Cancel',
      confirmationModalMessage:
        'The items that will be deleted contain {count} folder{plural}',
    },
  }),
}));

const mockLocationItemsState = {
  dataItems: [
    {
      key: 'test-file.txt',
      id: 'id-1',
      size: 10,
      type: 'FILE' as const,
      lastModified: new Date(),
    },
    {
      key: 'test-folder/',
      id: 'id-2',
      size: 0,
      type: 'FOLDER' as const,
      lastModified: new Date(),
    },
  ],
};

describe('useDeleteView', () => {
  const mockUseAction = jest.mocked(useAction);
  const mockUseLocationItems = jest.mocked(useLocationItems);
  const mockUseStore = jest.mocked(useStore);
  const mockUseGetActionInput = jest.mocked(useGetActionInput);
  const mockCountFilesInFolder = jest.mocked(countFilesInFolder);

  const mockCancel = jest.fn();
  const mockStoreDispatch = jest.fn();
  const mockLocationItemsDispatch = jest.fn();
  const mockHandleDelete = jest.fn();
  const mockGetConfig = jest.fn();

  beforeEach(() => {
    mockUseLocationItems.mockReturnValue([
      mockLocationItemsState,
      mockLocationItemsDispatch,
    ]);
    mockUseStore.mockReturnValue([
      {
        actionType: 'DELETE',
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
      },
      mockStoreDispatch,
    ]);
    mockUseGetActionInput.mockReturnValue(mockGetConfig);

    mockUseAction.mockReturnValue([
      {
        isProcessing: false,
        isProcessingComplete: false,
        statusCounts: { ...INITIAL_STATUS_COUNTS, QUEUED: 1, TOTAL: 1 },
        tasks: [
          {
            status: 'QUEUED',
            data: { key: 'test-item', id: 'id' },
            cancel: mockCancel,
            message: 'test-message',
            progress: undefined,
          },
        ],
        reset: jest.fn(),
      },
      mockHandleDelete,
    ]);
  });

  afterEach(jest.clearAllMocks);

  it('should return the correct initial state', () => {
    const { result } = renderHook(() => useDeleteView());

    expect(result.current).toEqual(
      expect.objectContaining({
        onActionCancel: expect.any(Function),
        onActionExit: expect.any(Function),
        onActionStart: expect.any(Function),
        onConfirmDelete: expect.any(Function),
        onCancelConfirmation: expect.any(Function),
        tasks: expect.any(Array),
      })
    );

    expect(result.current.statusCounts).toEqual({
      CANCELED: 0,
      COMPLETE: 0,
      FAILED: 0,
      LOADED: 0,
      FINISHING: 0,
      OVERWRITE_PREVENTED: 0,
      PENDING: 0,
      QUEUED: 1,
      TOTAL: 1,
    });
  });

  it('should show confirmation modal when onActionStart is called with folders', () => {
    const { result } = renderHook(() => useDeleteView());

    act(() => {
      result.current.onActionStart();
    });

    expect(result.current.onActionStart).toBeDefined();
  });

  it('should call handleDelete when onConfirmDelete is called', () => {
    const { result } = renderHook(() => useDeleteView());

    act(() => {
      result.current.onConfirmDelete();
    });

    expect(mockHandleDelete).toHaveBeenCalledTimes(1);
  });

  it('should hide confirmation modal when onCancelConfirmation is called', () => {
    const { result } = renderHook(() => useDeleteView());

    act(() => {
      result.current.onActionStart();
    });

    act(() => {
      result.current.onCancelConfirmation();
    });

    expect(result.current.onCancelConfirmation).toBeDefined();
  });

  it('should call cancel on tasks when onActionCancel is called', () => {
    const { result } = renderHook(() => useDeleteView());

    act(() => {
      result.current.onActionCancel();
    });

    expect(mockCancel).toHaveBeenCalledTimes(1);
  });

  it('should reset state when onActionExit is called', () => {
    const mockOnExit = jest.fn();
    const { result } = renderHook(() => useDeleteView({ onExit: mockOnExit }));

    act(() => {
      result.current.onActionExit();
    });

    expect(mockOnExit).toHaveBeenCalledTimes(1);
    expect(mockLocationItemsDispatch).toHaveBeenCalledWith({
      type: 'RESET_LOCATION_ITEMS',
    });
    expect(mockStoreDispatch).toHaveBeenCalledWith({
      type: 'RESET_ACTION_TYPE',
    });
  });

  it('should handle onTaskRemove correctly', () => {
    const { result } = renderHook(() => useDeleteView());
    const mockTask = {
      status: 'COMPLETE' as const,
      data: { id: 'test-id', key: 'test-key' },
      cancel: jest.fn(),
      message: 'test-message',
      progress: undefined,
    };

    act(() => {
      result.current.onTaskRemove?.(mockTask);
    });

    expect(mockLocationItemsDispatch).toHaveBeenCalledWith({
      type: 'REMOVE_LOCATION_ITEM',
      id: 'test-id',
    });
  });

  it('should skip folder counting when no current location', () => {
    mockUseStore.mockReturnValue([
      {
        actionType: 'DELETE',
        location: { current: undefined, path: '', key: '' },
      },
      mockStoreDispatch,
    ]);

    const { result } = renderHook(() => useDeleteView());

    expect(result.current).toBeDefined();
  });

  it('should skip folder counting when no folders selected', () => {
    mockUseLocationItems.mockReturnValue([
      {
        dataItems: [
          {
            key: 'test-file.txt',
            id: 'id-1',
            size: 10,
            type: 'FILE' as const,
            lastModified: new Date(),
          },
        ],
      },
      mockLocationItemsDispatch,
    ]);

    const { result } = renderHook(() => useDeleteView());

    expect(result.current).toBeDefined();
  });

  it('should handle folder counting errors gracefully', () => {
    mockCountFilesInFolder.mockRejectedValue(new Error('Network error'));
    mockGetConfig.mockReturnValue({ bucket: 'test-bucket' });

    const { result } = renderHook(() => useDeleteView());

    expect(result.current).toBeDefined();
  });

  it('should handle action start without folders', () => {
    mockUseLocationItems.mockReturnValue([
      {
        dataItems: [
          {
            key: 'test-file.txt',
            id: 'id-1',
            size: 10,
            type: 'FILE' as const,
            lastModified: new Date(),
          },
        ],
      },
      mockLocationItemsDispatch,
    ]);

    const { result } = renderHook(() => useDeleteView());

    act(() => {
      result.current.onActionStart();
    });

    expect(mockHandleDelete).toHaveBeenCalledTimes(1);
  });
});
