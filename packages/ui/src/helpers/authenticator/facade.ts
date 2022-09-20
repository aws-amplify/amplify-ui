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
  CodeDeliveryDetails,
  AmplifyUser,
  ValidationError,
} from '../../types';

import { getActorContext, getActorState } from './actor';

type AuthenticatorRoute =
  | 'authenticated'
  | 'autoSignIn'
  | 'confirmResetPassword'
  | 'confirmSignIn'
  | 'confirmSignUp'
  | 'confirmVerifyUser'
  | 'forceNewPassword'
  | 'idle'
  | 'resetPassword'
  | 'setup'
  | 'signOut'
  | 'setupTOTP'
  | 'signIn'
  | 'signUp'
  | 'verifyUser';

type AuthenticatorValidationErrors = ValidationError;
type AuthStatus = 'configuring' | 'authenticated' | 'unauthenticated';

interface AuthenticatorServiceContextFacade {
  authStatus: AuthStatus;
  codeDeliveryDetails: CodeDeliveryDetails;
  error: string;
  hasValidationErrors: boolean;
  isPending: boolean;
  route: AuthenticatorRoute;
  user: AmplifyUser;
  validationErrors: AuthenticatorValidationErrors;
}

type SendEventAlias =
  | 'resendCode'
  | 'signOut'
  | 'submitForm'
  | 'updateForm'
  | 'updateBlur'
  | 'toFederatedSignIn'
  | 'toResetPassword'
  | 'toSignIn'
  | 'toSignUp'
  | 'skipVerification';

type AuthenticatorSendEventAliases = Record<
  SendEventAlias,
  (data?: AuthEventData) => void
>;

export interface AuthenticatorServiceFacade
  extends AuthenticatorSendEventAliases,
    AuthenticatorServiceContextFacade {}

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
export const getSendEventAliases = (
  send: Sender<AuthEvent>
): AuthenticatorSendEventAliases => {
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
  };
};

export const getServiceContextFacade = (
  state: AuthMachineState
): AuthenticatorServiceContextFacade => {
  const actorState = getActorState(state);
  const actorContext = (getActorContext(state) ?? {}) as ActorContextWithForms;
  const {
    codeDeliveryDetails,
    remoteError: error,
    validationError: validationErrors,
  } = actorContext;

  // check for user in actorContext prior to state context. actorContext is more "up to date",
  // but is not available on all states
  const user = actorContext?.user ?? state.context?.user;

  const hasValidationErrors =
    validationErrors && Object.keys(validationErrors).length > 0;
  const isPending = state.hasTag('pending') || actorState?.hasTag('pending');

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
      case actorState?.matches('autoSignIn'):
        return 'autoSignIn';
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
    authStatus,
    codeDeliveryDetails,
    error,
    hasValidationErrors,
    isPending,
    route,
    user,
    validationErrors,
  };
};

export const getServiceFacade = ({
  send,
  state,
}: {
  send: Sender<AuthEvent>;
  state: AuthMachineState;
}): AuthenticatorServiceFacade => {
  const sendEventAliases = getSendEventAliases(send);
  const serviceContext = getServiceContextFacade(state);

  return {
    ...sendEventAliases,
    ...serviceContext,
  };
};
