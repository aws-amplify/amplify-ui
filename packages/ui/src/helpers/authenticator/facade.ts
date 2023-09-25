/**
 * This file contains helpers that translates xstate internals to more
 * understandable authenticator contexts. We provide these contexts with
 * `useAuthenticator` hook/composable/service.
 */

import { Sender } from 'xstate';

import {
  ActorContextWithForms,
  AmplifyUser,
  AuthEvent,
  AuthEventData,
  AuthEventTypes,
  AuthMachineState,
  ChallengeName,
  CodeDeliveryDetails,
  FederatedProvider,
  LoginMechanism,
  NavigableRoute,
  SocialProvider,
  UnverifiedContactMethods,
  ValidationError,
} from '../../types';

import { getActorContext, getActorState } from './actor';
import { NAVIGABLE_ROUTE_EVENT } from './constants';
import { getRoute } from './utils';

export type AuthenticatorRoute =
  | 'authenticated'
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
  | 'transition'
  | 'verifyUser';

type AuthenticatorValidationErrors = ValidationError;
export type AuthStatus = 'configuring' | 'authenticated' | 'unauthenticated';

interface AuthenticatorServiceContextFacade {
  authStatus: AuthStatus;
  codeDeliveryDetails: CodeDeliveryDetails;
  error: string;
  hasValidationErrors: boolean;
  isPending: boolean;
  route: AuthenticatorRoute;
  socialProviders: SocialProvider[];
  totpSecretCode: string | null;
  unverifiedContactMethods: UnverifiedContactMethods;
  user: AmplifyUser;
  validationErrors: AuthenticatorValidationErrors;
}

type SendEventAlias =
  | 'initializeMachine'
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

interface NextAuthenticatorServiceContextFacade {
  challengeName: ChallengeName | undefined;
  codeDeliveryDetails: CodeDeliveryDetails | undefined;
  errorMessage: string | undefined;
  federatedProviders: FederatedProvider[] | undefined;
  loginMechanism: LoginMechanism | undefined;
  isPending: boolean;
  route: AuthenticatorRoute;
  totpSecretCode: string | undefined;
  username: string | undefined;
  unverifiedContactMethods: UnverifiedContactMethods | undefined;
}

type NextSendEventAlias =
  | 'resendCode'
  | 'submitForm'
  | 'toFederatedSignIn'
  | 'skipVerification';

interface NextAuthenticatorSendEventAliases
  extends Pick<AuthenticatorSendEventAliases, NextSendEventAlias> {
  setRoute: (route: NavigableRoute) => void;
}

export interface NextAuthenticatorServiceFacade
  extends NextAuthenticatorSendEventAliases,
    NextAuthenticatorServiceContextFacade {}

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
    initializeMachine: sendToMachine('INIT'),
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

const getNextSendEventAliases = (
  send: Sender<AuthEvent>
): NextAuthenticatorSendEventAliases => {
  const { toFederatedSignIn, submitForm, resendCode, skipVerification } =
    getSendEventAliases(send);
  return {
    resendCode,
    // manual "route" navigation
    setRoute: (route: NavigableRoute) =>
      send({ type: NAVIGABLE_ROUTE_EVENT[route] }),
    skipVerification,
    submitForm,
    toFederatedSignIn,
  };
};

export const getServiceContextFacade = (
  state: AuthMachineState
): AuthenticatorServiceContextFacade => {
  const actorContext = (getActorContext(state) ?? {}) as ActorContextWithForms;
  const {
    codeDeliveryDetails,
    remoteError: error,
    unverifiedContactMethods,
    validationError: validationErrors,
    totpSecretCode = null,
  } = actorContext;

  const { socialProviders } = state.context?.config ?? {};

  // check for user in actorContext prior to state context. actorContext is more "up to date",
  // but is not available on all states
  const user = actorContext?.user ?? state.context?.user;

  const hasValidationErrors =
    validationErrors && Object.keys(validationErrors).length > 0;

  const actorState = getActorState(state);
  const isPending = state.hasTag('pending') || actorState?.hasTag('pending');

  const route = getRoute(state, actorState);

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
    socialProviders,
    totpSecretCode,
    unverifiedContactMethods,
    user,
    validationErrors,
  };
};

export const getNextServiceContextFacade = (
  state: AuthMachineState
): NextAuthenticatorServiceContextFacade => {
  const actorContext = (getActorContext(state) ?? {}) as ActorContextWithForms;
  const {
    codeDeliveryDetails,
    remoteError: errorMessage,
    unverifiedContactMethods,
    totpSecretCode,
  } = actorContext;

  const { socialProviders: federatedProviders, loginMechanisms } =
    state.context?.config ?? {};

  const loginMechanism = loginMechanisms?.[0];

  // check for user in actorContext prior to state context. actorContext is more "up to date",
  // but is not available on all states
  const user = actorContext?.user ?? state.context?.user;
  const { challengeName, username } = user ?? {};
  const actorState = getActorState(state);
  const isPending = state.hasTag('pending') || actorState?.hasTag('pending');

  const route = getRoute(state, actorState);

  return {
    challengeName,
    codeDeliveryDetails,
    errorMessage,
    federatedProviders,
    isPending,
    loginMechanism,
    route,
    totpSecretCode,
    unverifiedContactMethods,
    username,
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

export const getNextServiceFacade = ({
  send,
  state,
}: {
  send: Sender<AuthEvent>;
  state: AuthMachineState;
}): NextAuthenticatorServiceFacade => ({
  ...getNextSendEventAliases(send),
  ...getNextServiceContextFacade(state),
});
