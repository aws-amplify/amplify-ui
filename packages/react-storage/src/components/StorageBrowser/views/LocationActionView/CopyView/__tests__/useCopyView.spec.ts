import { renderHook, act } from '@testing-library/react';

import { LocationData } from '../../../../actions';
import { useStore } from '../../../../providers/store';
import { INITIAL_STATUS_COUNTS } from '../../../../tasks';
import { useAction } from '../../../../useAction';

import { useCopyView } from '../useCopyView';
import { useFolders } from '../useFolders';

jest.mock('../../../../providers/store');
jest.mock('../../../../useAction');
jest.mock('../useFolders');

describe('useCopyView', () => {
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
  const mockUseAction = jest.mocked(useAction);
  const mockUseFolders = jest.mocked(useFolders);
  const mockUseStore = jest.mocked(useStore);
  const mockCancel = jest.fn();
  const mockDispatchStoreAction = jest.fn();
  const mockHandleCopy = jest.fn();

  beforeAll(() => {
    // @ts-expect-error partial mock
    mockUseFolders.mockReturnValue({
      onInitialize: jest.fn(),
    });

    Object.defineProperty(globalThis, 'crypto', {
      value: { randomUUID: () => 'intentionally-static-test-id' },
    });
  });

  beforeEach(() => {
    mockUseAction.mockReturnValue([
      {
        isProcessing: false,
        isProcessingComplete: false,
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
      mockHandleCopy,
    ]);
    mockUseStore.mockReturnValue([
      {
        actionType: 'COPY',
        files: [],
        location,
        locationItems: {
          fileDataItems: [
            {
              key: 'pre-pre/test-file.txt',
              fileKey: 'test-file.txt',
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
  });

  afterEach(() => {
    mockCancel.mockClear();
    mockDispatchStoreAction.mockClear();
    mockHandleCopy.mockClear();
    mockUseFolders.mockClear();
    mockUseAction.mockReset();
    mockUseStore.mockReset();
  });

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
    expect(mockDispatchStoreAction).toHaveBeenCalledWith({
      type: 'RESET_LOCATION_ITEMS',
    });
    expect(mockDispatchStoreAction).toHaveBeenCalledWith({
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
});
