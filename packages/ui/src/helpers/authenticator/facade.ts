/**
 * This file contains helpers that translates xstate internals to more
 * understandable authenticator contexts. We provide these contexts with
 * `useAuthenticator` hook/composable/service.
 */

import { Sender } from 'xstate';

import {
  ActorContextWithForms,
  AuthEvent,
  AuthEventData,
  AuthEventTypes,
  AuthMachineState,
} from '../../types';
import { getActorContext, getActorState } from './actor';

/**
 * Creates public facing auth helpers that abstracts out xstate implementation
 * detail. Each framework implementation can export these helpers so that
 * developers can send events without having to learn internals.
 *
 * ```
 * const [state, send] = useActor(...);
 * const { submit } = getSendEventAliases(send);
 * submit({ username, password})
 * ```
 */
export const getSendEventAliases = (send: Sender<AuthEvent>) => {
  const sendToMachine = (type: AuthEventTypes) => {
    // TODO If these were created during the creation of the machine & provider,
    // then invalid transitions could be caught via https://xstate.js.org/docs/guides/states.html#state-can-event
    return (data?: AuthEventData) => send({ type, data });
  };

  return {
    resendCode: sendToMachine('RESEND'),
    signOut: sendToMachine('SIGN_OUT'),
    submitForm: sendToMachine('SUBMIT'),
    updateForm: sendToMachine('CHANGE'),
    updateBlur: sendToMachine('BLUR'),

    // Actions that don't immediately invoke a service but instead transition to a screen
    // are prefixed with `to*`

    toFederatedSignIn: sendToMachine('FEDERATED_SIGN_IN'),
    toResetPassword: sendToMachine('RESET_PASSWORD'),
    toSignIn: sendToMachine('SIGN_IN'),
    toSignUp: sendToMachine('SIGN_UP'),
    skipVerification: sendToMachine('SKIP'),
  } as const;
};

export const getServiceContextFacade = (state: AuthMachineState) => {
  const user = state.context?.user;
  const actorState = getActorState(state);
  const actorContext = getActorContext(state) as ActorContextWithForms;
  const error = actorContext?.remoteError;
  const validationErrors = { ...actorContext?.validationError };
  const codeDeliveryDetails = actorContext?.codeDeliveryDetails;
  const hasValidationErrors = Object.keys(validationErrors).length > 0;
  const isPending =
    state.hasTag('pending') || getActorState(state)?.hasTag('pending');

  // Any additional idle states added beyond (idle, setup) should be updated inside the authStatus below as well
  const route = (() => {
    switch (true) {
      case state.matches('idle'):
        return 'idle';
      case state.matches('setup'):
        return 'setup';
      case state.matches('signOut'):
        return 'signOut';
      case state.matches('authenticated'):
        return 'authenticated';
      case actorState?.matches('confirmSignUp'):
        return 'confirmSignUp';
      case actorState?.matches('confirmSignIn'):
        return 'confirmSignIn';
      case actorState?.matches('setupTOTP'):
        return 'setupTOTP';
      case actorState?.matches('signIn'):
        return 'signIn';
      case actorState?.matches('signUp'):
        return 'signUp';
      case actorState?.matches('forceNewPassword'):
        return 'forceNewPassword';
      case actorState?.matches('resetPassword'):
        return 'resetPassword';
      case actorState?.matches('confirmResetPassword'):
        return 'confirmResetPassword';
      case actorState?.matches('verifyUser'):
        return 'verifyUser';
      case actorState?.matches('confirmVerifyUser'):
        return 'confirmVerifyUser';
      default:
        console.debug(
          'Cannot infer `route` from Authenticator state:',
          state.value
        );
        return null;
    }
  })();

  // Auth status represents the current state of the auth flow
  // The `configuring` state is used to indicate when the xState machine is loading
  const authStatus = ((route) => {
    switch (route) {
      case 'idle':
      case 'setup':
        return 'configuring';
      case 'authenticated':
        return 'authenticated';
      default:
        return 'unauthenticated';
    }
  })(route);

  return {
    error,
    hasValidationErrors,
    isPending,
    route,
    authStatus,
    user,
    validationErrors,
    codeDeliveryDetails,
  };
};

export const getServiceFacade = ({ send, state }) => {
  const sendEventAliases = getSendEventAliases(send);
  const serviceContext = getServiceContextFacade(state);

  return {
    ...sendEventAliases,
    ...serviceContext,
  };
};
