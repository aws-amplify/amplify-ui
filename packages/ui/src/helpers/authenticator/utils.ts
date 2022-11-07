/**
 * This file contains general helpers that state machine or authenticator
 * implementations can use.
 */

import { Hub } from 'aws-amplify';
import { AuthInterpreter, HubHandler } from '../../types';
import { ALLOWED_SPECIAL_CHARACTERS } from './constants';

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

export const defaultAuthHubHandler: HubHandler = (data, service) => {
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
  handler: HubHandler = defaultAuthHubHandler
) => {
  return Hub.listen(
    'auth',
    (data) => {
      handler(data, service);
    },
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
