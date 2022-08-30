import {
  AuthChallengeNames,
  AuthEventData,
  CodeDeliveryDetails,
  CognitoUserAmplify,
} from '../../types';

export type AuthenticatorRoute =
  | 'authenticated'
  | 'autoSignIn'
  | 'confirmResetPassword'
  | 'confirmSignIn'
  | 'confirmSignUp'
  | 'confirmVerifyUser'
  | 'forceNewPassword'
  | 'idle'
  | 'resetPassword'
  | 'setup'
  | 'signOut'
  | 'setupTOTP'
  | 'signIn'
  | 'signUp'
  | 'verifyUser';

type AuthStatus = 'configuring' | 'authenticated' | 'unauthenticated';

export type AuthenticatorValidationErrors = {
  [key: string]: string | string[];
};

type SendEventAlias =
  | 'resendCode'
  | 'signOut'
  | 'submitForm'
  | 'updateForm'
  | 'updateBlur'
  | 'toFederatedSignIn'
  | 'toResetPassword'
  | 'toSignIn'
  | 'toSignUp'
  | 'skipVerification';

export type AuthenticatorSendEventAliases = Record<
  SendEventAlias,
  (data?: AuthEventData) => void
>;

export interface AuthenticatorServiceContextFacade {
  authStatus: AuthStatus;
  challengeName: AuthChallengeNames;
  codeDeliveryDetails: CodeDeliveryDetails;
  error: string;
  hasValidationErrors: boolean;
  isPending: boolean;
  route: AuthenticatorRoute;
  user: CognitoUserAmplify;
  validationErrors: AuthenticatorValidationErrors;
}
