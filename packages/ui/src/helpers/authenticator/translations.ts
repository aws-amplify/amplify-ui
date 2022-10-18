import {
  AuthChallengeName,
  CodeDeliveryDetails,
  FederatedIdentityProviders,
} from '../../types';
import { translate } from '../../i18n';
import { AuthenticatorRoute } from './facade';

/**
 * Shared
 */
const getBackToSignIn = () => translate('Back to Sign In');
const getConfirm = () => translate('Confirm');
const getChanging = () => translate('Changing');
const getConfirming = () => translate('Confirming');
const getCopy = () => translate('COPY');
const getResendCode = () => translate('Resend Code');
const getSendCode = () => translate('Send code');
const getSending = () => translate('Sending');
const getChangePassword = () => translate('Change Password');

/**
 * SignIn
 */
const getSigningIn = () => translate('Signing In');
const getSignIn = () => translate('Sign in');

/**
 * SignUp
 */
const getCreatingAccount = () => translate('Creating Account');
const getCreateAccount = () => translate('Create Account');

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
const getSignInWithFederatedText = (
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

/**
 * ResetPassword
 */
const getResetYourPassword = () => translate('Reset your password');

/**
 * SetupTOTP
 */
const getSetupTOTP = () => translate('Setup TOTP');

export default {
  getChallenge,
  getDeliveryMessageText,
  getDeliveryMethodText,
};
