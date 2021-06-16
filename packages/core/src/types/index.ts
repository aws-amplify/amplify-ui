import { CognitoUser, CognitoUserSession } from "amazon-cognito-identity-js";
import { Interpreter, State } from "xstate";

export type AuthFormData = Record<string, string>;
export interface AuthContext {
  error?: string; // contains Cognito error
  user?: CognitoUser;
  session?: CognitoUserSession;
  formValues?: AuthFormData;
}

export type AuthEventTypes =
  | "SIGN_IN"
  | "SIGN_UP"
  | "SIGN_OUT"
  | "SUBMIT"
  | "RESEND"
  | "CONFIRM_SIGN_UP"
  | "INPUT";

export interface AuthEvent {
  type: AuthEventTypes;
  data?: any; // TODO: strongly type data for each AuthEventType
}

export type AuthMachineState = State<AuthContext, AuthEvent>;

export type AuthInterpreter = Interpreter<AuthContext, any, AuthEvent>;
