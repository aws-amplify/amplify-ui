/**
 * This files provides types that describe general shape of
 * authenticator machine and its intepreter.
 */
import { Interpreter } from 'xstate';
import { AuthContext } from './authContext';
import { AuthEvent } from './authEvent';

export type AuthInterpreter = Interpreter<AuthContext, any, AuthEvent>;

export type AuthMachineSend = AuthInterpreter['send'];
