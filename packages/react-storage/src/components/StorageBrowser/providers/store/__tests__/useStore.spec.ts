import { renderHook } from '@testing-library/react';

import { useActionType } from '../actionType';
import { useLocation } from '../location';
import { HandleStoreAction, useStore } from '../useStore';

jest.mock('../actionType');
jest.mock('../location');

describe('useStore', () => {
  const actionTypeState = 'action-type';
  const locationData = {
    bucket: 'bucket',
    id: 'id',
    permissions: ['write' as const],
    prefix: '',
    type: 'PREFIX' as const,
  };
  const locationState = { current: locationData, path: '', key: '' };

  const mockUseActionType = jest.mocked(useActionType);
  const mocktUseLocation = jest.mocked(useLocation);

  const mockActionTypeDispatch = jest.fn();
  const mockLocationDispatch = jest.fn();

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
      mockActionTypeDispatch,
    ]);

    mocktUseLocation.mockReturnValue([locationState, mockLocationDispatch]);
  });

  afterEach(jest.clearAllMocks);

  it('returns store state', () => {
    const { result } = renderHook(() => useStore());

    expect(result.current).toStrictEqual([
      {
        actionType: actionTypeState,

        location: locationState,
      },
      expect.any(Function),
    ]);
  });

  it('dispatches actionType action', () => {
    expectActions([
      { type: 'SET_ACTION_TYPE', actionType: 'new-action-type' },
      { type: 'RESET_ACTION_TYPE' },
    ]).toHaveBeenDispatchedBy(mockActionTypeDispatch);
  });

  it('dispatches location action', () => {
    expectActions([
      { type: 'NAVIGATE', location: locationData },
      { type: 'RESET_LOCATION' },
    ]).toHaveBeenDispatchedBy(mockLocationDispatch);
  });
});
