import { renderHook } from '@testing-library/react';
import { useActionType } from '../actionType';
import { useFiles } from '../files';
import { useLocation } from '../location';
import { useLocationItems } from '../locationItems';
import { HandleStoreAction, useStore } from '../useStore';
import { FileItem } from '../../../actions';

jest.mock('../../../controls/context');
jest.mock('../actionType');
jest.mock('../files');
jest.mock('../location');
jest.mock('../locationItems');

describe('useStore', () => {
  const locationData = {
    bucket: 'bucket',
    id: 'id',
    permissions: ['write' as const],
    prefix: '',
    type: 'PREFIX' as const,
  };
  const actionTypeState = 'action-type';
  const filesState: FileItem[] = [];
  const locationState = { current: locationData, path: '', key: '' };
  const locationItemsState = { fileDataItems: [] };

  const mockUseActionType = jest.mocked(useActionType);
  const mocktUseFiles = jest.mocked(useFiles);
  const mocktUseLocation = jest.mocked(useLocation);
  const mocktUseLocationItems = jest.mocked(useLocationItems);
  const mockDispatchActionType = jest.fn();
  const mockDispatchFilesAction = jest.fn();
  const mockDispatchLocationAction = jest.fn();
  const mockDispatchLocationItemsAction = jest.fn();

  const expectActions = (actions: Parameters<HandleStoreAction>[number][]) => {
    const { result } = renderHook(() => useStore());
    const [, dispatchStoreAction] = result.current;
    return {
      toHaveBeenDispatchedBy: (dispatcher: HandleStoreAction) => {
        actions.forEach((action, index) => {
          // dispatch each action as a store action
          dispatchStoreAction(action);
          // assert that that the correct sub-dispatcher was invoked
          expect(dispatcher).toHaveBeenNthCalledWith(index + 1, action);
        });
      },
    };
  };

  beforeEach(() => {
    mockUseActionType.mockReturnValue([
      actionTypeState,
      mockDispatchActionType,
    ]);
    mocktUseFiles.mockReturnValue([filesState, mockDispatchFilesAction]);
    mocktUseLocation.mockReturnValue([
      locationState,
      mockDispatchLocationAction,
    ]);
    mocktUseLocationItems.mockReturnValue([
      locationItemsState,
      mockDispatchLocationItemsAction,
    ]);
  });

  afterEach(() => {
    mockUseActionType.mockClear();
    mocktUseFiles.mockClear();
    mocktUseLocation.mockClear();
    mocktUseLocationItems.mockClear();
  });

  it('returns store state', () => {
    const { result } = renderHook(() => useStore());

    expect(result.current).toStrictEqual([
      {
        actionType: actionTypeState,
        files: filesState,
        location: locationState,
        locationItems: locationItemsState,
      },
      expect.any(Function),
    ]);
  });

  it('dispatches actionType action', () => {
    expectActions([
      { type: 'SET_ACTION_TYPE', actionType: 'new-action-type' },
      { type: 'RESET_ACTION_TYPE' },
    ]).toHaveBeenDispatchedBy(mockDispatchActionType);
  });

  it('dispatches files action', () => {
    expectActions([
      { type: 'ADD_FILE_ITEMS' },
      { type: 'REMOVE_FILE_ITEM', id: 'file-id' },
      { type: 'SELECT_FILES' },
      { type: 'RESET_FILE_ITEMS' },
    ]).toHaveBeenDispatchedBy(mockDispatchFilesAction);
  });

  it('dispatches location action', () => {
    expectActions([
      { type: 'NAVIGATE', location: locationData },
      { type: 'RESET_LOCATION' },
    ]).toHaveBeenDispatchedBy(mockDispatchLocationAction);
  });

  it('dispatches locationItems action', () => {
    expectActions([
      { type: 'SET_LOCATION_ITEMS' },
      { type: 'REMOVE_LOCATION_ITEM', id: 'file-id' },
      { type: 'RESET_LOCATION_ITEMS' },
    ]).toHaveBeenDispatchedBy(mockDispatchLocationItemsAction);
  });
});
