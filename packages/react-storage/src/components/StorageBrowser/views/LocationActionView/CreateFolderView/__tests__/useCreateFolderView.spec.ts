import { renderHook, act } from '@testing-library/react';

import { LocationData } from '../../../../actions';
import { useStore } from '../../../../store';
import { INITIAL_STATUS_COUNTS } from '../../../../tasks';
import { useAction } from '../../../../useAction';

import { useCreateFolderView } from '../useCreateFolderView';

jest.mock('../../../../store');
jest.mock('../../../../useAction');

const location: LocationData = {
  prefix: 'test-prefix/',
  bucket: 'bucket',
  id: 'id',
  permissions: ['write'],
  type: 'PREFIX',
};

describe('useCreateFolderView', () => {
  const mockUseStore = jest.mocked(useStore);
  const mockUseAction = jest.mocked(useAction);
  const mockDispatchStoreAction = jest.fn();
  const mockHandleCreateFolder = jest.fn();

  beforeAll(() => {
    Object.defineProperty(globalThis, 'crypto', {
      value: { randomUUID: () => 'intentionally-static-test-id' },
    });
    mockUseAction.mockReturnValue([
      {
        isProcessing: false,
        isProcessingComplete: false,
        reset: jest.fn(),
        statusCounts: { ...INITIAL_STATUS_COUNTS },
        tasks: [],
      },
      mockHandleCreateFolder,
    ]);
    mockUseStore.mockReturnValue([
      {
        actionType: 'CREATE_FOLDER',
        location: { current: location, path: '', key: 'test-prefix/' },
      },
      mockDispatchStoreAction,
    ]);
  });

  afterEach(() => {
    mockDispatchStoreAction.mockClear();
    mockHandleCreateFolder.mockClear();
  });

  it('should call mockHandleCreateFolder when onActionStart is called', () => {
    const { result } = renderHook(() => useCreateFolderView());

    act(() => {
      result.current.onActionStart();
    });

    expect(mockHandleCreateFolder).toHaveBeenCalledTimes(1);
  });

  it('resets state when onActionExit is called', () => {
    const mockOnExit = jest.fn();
    const { result } = renderHook(() =>
      useCreateFolderView({ onExit: mockOnExit })
    );

    act(() => {
      result.current.onActionExit();
    });

    expect(mockOnExit).toHaveBeenCalled();
    expect(mockDispatchStoreAction).toHaveBeenCalledWith({
      type: 'RESET_ACTION_TYPE',
    });
  });

  it('updates the folderName when onFolderNameChange is called', () => {
    const { result } = renderHook(() => useCreateFolderView());

    expect(result.current.folderName).toBe('');

    const nextFolderName = 'cool-folder-name';

    act(() => {
      result.current.onFolderNameChange(nextFolderName);
    });

    expect(result.current.folderName).toBe(nextFolderName);
  });
});
