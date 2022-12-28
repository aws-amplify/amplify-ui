/**
 * This file contains general helpers that state machine or authenticator
 * implementations can use.
 */

import { Hub } from 'aws-amplify';
import { appendToCognitoUserAgent } from '@aws-amplify/auth';
import { waitFor } from 'xstate/lib/waitFor';

import { AuthInterpreter, AuthMachineHubHandler } from '../../types';
import { ALLOWED_SPECIAL_CHARACTERS } from './constants';
import { getActorState } from './actor';

type ConfigureOptions = { packageName: string; version: string };
export const configureComponent = ({
  packageName,
  version,
}: ConfigureOptions) => {
  // "@aws-amplify/ui-react" + "/" + "3.5.10"
  appendToCognitoUserAgent(`${packageName}/${version}`);
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
  data,
  service
) => {
  const { send } = service;
  const state = service.getSnapshot(); // this is just a getter and is not expensive

  switch (data.payload.event) {
    // TODO: We can add more cases here, according to
    // https://docs.amplify.aws/lib/auth/auth-events/q/platform/js/
    case 'tokenRefresh':
      if (state.matches('authenticated.idle')) {
        send('TOKEN_REFRESH');
      }
      break;
    case 'autoSignIn':
      if (!state.matches('authenticated')) {
        /**
         * We wait for state machine to reach `autoSignIn` before sending
         * this event.
         *
         * This will ensure that xstate is ready to handle autoSignIn by
         * the time we send this event, and prevent race conditions between
         * hub events and state machine transitions.
         */
        await waitForAutoSignInState(service);
        const currentActorState = getActorState(service.getSnapshot());
        if (currentActorState?.matches('autoSignIn')) {
          send({ type: 'AUTO_SIGN_IN', data: data.payload.data });
        }
      }
      break;
    case 'autoSignIn_failure':
      await waitForAutoSignInState(service);
      const currentActorState = getActorState(service.getSnapshot());
      if (currentActorState?.matches('autoSignIn')) {
        send({ type: 'AUTO_SIGN_IN_FAILURE', data: data.payload.data });
      }
      break;
    case 'signOut':
    case 'tokenRefresh_failure':
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
