import * as React from 'react';
import { Hub } from 'aws-amplify';

import {
  ACTIONS_CHANNEL,
  ACTION_STATE_MUTATION_FINISHED,
  ACTION_STATE_MUTATION_STARTED,
} from './constants';

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

      Hub.dispatch(ACTIONS_CHANNEL, {
        event: ACTION_STATE_MUTATION_STARTED,
        data: { prevState, newState },
      });

      setState(newState);

      Hub.dispatch(ACTIONS_CHANNEL, {
        event: ACTION_STATE_MUTATION_FINISHED,
        data: { prevState, newState },
      });
    },
    [state]
  );

  return [state, setNewState];
};
