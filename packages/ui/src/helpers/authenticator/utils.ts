/**
 * This file contains general helpers that state machine or authenticator
 * implementations can use.
 */

import { Hub } from '@aws-amplify/core';
import {
  Category,
  AuthAction,
  SetCustomUserAgentInput,
} from '@aws-amplify/core/internals/utils';
import { waitFor } from 'xstate/lib/waitFor.js';

import {
  AuthActorState,
  AuthInterpreter,
  AuthMachineHubHandler,
  AuthMachineState,
} from '../../types';
import { ALLOWED_SPECIAL_CHARACTERS, emailRegex } from './constants';
import { getActorState } from './actor';
import { isFunction } from '../../utils';

export const authDataPlaneState: SetCustomUserAgentInput = {
  category: Category.Auth,
  apis: [
    AuthAction.SignUp,
    AuthAction.ConfirmSignUp,
    AuthAction.ResendSignUpCode,
    AuthAction.SignIn,
    AuthAction.FetchMFAPreference,
    AuthAction.UpdateMFAPreference,
    AuthAction.SetUpTOTP,
    AuthAction.VerifyTOTPSetup,
    AuthAction.ConfirmSignIn,
    AuthAction.FetchUserAttributes,
    AuthAction.SignOut,
    AuthAction.ResetPassword,
    AuthAction.ConfirmResetPassword,
    AuthAction.FederatedSignIn,
  ],
  additionalDetails: [['component', 'authenticator']],
};

// replaces all characters in a string with '*', except for the first and last char
export const censorAllButFirstAndLast = (value: string): string => {
  const split = value.trim().split('');
  for (let i = 0; i < split.length; i++) {
    if (i > 0 && i < split.length - 1) {
      split[i] = '*';
    }
  }

  return split.join('');
};

// censors all but the last four characters of a phone number
export const censorPhoneNumber = (val: string): string => {
  if (val.length < 4) {
    return val;
  }

  const split = val.split('');
  for (let i = 0; i < split.length - 4; i++) {
    split[i] = '*';
  }

  return split.join('');
};

const waitForAutoSignInState = async (service: AuthInterpreter) => {
  // https://xstate.js.org/docs/guides/interpretation.html#waitfor
  try {
    await waitFor(service, (state) =>
      getActorState(state).matches('autoSignIn')
    );
  } catch (e) {
    /**
     * AutoSignIn can be called in unrelated state, or after user has already
     * signed in, because Amplify JS can send duplicate hub events.
     *
     * In that case, we do no-op and ignore the second event.
     */
  }
};

/**
 * Handles Amplify JS Auth hub events, by forwarding hub events as appropriate
 * xstate events.
 */
export const defaultAuthHubHandler: AuthMachineHubHandler = async (
  { payload: { data, event } },
  service,
  options
) => {
  const { send } = service;
  const state = service.getSnapshot(); // this is just a getter and is not expensive

  const { onSignIn, onSignOut } = options ?? {};

  console.log({ event });
  switch (event) {
    // TODO: We can add more cases here, according to
    // https://docs.amplify.aws/lib/auth/auth-events/q/platform/js/
    case 'tokenRefresh':
      if (state.matches('authenticated.idle')) {
        send('TOKEN_REFRESH');
      }
      break;
    case 'signedIn':
      if (isFunction(onSignIn)) {
        onSignIn();
      }
      break;
    case 'signedOut':
    case 'tokenRefresh_failure':
      if (isFunction(onSignOut)) {
        onSignOut();
      }
      if (state.matches('authenticated.idle')) {
        send('SIGN_OUT');
      }
      break;
    default:
      break;
  }
};

type HubHandler = Parameters<typeof Hub.listen>[1];
const getHubEventHandler =
  (service: AuthInterpreter, handler: AuthMachineHubHandler): HubHandler =>
  (data) => {
    handler(data, service);
  };

/**
 * Listens to external auth Hub events and sends corresponding event to
 * the `authService` of interest
 *
 * @param send - `send` function associated with the `authService` of interest
 *
 * @returns function that unsubscribes to the hub evenmt
 */
export const listenToAuthHub = (
  service: AuthInterpreter,
  // angular passes its own `handler` param
  handler: AuthMachineHubHandler = defaultAuthHubHandler
) => {
  return Hub.listen(
    'auth',
    getHubEventHandler(service, handler),
    'authenticator-hub-handler'
  );
};

export const hasSpecialChars = (password: string) =>
  ALLOWED_SPECIAL_CHARACTERS.some((char) => password.includes(char));

export const getTotpCodeURL = (
  issuer: string,
  username: string,
  secret: string
): string =>
  encodeURI(
    `otpauth://totp/${issuer}:${username}?secret=${secret}&issuer=${issuer}`
  );

export function trimValues<T extends Record<string, string>>(
  values: T,
  ...ignored: string[]
): T {
  return Object.entries(values).reduce(
    (acc, [name, value]) => ({
      ...acc,
      [name]: ignored.includes(name) ? value : value?.trim(),
    }),
    {} as T
  );
}

export const isValidEmail = (value: string | undefined) => {
  if (!value) return false;

  return emailRegex.test(value);
};

export const getRoute = (
  state: AuthMachineState,
  actorState: AuthActorState
) => {
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
    case actorState?.matches('setupTOTP.edit'):
    case actorState?.matches('setupTOTP.submit'):
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
    case actorState?.matches('setupTOTP.getTotpSecretCode'):
    case state.matches('signIn.runActor'):
      /**
       * This route is needed for autoSignIn to capture both the
       * autoSignIn.pending and the resolved states when the
       * signIn actor is running.
       */
      return 'transition';
    default:
      console.debug(
        'Cannot infer `route` from Authenticator state:',
        state.value
      );
      return null;
  }
};
