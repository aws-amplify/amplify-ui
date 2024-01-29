import { Hub } from 'aws-amplify/utils';

import { isFunction } from '../../utils';

import { AuthInterpreter, AuthMachineHubHandler } from './types';

/**
 * Handles Amplify JS Auth hub events, by forwarding hub events as appropriate
 * xstate events.
 */
export const defaultAuthHubHandler: AuthMachineHubHandler = (
  { payload },
  service,
  options
) => {
  const { event } = payload;
  const { send } = service;
  const { onSignIn, onSignOut } = options ?? {};

  switch (event) {
    case 'signedIn': {
      if (isFunction(onSignIn)) {
        onSignIn(payload);
      }
      break;
    }
    case 'signInWithRedirect': {
      send('SIGN_IN_WITH_REDIRECT');
      break;
    }
    case 'signedOut':
    case 'tokenRefresh_failure': {
      if (event === 'signedOut' && isFunction(onSignOut)) {
        onSignOut();
      }
      send('SIGN_OUT');
      break;
    }
    default: {
      break;
    }
  }
};

/**
 * Listens to external auth Hub events and sends corresponding event to
 * the `service.send` of interest
 *
 * @param service - contains state machine `send` function
 * @param handler - auth event handler
 * @returns function that unsubscribes to the hub evenmt
 */
export const listenToAuthHub = (
  service: AuthInterpreter,
  handler: AuthMachineHubHandler = defaultAuthHubHandler
) => {
  const eventHandler: Parameters<typeof Hub.listen>[1] = (data) =>
    handler(data, service);
  return Hub.listen('auth', eventHandler, 'authenticator-hub-handler');
};
