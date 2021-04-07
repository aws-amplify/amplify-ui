import { CognitoUser, CognitoUserSession } from "amazon-cognito-identity-js";

export interface AuthContext {
  error: string | Error; // TODO: what would this object be?
  user: CognitoUser | unknown;
  session: CognitoUserSession | unknown;
}

export type AuthEventTypes =
  | "SIGN_IN"
  | "SIGN_UP"
  | "SIGN_OUT"
  | "SUBMIT"
  | "RESEND"
  | "CONFIRM_SIGN_UP";

export interface AuthEvent {
  type: AuthEventTypes;
  data: any; // TODO: strongly type data for each AuthEventType
}
