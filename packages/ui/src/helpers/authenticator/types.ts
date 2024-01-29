/**
 * This files provides types that describe general shape of
 * authenticator machine and its intepreter.
 */
import { Interpreter } from 'xstate';
import { AuthUser } from 'aws-amplify/auth';
import { HubCapsule } from 'aws-amplify/utils';

import { AuthContext, AuthEvent } from '../../machines/authenticator/types';

/**
 * Intefrace for `authMachine` machine interpreter
 *
 * TODO: tighten up anys here
 */
export type AuthInterpreter = Interpreter<
  AuthContext,
  any,
  AuthEvent,
  any,
  any
>;

/**
 * Function type for `send` in `authMachine`
 */
export type AuthMachineSend = AuthInterpreter['send'];

/**
 * Handles Amplify JS Auth hub events, by forwarding hub events as appropriate
 * xstate events.
 */
export type AuthMachineHubHandler = (
  data: HubCapsule<any, any>,
  service: AuthInterpreter,
  options?: {
    onSignIn?: (user: AuthUser) => void;
    onSignOut?: () => void;
  }
) => void;
