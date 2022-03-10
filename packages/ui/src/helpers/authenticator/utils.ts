/**
 * This file contains general helpers that state machine or authenticator
 * implementations can use.
 */

import { Hub } from 'aws-amplify';
import { AuthMachineSend } from '../../types';

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

/**
 * Listens to external auth Hub events and sends corresponding event to
 * the `authService` of interest
 *
 * @param send - `send` function associated with the `authService` of interest
 *
 * @returns function that unsubscribes to the hub evenmt
 */
export const listenToAuthHub = (send: AuthMachineSend) => {
  return Hub.listen('auth', (data) => {
    switch (data.payload.event) {
      // TODO: We can add more cases here, according to
      // https://docs.amplify.aws/lib/auth/auth-events/q/platform/js/
      case 'signOut':
        send('SIGN_OUT');
        break;
    }
  });
};
