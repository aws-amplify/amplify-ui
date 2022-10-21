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
const getChallenge = (challengeName: AuthChallengeName): string => {
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
const getDeliveryMessage = (
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
const getSignInWithFederation = (
  route: AuthenticatorRoute,
  provider: FederatedIdentityProviders
) => {
  const isSignIn = route === 'signIn';
  const providerNameMap: Record<FederatedIdentityProviders, string> = {
    LoginWithAmazon: 'Amazon',
    SignInWithApple: 'Apple',
    Facebook: 'Facebook',
    Google: 'Google',
  };
  return translate(
    `Sign ${isSignIn ? 'In' : 'Up'} with ${providerNameMap[provider]}`
  );
};

export default {
  /** Shared */
  getBackToSignIn: () => translate('Back to Sign In'),
  getConfirm: () => translate('Confirm'),
  getChanging: () => translate('Changing'),
  getConfirming: () => translate('Confirming'),
  getCopy: () => translate('COPY'),
  getResendCode: () => translate('Resend Code'),
  getSendCode: () => translate('Send code'),
  getSending: () => translate('Sending'),
  getChangePassword: () => translate('Change Password'),

  /** SignIn */
  getSigningIn: () => translate('Signing In'),
  getSignIn: () => translate('Sign in'),

  /** SignUp */
  getCreatingAccount: () => translate('Creating Account'),
  getCreateAccount: () => translate('Create Account'),

  /** ConfirmSignUp */
  getDeliveryMessage,
  getDeliveryMethodText,

  /** ConfirmSignIn */
  getChallenge,

  /** ResetPassword */
  getResetYourPassword: () => translate('Reset your password'),

  /** SetupTOTP */
  getSetupTOTP: () => translate('Setup TOTP'),

  /** FederatedSignIn */
  getSignInWithFederation,
};
