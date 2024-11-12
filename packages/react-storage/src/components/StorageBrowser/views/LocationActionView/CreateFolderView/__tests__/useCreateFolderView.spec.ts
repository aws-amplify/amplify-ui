import { renderHook, act } from '@testing-library/react';

import * as StoreModule from '../../../../providers/store';
import * as ConfigModule from '../../../../providers/configuration';
import * as TasksModule from '../../../../tasks';

import { useCreateFolderView } from '../useCreateFolderView';

const mockDispatchStoreAction = jest.fn();

const credentials = jest.fn();
const config = {
  accountId: '123456789012',
  bucket: 'XXXXXXXXXXX',
  credentials,
  region: 'us-west-2',
};
jest.spyOn(ConfigModule, 'useGetActionInput').mockReturnValue(() => config);

const defaultProcessingState = {
  isProcessing: false,
  isProcessingComplete: false,
  statusCounts: { ...TasksModule.INITIAL_STATUS_COUNTS },
  tasks: [],
};

const handleProcessTasks = jest.fn();
jest
  .spyOn(TasksModule, 'useProcessTasks')
  .mockReturnValue([defaultProcessingState, handleProcessTasks]);

const location = {
  prefix: 'test-prefix/',
  bucket: 'bucket',
  id: 'id',
  permission: 'READWRITE',
  type: 'PREFIX',
} as const;

jest.spyOn(StoreModule, 'useStore').mockReturnValue([
  {
    actionType: 'CREATE_FOLDER',
    files: [],
    location: { current: location, path: '', key: 'test-prefix/' },
    locationItems: { fileDataItems: undefined },
  },
  mockDispatchStoreAction,
]);

describe('useCreateFolderView', () => {
  beforeAll(() => {
    Object.defineProperty(globalThis, 'crypto', {
      value: { randomUUID: () => 'intentionally-static-test-id' },
    });
  });

  afterEach(jest.clearAllMocks);

  it('should call handleProcessTasks when onActionStart is called', () => {
    const { result } = renderHook(() => useCreateFolderView());

    act(() => {
      result.current.onActionStart();
    });

    expect(handleProcessTasks).toHaveBeenCalledWith({
      config,
      data: { id: 'intentionally-static-test-id', key: '/' },
      destinationPrefix: 'test-prefix/',
      options: { preventOverwrite: true },
    });
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
