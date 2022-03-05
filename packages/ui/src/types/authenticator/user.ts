import { CognitoUser } from 'amazon-cognito-identity-js';

/** Enum of known challenge names */
export enum AuthChallengeNames {
  SMS_MFA = 'SMS_MFA',
  SOFTWARE_TOKEN_MFA = 'SOFTWARE_TOKEN_MFA',
  NEW_PASSWORD_REQUIRED = 'NEW_PASSWORD_REQUIRED',
  RESET_REQUIRED = 'RESET_REQUIRED',
  MFA_SETUP = 'MFA_SETUP',
}

/** Contact destinations that we can send user confirmation code to */
export type ContactMethod = 'Email' | 'Phone Number';

/** Federated IDPs that Authenticator supports */
export enum FederatedIdentityProviders {
  Apple = 'SignInWithApple',
  Amazon = 'LoginWithAmazon',
  Facebook = 'Facebook',
  Google = 'Google',
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
