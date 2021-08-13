import { CognitoUser, CognitoUserSession } from 'amazon-cognito-identity-js';
import { Interpreter, State } from 'xstate';

export type AuthFormData = Record<string, string>;

export interface AuthContext {
  user?: CognitoUserAmplify;
  config?: {
    login_mechanisms: string[];
  };
  actorRef?: any;
}

export interface CognitoUserAmplify extends CognitoUser {
  username?: string;
}

export type AuthEventTypes =
  | 'SIGN_IN'
  | 'SIGN_UP'
  | 'SIGN_OUT'
  | 'SUBMIT'
  | 'RESEND'
  | 'CHANGE'
  | 'FEDERATED_SIGN_IN'
  | 'done.invoke.signInActor'
  | 'done.invoke.signUpActor'
  | 'done.invoke.signOutActor';

export enum AuthChallengeNames {
  SMS_MFA = 'SMS_MFA',
  SOFTWARE_TOKEN_MFA = 'SOFTWARE_TOKEN_MFA',
  NEW_PASSWORD_REQUIRED = 'NEW_PASSWORD_REQUIRED',
  MFA_SETUP = 'MFA_SETUP',
}

export interface InputAttributes {
  label: string;
  type: string;
  placeholder: string;
}

export const userNameAliasArray = [
  'username',
  'email',
  'phone_number',
] as const;

export type UserNameAlias = typeof userNameAliasArray[number];

export const socialProviderLoginMechanisms = ['amazon', 'google', 'facebook'];

// other non-alias inputs that Cognito would require
export type AuthInputNames = UserNameAlias | 'confirmation_code' | 'password';

export type AuthInputAttributes = Record<AuthInputNames, InputAttributes>;

export interface AuthEvent {
  type: AuthEventTypes;
  data?: any;
}

export type AuthMachineState = State<AuthContext, AuthEvent>;

export type AuthInterpreter = Interpreter<AuthContext, any, AuthEvent>;
