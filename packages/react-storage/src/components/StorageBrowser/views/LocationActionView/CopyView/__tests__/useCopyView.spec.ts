import { renderHook, act } from '@testing-library/react';

import { LocationData } from '../../../../actions';
import { useStore } from '../../../../store';
import { useLocationItems } from '../../../../locationItems/context';
import { INITIAL_STATUS_COUNTS } from '../../../../tasks';
import { useAction } from '../../../../useAction';

import { useFolders } from '../useFolders';
import { useCopyView } from '../useCopyView';

jest.mock('../../../../locationItems/context');
jest.mock('../../../../store');
jest.mock('../../../../useAction');
jest.mock('../useFolders');

const location = {
  current: {
    prefix: 'test-prefix/',
    bucket: 'bucket',
    id: 'id',
    permissions: ['delete', 'get', 'list', 'write'],
    type: 'PREFIX',
  } as LocationData,
  path: '',
  key: 'test-prefix/',
};

const fileDataItems = [
  {
    key: 'pre-pre/test-file.txt',
    fileKey: 'test-file.txt',
    lastModified: new Date(),
    sourceKey: 'source-key-one',
    id: '1',
    size: 10,
    type: 'FILE' as const,
  },
];

describe('useCopyView', () => {
  const mockLocationItemsState = { fileDataItems };

  const mockUseAction = jest.mocked(useAction);
  const mockUseFolders = jest.mocked(useFolders);
  const mockUseLocationItems = jest.mocked(useLocationItems);
  const mockUseStore = jest.mocked(useStore);

  const mockCancel = jest.fn();
  const mockLocationItemsDispatch = jest.fn();
  const mockStoreDispatch = jest.fn();
  const mockHandleCopy = jest.fn();

  const mockActionState = {
    isProcessing: false,
    isProcessingComplete: false,
    reset: jest.fn(),
    statusCounts: { ...INITIAL_STATUS_COUNTS, QUEUED: 3, TOTAL: 3 },
    tasks: [
      {
        status: 'QUEUED' as const,
        data: fileDataItems[0],
        cancel: mockCancel,
        message: 'test-message',
        progress: undefined,
      },
      {
        status: 'QUEUED' as const,
        data: {
          key: 'test-item-two',
          id: 'id2',
          fileKey: 'file-key-two',
          lastModified: new Date(),
          sourceKey: 'source-key-two',
        },
        cancel: mockCancel,
        message: 'test-message',
        progress: undefined,
      },
      {
        status: 'QUEUED' as const,
        data: {
          key: 'test-item-three',
          id: 'id3',
          fileKey: 'file-key-three',
          lastModified: new Date(),
          sourceKey: 'source-key-three',
        },
        cancel: mockCancel,
        message: 'test-message',
        progress: undefined,
      },
    ],
  };

  let mockId = 0;

  beforeEach(() => {
    // reset mockId
    mockId = 0;

    // @ts-expect-error partial mock
    mockUseFolders.mockReturnValue({
      onInitialize: jest.fn(),
    });

    mockUseLocationItems.mockReturnValue([
      mockLocationItemsState,
      mockLocationItemsDispatch,
    ]);

    Object.defineProperty(globalThis, 'crypto', {
      value: { randomUUID: () => ++mockId },
    });
  });

  beforeEach(() => {
    mockUseAction.mockReturnValue([mockActionState, mockHandleCopy]);
    mockUseStore.mockReturnValue([
      { actionType: 'COPY', location },
      mockStoreDispatch,
    ]);
  });

  afterEach(jest.clearAllMocks);

  it('should return the correct initial state', () => {
    const { result } = renderHook(() => useCopyView());

    expect(result.current).toEqual(
      expect.objectContaining({
        isProcessing: false,
        isProcessingComplete: false,
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
    const { result } = renderHook(() => useCopyView());

    act(() => {
      result.current.onActionStart();
    });

    expect(mockHandleCopy).toHaveBeenCalledTimes(1);
  });

  it('should call cancel on tasks when onActionCancel is called', () => {
    const { result } = renderHook(() => useCopyView());

    act(() => {
      result.current.onActionCancel();
    });

    expect(mockCancel).toHaveBeenCalledTimes(3);
  });

  it('should reset state when onActionExit is called', () => {
    const mockOnExit = jest.fn();
    const { result } = renderHook(() => useCopyView({ onExit: mockOnExit }));

    act(() => {
      result.current.onActionExit();
    });

    expect(mockOnExit).toHaveBeenCalled();
    expect(mockLocationItemsDispatch).toHaveBeenCalledTimes(1);
    expect(mockLocationItemsDispatch).toHaveBeenCalledWith({
      type: 'RESET_LOCATION_ITEMS',
    });
    expect(mockStoreDispatch).toHaveBeenCalledTimes(1);
    expect(mockStoreDispatch).toHaveBeenCalledWith({
      type: 'RESET_ACTION_TYPE',
    });
  });

  it('should set a destination', () => {
    const { result } = renderHook(() => useCopyView());

    expect(result.current.destination).toStrictEqual(location);

    const destinationLocation = {
      ...location.current,
      id: 'id-2',
    };
    const destinationPath = 'test-path/';

    act(() => {
      result.current.onSelectDestination(destinationLocation, destinationPath);
    });

    expect(result.current.destination).toStrictEqual({
      current: destinationLocation,
      path: destinationPath,
      key: `${location.current.prefix}${destinationPath}`,
    });
  });

  it('calls `locationItemsDispatch` with the expected action from `onTaskRemove`', () => {
    const { result } = renderHook(() => useCopyView());

    const { onTaskRemove } = result.current;

    const task = mockActionState.tasks[0];

    act(() => {
      onTaskRemove?.(task);
    });

    expect(mockLocationItemsDispatch).toHaveBeenCalledTimes(1);
    expect(mockLocationItemsDispatch).toHaveBeenCalledWith({
      type: 'REMOVE_LOCATION_ITEM',
      id: fileDataItems[0].id,
    });
  });
});
