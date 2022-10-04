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
