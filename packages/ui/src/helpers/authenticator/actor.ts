/**
 * This file contains helpers that lets you easily access current actor's state
 * and context.
 */

import {
  AuthActorContext,
  AuthActorState,
  AuthMachineState,
} from '../../types';

/**
 * Get the state of current actor. This is useful for checking which screen
 * to render: e.g. `getActorState(state).matches('confirmSignUp.edit').
 */
export const getActorState = (state: AuthMachineState): AuthActorState => {
  return state.context.actorRef?.getSnapshot();
};

/**
 * Get the context of current actor. Useful for getting any nested context
 * like remoteError.
 */
export const getActorContext = (state: AuthMachineState): AuthActorContext => {
  return getActorState(state)?.context;
};
