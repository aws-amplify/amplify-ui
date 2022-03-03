import { State } from 'xstate';
import {
  SignInContext,
  SignUpContext,
  SignOutContext,
  AuthActorContext,
  AuthContext,
} from './authContext';
import { AuthEvent } from './authEvent';

// Actor states
export type SignInState = State<SignInContext, AuthEvent>;
export type SignUpState = State<SignUpContext, AuthEvent>;
export type SignOutState = State<SignOutContext, AuthEvent>;
export type ResetPasswordState = State<ResetPasswordState, AuthEvent>;
export type AuthActorState = State<AuthActorContext, AuthEvent>;

// top level machine state
export type AuthMachineState = State<AuthContext, AuthEvent>;
