import {
  AuthChallengeName,
  CodeDeliveryDetails,
  SocialProvider,
} from '../../types';
import { translate, DefaultTexts } from '../../i18n';
import { AuthenticatorRoute } from './facade';

/**
 * ConfirmSignIn
 */
const getChallengeText = (challengeName?: AuthChallengeName): string => {
  switch (challengeName) {
    case 'SMS_MFA':
      return translate(DefaultTexts.CONFIRM_SMS);
    case 'SOFTWARE_TOKEN_MFA':
      return translate(DefaultTexts.CONFIRM_TOTP);
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

  const instructionMessage = translate(
    `Your code is on the way. To log in, enter the code we ${
      isEmailMessage ? 'emailed' : 'texted'
    } to`
  );

  const arrivalMessage = translate('It may take a minute to arrive.');

  return `${instructionMessage} ${Destination}. ${arrivalMessage}`;
};

const getDeliveryMethodText = (
  codeDeliveryDetails: CodeDeliveryDetails
): string => {
  const { DeliveryMedium } = codeDeliveryDetails ?? {};
  const isEmailMessage = DeliveryMedium === 'EMAIL';
  const isTextMessage = DeliveryMedium === 'SMS';

  if (!isEmailMessage && isTextMessage) {
    // TODO: add this to default texts
    return translate('We Sent A Code');
  }
  return translate(`We ${isEmailMessage ? 'Emailed' : 'Texted'} You`);
};

/**
 * FederatedSignIn
 */
const providerNameMap: Record<SocialProvider, string> = {
  amazon: 'Amazon',
  apple: 'Apple',
  facebook: 'Facebook',
  google: 'Google',
};

const getSignInWithFederationText = (
  route: AuthenticatorRoute,
  provider: SocialProvider
) => {
  const isSignIn = route === 'signIn';

  return translate(
    `Sign ${isSignIn ? 'In' : 'Up'} with ${providerNameMap[provider]}`
  );
};

export const authenticatorTextUtil = {
  /** Shared */
  getBackToSignInText: () => translate(DefaultTexts.BACK_SIGN_IN),
  getChangePasswordText: () => translate(DefaultTexts.CHANGE_PASSWORD),
  getChangingText: () => translate(DefaultTexts.CHANGING_PASSWORD),
  getConfirmText: () => translate(DefaultTexts.CONFIRM),
  getConfirmingText: () => translate(DefaultTexts.CONFIRMING),
  getCopyText: () => translate(DefaultTexts.UPPERCASE_COPY),
  getHidePasswordText: () => translate(DefaultTexts.HIDE_PASSWORD),
  getLoadingText: () => translate(DefaultTexts.LOADING),
  getResendCodeText: () => translate(DefaultTexts.RESEND_CODE),
  getSendCodeText: () => translate(DefaultTexts.SEND_CODE),
  getSendingText: () => translate(DefaultTexts.SENDING),
  getShowPasswordText: () => translate(DefaultTexts.SHOW_PASSWORD),
  getSubmitText: () => translate(DefaultTexts.SUBMIT),
  getSubmittingText: () => translate(DefaultTexts.SUBMITTING),

  /** SignInSignUpTabs */
  getSignInTabText: () => translate(DefaultTexts.SIGN_IN_TAB),
  getSignUpTabText: () => translate(DefaultTexts.CREATE_ACCOUNT),

  /** SignIn */
  getForgotPasswordText: (shortVersion?: boolean) =>
    translate(
      shortVersion
        ? DefaultTexts.FORGOT_PASSWORD
        : DefaultTexts.FORGOT_YOUR_PASSWORD
    ),
  getSigningInText: () => translate(DefaultTexts.SIGNING_IN_BUTTON),
  getSignInText: () => translate(DefaultTexts.SIGN_IN_BUTTON),

  /** SignUp */
  getCreatingAccountText: () => translate(DefaultTexts.CREATING_ACCOUNT),
  getCreateAccountText: () => translate(DefaultTexts.CREATE_ACCOUNT),

  /** ConfirmSignUp */
  getDeliveryMessageText,
  getDeliveryMethodText,

  /** ConfirmSignIn */
  getChallengeText,

  /** ResetPassword */
  getResetYourPasswordText: () => translate(DefaultTexts.RESET_PASSWORD),

  /** SetupTOTP */
  getSetupTOTPText: () => translate(DefaultTexts.SETUP_TOTP),
  // TODO: add defaultText for below
  getSetupTOTPInstructionsText: () =>
    translate(
      'Copy and paste the secret key below into an authenticator app and then enter the code in the text field below.'
    ),
  // TODO: add defaultText for "COPIED"
  getCopiedText: () => translate('COPIED'),

  /** FederatedSignIn */
  getSignInWithFederationText,

  /** VerifyUser */
  getSkipText: () => translate(DefaultTexts.SKIP),
  getVerifyText: () => translate(DefaultTexts.VERIFY),
  getVerifyContactText: () => translate(DefaultTexts.VERIFY_CONTACT),
  getAccountRecoveryInfoText: () => translate(DefaultTexts.VERIFY_HEADING),
} as const; // using `as const` so that keys are strongly typed
