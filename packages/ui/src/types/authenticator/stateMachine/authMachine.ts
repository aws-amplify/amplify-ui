/**
 * This files provides types that describe general shape of
 * authenticator machine and its intepreter.
 */
import { Interpreter } from 'xstate';
import { AuthContext } from './context';
import { AuthEvent } from './event';

/**
 * Intefrace for `authMachine` machine interpreter
 */
export type AuthInterpreter = Interpreter<AuthContext, any, AuthEvent>;

/**
 * Function type for `send` in `authMachine`
 */
export type AuthMachineSend = AuthInterpreter['send'];
