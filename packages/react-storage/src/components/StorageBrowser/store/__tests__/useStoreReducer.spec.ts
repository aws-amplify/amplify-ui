import { act, renderHook } from '@testing-library/react';
import { useControlledReducer } from '@aws-amplify/ui-react-core';

import { DEFAULT_STATE } from '../constants';
import {
  StorageBrowserEventValue,
  StoreActionType,
  StoreState,
} from '../types';
import { getState, getInitialState } from '../utils';

import storeReducer from '../storeReducer';
import useStoreReducer from '../useStoreReducer';
import { LocationData } from '../../actions';

jest.mock('@aws-amplify/ui-react-core');
jest.mock('../utils');
jest.mock('../validateStoreProps');

const mockGetState = jest.mocked(getState);
const mockGetInitialState = jest.mocked(getInitialState);
const mockUseControlledReducer = jest.mocked(useControlledReducer);

describe('useStoreReducer', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('provides the expected values to `mockUseControlledReducer` when provided empty props', () => {
    mockGetInitialState.mockReturnValue(DEFAULT_STATE);

    renderHook(() => useStoreReducer({}));

    expect(mockGetState).not.toHaveBeenCalled();

    expect(mockGetInitialState).toHaveBeenCalledTimes(1);
    expect(mockGetInitialState).toHaveBeenCalledWith(undefined, {});

    expect(mockUseControlledReducer).toHaveBeenCalledWith(
      storeReducer,
      DEFAULT_STATE,
      { controlledState: undefined, onStateChange: expect.any(Function) }
    );
  });

  it('provides the expected values to `mockUseControlledReducer` when provided `value` prop', () => {
    mockGetInitialState.mockReturnValue(DEFAULT_STATE);
    mockGetState.mockReturnValue(DEFAULT_STATE);

    renderHook(() => useStoreReducer({ value: null }));

    expect(mockGetState).toHaveBeenCalledTimes(1);
    expect(mockGetState).toHaveBeenCalledWith(null);

    expect(mockGetInitialState).toHaveBeenCalledTimes(1);
    expect(mockGetInitialState).toHaveBeenCalledWith(undefined, {});

    expect(mockUseControlledReducer).toHaveBeenCalledWith(
      storeReducer,
      DEFAULT_STATE,
      { controlledState: DEFAULT_STATE, onStateChange: expect.any(Function) }
    );
  });

  it('provides the expected shape of `value` to `onValueChange` on `state` change', () => {
    let mockState: StoreState;
    mockUseControlledReducer.mockImplementation(
      (_, state: StoreState, options) => {
        const { onStateChange } = options ?? {};

        mockState = state;

        return [
          state,
          (action: StoreActionType) => {
            mockState = storeReducer(mockState, action);

            onStateChange?.(mockState);
          },
        ];
      }
    );

    const onValueChange = jest.fn();

    const { result } = renderHook(() => useStoreReducer({ onValueChange }));

    const dispatch = result.current[1];

    const nextLocation: LocationData = {
      bucket: 'next-bucket',
      id: 'next-id',
      permissions: ['delete'],
      prefix: 'next-prefix',
      type: 'PREFIX',
    };

    // set next location
    act(() => {
      dispatch({ type: 'CHANGE_LOCATION', location: nextLocation });
    });

    const locationChangeEvent: StorageBrowserEventValue = {
      actionType: undefined,
      location: { ...nextLocation, path: '' },
    };

    expect(onValueChange).toHaveBeenCalledTimes(1);
    expect(onValueChange).toHaveBeenCalledWith(locationChangeEvent);

    const nextActionType = 'some-action';

    // set next action type
    act(() => {
      dispatch({ type: 'CHANGE_ACTION_TYPE', actionType: nextActionType });
    });

    const actionTypeChangeEvent: StorageBrowserEventValue = {
      actionType: nextActionType,
      location: { ...nextLocation, path: '' },
    };

    expect(onValueChange).toHaveBeenCalledTimes(2);
    expect(onValueChange).toHaveBeenCalledWith(actionTypeChangeEvent);

    // reset location type
    act(() => {
      dispatch({ type: 'RESET_LOCATION' });
    });

    const resetLocationChangeEvent: StorageBrowserEventValue = {
      actionType: nextActionType,
      location: undefined,
    };

    expect(onValueChange).toHaveBeenCalledTimes(3);
    expect(onValueChange).toHaveBeenCalledWith(resetLocationChangeEvent);
  });
});
