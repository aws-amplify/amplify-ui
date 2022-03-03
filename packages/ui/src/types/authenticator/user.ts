import { CognitoUser } from 'amazon-cognito-identity-js';

/** Enum of known challenge names */
export enum AuthChallengeNames {
  SMS_MFA = 'SMS_MFA',
  SOFTWARE_TOKEN_MFA = 'SOFTWARE_TOKEN_MFA',
  NEW_PASSWORD_REQUIRED = 'NEW_PASSWORD_REQUIRED',
  RESET_REQUIRED = 'RESET_REQUIRED',
  MFA_SETUP = 'MFA_SETUP',
}

/** Known cognito user attributes */
export interface CognitoAttributes {
  email: string;
  phone_number: string;
  [key: string]: string;
}

/** Cognito User Interface */
export interface CognitoUserAmplify extends CognitoUser {
  username?: string;
  attributes?: CognitoAttributes;
}
