import { SocialProvider } from '../../types';
import {
  ChallengeName,
  V5CodeDeliveryDetails,
} from '../../machines/authenticator/types';
import { translate, DefaultTexts } from '../../i18n';
import { AuthenticatorRoute } from './facade';

/**
 * ConfirmSignIn
 */
const getChallengeText = (challengeName?: ChallengeName): string => {
  switch (challengeName) {
    case 'SMS_MFA':
      return translate(DefaultTexts.CONFIRM_SMS);
    case 'SOFTWARE_TOKEN_MFA':
      return translate(DefaultTexts.CONFIRM_TOTP);
    default:
      return translate(DefaultTexts.CONFIRM_MFA_DEFAULT);
  }
};

/**
 * ConfirmSignUp
 */
const getDeliveryMessageText = (
  codeDeliveryDetails: V5CodeDeliveryDetails
): string => {
  const { DeliveryMedium, Destination } = codeDeliveryDetails ?? {};
  const isEmailMessage = DeliveryMedium === 'EMAIL';
  const isTextMessage = DeliveryMedium === 'SMS';

  const arrivalMessage = translate(DefaultTexts.CODE_ARRIVAL);

  if (!(isEmailMessage || isTextMessage)) {
    return `${translate(DefaultTexts.CODE_SENT)}. ${arrivalMessage}.`;
  }

  const instructionMessage = isEmailMessage
    ? translate(DefaultTexts.CODE_EMAILED)
    : translate(DefaultTexts.CODE_TEXTED);

  return `${instructionMessage} ${Destination}. ${arrivalMessage}.`;
};

const getDeliveryMethodText = (
  codeDeliveryDetails: V5CodeDeliveryDetails
): string => {
  const { DeliveryMedium } = codeDeliveryDetails ?? {};
  const isEmailMessage = DeliveryMedium === 'EMAIL';
  const isTextMessage = DeliveryMedium === 'SMS';

  if (!isEmailMessage && isTextMessage) {
    return translate(DefaultTexts.WE_SENT_CODE);
  }
  return isEmailMessage
    ? translate(DefaultTexts.WE_EMAILED)
    : translate(DefaultTexts.WE_TEXTED);
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
  getOrText: () => translate(DefaultTexts.OR),
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

  /** ForgotPassword */
  getResetYourPasswordText: () => translate(DefaultTexts.RESET_PASSWORD),

  /** SetupTotp */
  getSetupTotpText: () => translate(DefaultTexts.SETUP_TOTP),
  // TODO: add defaultText for below
  getSetupTotpInstructionsText: () =>
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

  /** Validations */
  // TODO: add defaultText
  getInvalidEmailText: () => translate('Please enter a valid email'),
  // TODO: add defaultText
  getRequiredFieldText: () => translate('This field is required'),
} as const; // using `as const` so that keys are strongly typed
