import {
  AuthChallengeName,
  CodeDeliveryDetails,
  FederatedIdentityProviders,
} from '../../types';
import { translate } from '../../i18n';
import { AuthenticatorRoute } from './facade';

/**
 * ConfirmSignIn
 */
const getChallengeText = (challengeName: AuthChallengeName): string => {
  switch (challengeName) {
    case 'SMS_MFA':
      return translate('Confirm SMS Code');
    case 'SOFTWARE_TOKEN_MFA':
      return translate('Confirm TOTP Code');
    default:
      throw new Error(
        `${translate(
          'Unexpected challengeName encountered in ConfirmSignIn:'
        )} ${challengeName}`
      );
  }
};

/**
 * ConfirmSignUp
 */
const getDeliveryMessageText = (
  codeDeliveryDetails: CodeDeliveryDetails
): string => {
  const { DeliveryMedium, Destination } = codeDeliveryDetails ?? {};
  const isEmailMessage = DeliveryMedium === 'EMAIL';
  const isTextMessage = DeliveryMedium === 'SMS';

  if (!(isEmailMessage || isTextMessage)) {
    return translate(
      'Your code is on the way. To log in, enter the code we sent you. It may take a minute to arrive.'
    );
  }

  return `${`Your code is on the way. To log in, enter the code we ${
    isEmailMessage ? 'emailed' : 'texted'
  } to`} ${Destination}. ${translate('It may take a minute to arrive.')}`;
};

const getDeliveryMethodText = (
  codeDeliveryDetails: CodeDeliveryDetails
): string => {
  const { DeliveryMedium } = codeDeliveryDetails ?? {};
  const isEmailMessage = DeliveryMedium === 'EMAIL';
  const isTextMessage = DeliveryMedium === 'SMS';

  if (!isEmailMessage && isTextMessage) {
    return translate('We Sent A Code');
  }
  return translate(`We ${isEmailMessage ? 'Emailed' : 'Texted'} You`);
};

/**
 * FederatedSignIn
 */
const providerNameMap: Record<FederatedIdentityProviders, string> = {
  LoginWithAmazon: 'Amazon',
  SignInWithApple: 'Apple',
  Facebook: 'Facebook',
  Google: 'Google',
};

const getSignInWithFederationText = (
  route: AuthenticatorRoute,
  provider: FederatedIdentityProviders
) => {
  const isSignIn = route === 'signIn';

  return translate(
    `Sign ${isSignIn ? 'In' : 'Up'} with ${providerNameMap[provider]}`
  );
};

export const authenticatorTextUtil = {
  /** Shared */
  getBackToSignInText: () => translate('Back to Sign In'),
  getChangePasswordText: () => translate('Change Password'),
  getChangingText: () => translate('Changing'),
  getConfirmText: () => translate('Confirm'),
  getConfirmingText: () => translate('Confirming'),
  getCopyText: () => translate('COPY'),
  getResendCodeText: () => translate('Resend Code'),
  getSendCodeText: () => translate('Send code'),
  getSendingText: () => translate('Sending'),

  /** SignIn */

  getForgotPasswordText: () => translate('Forgot your password?'),
  getSigningInText: () => translate('Signing In'),
  getSignInText: () => translate('Sign in'),
  /** SignUp */
  getCreatingAccountText: () => translate('Creating Account'),
  getCreateAccountText: () => translate('Create Account'),

  /** ConfirmSignUp */
  getDeliveryMessageText,
  getDeliveryMethodText,

  /** ConfirmSignIn */
  getChallengeText,

  /** ResetPassword */
  getResetYourPasswordText: () => translate('Reset your password'),

  /** SetupTOTP */
  getSetupTOTPText: () => translate('Setup TOTP'),

  /** FederatedSignIn */
  getSignInWithFederationText,
} as const; // using `as const` so that keys are strongly typed
