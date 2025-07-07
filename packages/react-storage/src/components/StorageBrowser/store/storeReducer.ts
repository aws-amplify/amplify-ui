/* eslint-disable no-console */
import { DEFAULT_STATE } from './constants';
import type { StoreActionType, StoreState } from './types';

export default function storeReducer(
  state: StoreState,
  action: StoreActionType
): StoreState {
  switch (action.type) {
    case 'CHANGE_LOCATION': {
      const { location, path = '' } = action;

      if (
        state.location.current?.id === location.id &&
        state.location.path === path
      ) {
        return state;
      }

      const key = `${location.prefix}${path}`;

      return {
        ...state,
        location: { current: location, path, key },
      };
    }
    case 'RESET_LOCATION': {
      if (state.location.current === undefined) return state;

      return {
        ...state,
        location: DEFAULT_STATE.location,
        selectedObject: undefined,
      };
    }
    case 'CHANGE_ACTION_TYPE': {
      const { actionType } = action;

      if (state.actionType === actionType) {
        return state;
      }

      return { ...state, actionType };
    }
    case 'RESET_ACTION_TYPE': {
      if (state.actionType === undefined) return state;

      return { ...state, actionType: DEFAULT_STATE.actionType };
    }
    case 'VIEW_OBJECT_DETAIL': {
      const { object } = action;
      return {
        ...state,
        selectedObject: object,
      };
    }
  }
}
