import * as React from 'react';
import { Hub } from '@aws-amplify/core';

import {
  ACTIONS_CHANNEL,
  ACTION_STATE_MUTATION_FINISHED,
  ACTION_STATE_MUTATION_STARTED,
} from './constants';

type UseStateMutationAction<T> = [T, (newState: T) => void];

export const useStateMutationAction = <T>(
  initialState: T
): UseStateMutationAction<T> => {
  const [state, setState] = React.useState(initialState);

  const setNewState = React.useCallback(
    (newState: T) => {
      const oldState = state;

      Hub.dispatch(ACTIONS_CHANNEL, {
        event: ACTION_STATE_MUTATION_STARTED,
        data: { oldState, newState },
      });

      setState(newState);

      Hub.dispatch(ACTIONS_CHANNEL, {
        event: ACTION_STATE_MUTATION_FINISHED,
        data: { oldState, newState },
      });
    },
    [state]
  );

  return [state, setNewState];
};
