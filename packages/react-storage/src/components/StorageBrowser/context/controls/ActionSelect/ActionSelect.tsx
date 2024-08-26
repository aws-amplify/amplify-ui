import React from 'react';
import { LocationItem } from '../../actions';
import { LocationActions } from '../locationActions';

const INITIAL_STATE: Omit<ActionSelectState, 'actions'> = {
  selected: {
    type: undefined,
    items: undefined,
  },
};

const getInitialState = (actions: LocationActions): ActionSelectState => ({
  ...INITIAL_STATE,
  actions,
});

export type ActionSelectAction<T = string> =
  | { type: 'CLEAR' }
  | { type: 'SET_ACTION'; payload: T }
  | { type: 'SET_LOCATION_ITEM'; item: LocationItem }
  | { type: 'UNSET_LOCATION_ITEM'; key: string };

export interface ActionSelectState<T = string> {
  readonly actions: LocationActions;
  selected: {
    type: T | undefined;
    items: LocationItem[] | undefined;
  };
}

export type ActionSelectStateContext = [
  state: ActionSelectState,
  handleUpdateState: (action: ActionSelectAction) => void,
];

export function actionSelectReducer(
  state: ActionSelectState,
  action: ActionSelectAction
): ActionSelectState {
  switch (action.type) {
    case 'SET_ACTION': {
      return {
        ...state,
        selected: { ...state.selected, type: action.payload },
      };
    }
    case 'CLEAR': {
      // reset state
      return getInitialState(state.actions);
    }
  }
  return state;
}

export const ActionSelectContext = React.createContext<
  ActionSelectStateContext | undefined
>(undefined);

export interface ActionSelectProviderProps {
  actions: LocationActions;
  children?: React.ReactNode;
}

export function ActionSelectProvider({
  actions,
  children,
}: ActionSelectProviderProps): React.JSX.Element {
  const value = React.useReducer(actionSelectReducer, actions, getInitialState);
  return (
    <ActionSelectContext.Provider value={value}>
      {children}
    </ActionSelectContext.Provider>
  );
}
