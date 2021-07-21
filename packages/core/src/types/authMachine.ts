import { CognitoUser, CognitoUserSession } from 'amazon-cognito-identity-js';
import { Interpreter, State } from 'xstate';
import { ValidationError } from './validator';

export type AuthFormData = Record<string, string>;

export interface AuthContext {
  remoteError?: string; // contains Amplify or Cognito error
  validationError?: ValidationError; // contains validation error for each input
  user?: CognitoUserAmplify;
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
  | 'FEDERATED_SIGN_IN';

export enum AuthChallengeNames {
  SMS_MFA = 'SMS_MFA',
  SOFTWARE_TOKEN_MFA = 'SOFTWARE_TOKEN_MFA',
  NEW_PASSWORD_REQUIRED = 'NEW_PASSWORD_REQUIRED',
  MFA_SETUP = 'MFA_SETUP',
}

export interface AuthEvent {
  type: AuthEventTypes;
  data?: any; // TODO: strongly type data for each AuthEventType
}

export type AuthMachineState = State<AuthContext, AuthEvent>;

export type AuthInterpreter = Interpreter<AuthContext, any, AuthEvent>;
