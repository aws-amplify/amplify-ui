import { Hub } from 'aws-amplify/utils';

import { isFunction } from '../../utils';

import { AuthInterpreter, AuthMachineHubHandler } from './types';

/**
 * Handles Amplify JS Auth hub events, by forwarding hub events as appropriate
 * xstate events.
 */
export const defaultAuthHubHandler: AuthMachineHubHandler = async (
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
