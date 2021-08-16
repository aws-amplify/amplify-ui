import { CognitoUser, CognitoUserSession } from 'amazon-cognito-identity-js';
import { Interpreter, State } from 'xstate';
import { ValidationError } from './validator';

export type AuthFormData = Record<string, string>;
export interface AuthContext {
  remoteError?: string; // contains Amplify or Cognito error
  validationError?: ValidationError; // contains validation error for each input
  user?: CognitoUserAmplify;
  username?: string;
  session?: CognitoUserSession;
  formValues?: AuthFormData;
  config?: {
    login_mechanisms: string[];
  };
  challengeName?: AuthChallengeNames;
}

interface CognitoUserAmplify extends CognitoUser {
  username?: string;
}

export type AuthEventTypes =
  | 'SIGN_IN'
  | 'SIGN_UP'
  | 'SIGN_OUT'
  | 'SUBMIT'
  | 'RESEND'
  | 'CONFIRM_SIGN_UP'
  | 'CONFIRM_SIGN_IN'
  | 'INPUT'
  | 'CHANGE'
  | 'FEDERATED_SIGN_IN'
  | 'RESET_PASSWORD';

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
  data?: any; // TODO: strongly type data for each AuthEventType
}

export type AuthMachineState = State<AuthContext, AuthEvent>;

export type AuthInterpreter = Interpreter<AuthContext, any, AuthEvent>;
