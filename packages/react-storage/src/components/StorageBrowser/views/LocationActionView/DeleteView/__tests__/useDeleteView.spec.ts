import { act, renderHook } from '@testing-library/react';

import { useLocationItems } from '../../../../locationItems';
import { useStore } from '../../../../store';
import { INITIAL_STATUS_COUNTS } from '../../../../tasks';
import { useAction } from '../../../../useAction';
import { useGetActionInput } from '../../../../configuration/context';

import { useDeleteView } from '../useDeleteView';

jest.mock('../../../../locationItems');
jest.mock('../../../../store');
jest.mock('../../../../useAction');
jest.mock('../../../../configuration/context');

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
        confirmationModal: expect.objectContaining({
          isOpen: false,
        }),
      })
    );
  });

  it('should show confirmation modal when onActionStart is called', () => {
    const { result } = renderHook(() => useDeleteView());

    act(() => {
      result.current.onActionStart();
    });

    expect(result.current.confirmationModal.isOpen).toBe(true);
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

    expect(result.current.confirmationModal.isOpen).toBe(true);

    act(() => {
      result.current.onCancelConfirmation();
    });

    expect(result.current.confirmationModal.isOpen).toBe(false);
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
});
