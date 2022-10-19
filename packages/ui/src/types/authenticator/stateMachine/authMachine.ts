/**
 * This files provides types that describe general shape of
 * authenticator machine and its intepreter.
 */
import { Interpreter } from 'xstate';
import { AuthContext } from './context';
import { AuthEvent } from './event';
import { HubCapsule } from '@aws-amplify/core';

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

export type HubHandler = (
  data: HubCapsule,
  service: AuthInterpreter
) => Promise<void>;
