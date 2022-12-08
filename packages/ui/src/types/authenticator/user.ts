import { ChallengeName, CognitoUser } from 'amazon-cognito-identity-js';

/** Known challenge names */
export type AuthChallengeName = ChallengeName;

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

/**
 * Amplify User Interface
 */
export interface AmplifyUser extends CognitoUser {
  username?: string;
  attributes?: CognitoAttributes;
}

/**
 * @deprecated please use `AmplifyUser`
 *
 * Cognito User Interface
 */
export interface CognitoUserAmplify extends AmplifyUser {}

/**
 * Cognito user contact method types that have not been verified as valid
 */
export enum UnverifiedContactMethodType {
  Email = 'email',
  PhoneNumber = 'phone_number',
}

/**
 * Cognito user contact methods that have not been verified as valid
 */
export interface UnverifiedContactMethods {
  email?: string;
  phone_number?: string;
}
