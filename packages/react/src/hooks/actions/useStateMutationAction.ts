import * as React from 'react';
import { Hub } from 'aws-amplify';

import {
  ACTION_STATE_MUTATION_FINISHED,
  ACTION_STATE_MUTATION_STARTED,
  EVENT_ACTION_CORE_STATE_MUTATION,
  UI_CHANNEL,
} from './constants';
import { AMPLIFY_SYMBOL } from '../../helpers/constants';

type UseStateMutationAction<StateType> = [
  StateType,
  (newState: StateType) => void
];

export const useStateMutationAction = <StateType>(
  initialState: StateType
): UseStateMutationAction<StateType> => {
  const [state, setState] = React.useState(initialState);

  const setNewState = React.useCallback(
    (newState: StateType) => {
      const prevState = state;

      Hub.dispatch(
        UI_CHANNEL,
        {
          event: ACTION_STATE_MUTATION_STARTED,
          data: { prevState, newState },
        },
        EVENT_ACTION_CORE_STATE_MUTATION,
        AMPLIFY_SYMBOL
      );

      setState(newState);

      Hub.dispatch(
        UI_CHANNEL,
        {
          event: ACTION_STATE_MUTATION_FINISHED,
          data: { prevState, newState },
        },
        EVENT_ACTION_CORE_STATE_MUTATION,
        AMPLIFY_SYMBOL
      );
    },
    [state]
  );

  return [state, setNewState];
};
