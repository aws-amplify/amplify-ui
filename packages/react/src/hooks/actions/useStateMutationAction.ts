import * as React from 'react';
import { Hub } from '@aws-amplify/core';

import {
  ACTIONS_CHANNEL,
  ACTION_STATE_MUTATION_FINISHED,
  ACTION_STATE_MUTATION_STARTED,
} from './constants';

type StateChangeEvent = React.ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
>;

type UseStateMutationAction = [string, (event: StateChangeEvent) => void];

export const useStateMutationAction = (
  initialState: string
): UseStateMutationAction => {
  const [state, setState] = React.useState(initialState);

  const setNewState = React.useCallback((event: StateChangeEvent) => {
    const newState = event.currentTarget.value;

    Hub.dispatch(ACTIONS_CHANNEL, {
      event: ACTION_STATE_MUTATION_STARTED,
      data: newState,
    });

    setState(newState);

    Hub.dispatch(ACTIONS_CHANNEL, {
      event: ACTION_STATE_MUTATION_FINISHED,
      data: newState,
    });
  }, []);

  return [state, setNewState];
};
