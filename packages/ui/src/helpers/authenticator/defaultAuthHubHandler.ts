import { Hub } from 'aws-amplify/utils';

import { groupLog, isFunction } from '../../utils';

import { AuthInterpreter, AuthMachineHubHandler } from './types';

/**
 * Handles Amplify JS Auth hub events, by forwarding hub events as appropriate
 * xstate events.
 */
export const defaultAuthHubHandler: AuthMachineHubHandler = async (
  { payload: { event } },
  service,
  options
) => {
  groupLog('+++defaultAuthHubHandler', event);
  const { send } = service;
  const state = service.getSnapshot(); // this is just a getter and is not expensive
  const { onSignIn, onSignOut } = options ?? {};

  switch (event) {
    case 'signInWithRedirect_failure':
      break;
    // TODO: We can add more cases here, according to
    // https://docs.amplify.aws/lib/auth/auth-events/q/platform/js/
    case 'tokenRefresh': {
      if (state.matches('authenticated.idle')) {
        // just call getCurrentUser here
        send('TOKEN_REFRESH');
      }
      break;
    }
    case 'signInWithRedirect': {
      // if (isFunction(onSignInWithRedirect)) {
      //   // getCurrentUser()
      //   //   .then('onSignInWithRedirect')
      //   //   .catch((e) => {
      //   //     return;
      //   //   });
      // }
      break;
    }
    case 'signedIn': {
      if (isFunction(onSignIn)) {
        onSignIn();
      }
      break;
    }
    case 'signedOut':
    case 'tokenRefresh_failure':
      if (isFunction(onSignOut)) {
        onSignOut();
      }
      send('SIGN_OUT');
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
