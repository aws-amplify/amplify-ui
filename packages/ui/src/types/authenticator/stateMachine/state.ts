import { State } from 'xstate';
import { ResetPasswordContext } from '.';
import {
  SignInContext,
  SignUpContext,
  SignOutContext,
  AuthActorContext,
  AuthContext,
} from './context';
import { AuthEvent } from './event';

// Actor states
export type SignInState = State<SignInContext, AuthEvent>;
export type SignUpState = State<SignUpContext, AuthEvent>;
export type SignOutState = State<SignOutContext, AuthEvent>;
export type ResetPasswordState = State<ResetPasswordContext, AuthEvent>;
export type AuthActorState = State<AuthActorContext, AuthEvent>;

// top level machine state
export type AuthMachineState = State<AuthContext, AuthEvent>;
