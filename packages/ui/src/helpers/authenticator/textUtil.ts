import type { SocialProvider } from '../../types';
import type {
  AuthMFAType,
  ChallengeName,
  V5CodeDeliveryDetails,
} from '../../machines/authenticator/types';
import { translate, DefaultTexts } from '../../i18n';
import type { AuthenticatorRoute } from './facade';
import { defaultTexts } from '../../i18n/dictionaries';

/**
 * ConfirmSignIn
 */
const getChallengeText = (challengeName?: ChallengeName): string => {
  switch (challengeName) {
    case 'EMAIL_OTP':
      return translate(DefaultTexts.CONFIRM_EMAIL);
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

/**
 * SelectMfaType
 */
const getSelectMfaTypeByChallengeName = (
  challengeName?: ChallengeName
): string => {
  if (challengeName === 'MFA_SETUP') {
    return translate(DefaultTexts.MFA_SETUP_SELECTION);
  }

  return translate(DefaultTexts.MFA_SELECTION);
};

const getMfaTypeLabelByValue = (mfaType: AuthMFAType): string => {
  switch (mfaType) {
    case 'EMAIL':
      return translate(defaultTexts.EMAIL_OTP);
    case 'SMS':
      return translate(defaultTexts.SMS_MFA);
    case 'TOTP':
      return translate(defaultTexts.SOFTWARE_TOKEN_MFA);
    default:
      return translate(mfaType);
  }
};

export const authenticatorTextUtil = {
  /** Shared */
  getBackToSignInText: () => translate(DefaultTexts.BACK_SIGN_IN),
  getChangePasswordText: () => translate(DefaultTexts.CHANGE_PASSWORD),
  getChangingText: () => translate(DefaultTexts.CHANGING_PASSWORD),
  getConfirmText: () => translate(DefaultTexts.CONFIRM),
  getConfirmingText: () => translate(DefaultTexts.CONFIRMING),
  getContinueText: () => translate(DefaultTexts.CONTINUE),
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
  getCreateAccountWithEmailText: () =>
    translate(DefaultTexts.CREATE_ACCOUNT_WITH_EMAIL_OTP),
  getCreateAccountWithPasswordText: () =>
    translate(DefaultTexts.CREATE_ACCOUNT_WITH_PASSWORD),
  getCreateAccountWithSmsText: () =>
    translate(DefaultTexts.CREATE_ACCOUNT_WITH_SMS_OTP),

  /** ConfirmSignUp */
  getDeliveryMessageText,
  getDeliveryMethodText,

  /** ConfirmSignIn */
  getChallengeText,

  /** ForgotPassword */
  getResetYourPasswordText: () => translate(DefaultTexts.RESET_PASSWORD),

  /** SetupEmail */
  getSetupEmailText: () => translate(DefaultTexts.SETUP_EMAIL),

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

  /** SelectMfaType */
  getMfaTypeLabelByValue,
  getSelectMfaTypeByChallengeName,
  getSelectMfaTypeText: () => translate(DefaultTexts.SELECT_MFA_TYPE),

  /** VerifyUser */
  getSkipText: () => translate(DefaultTexts.SKIP),
  getVerifyText: () => translate(DefaultTexts.VERIFY),
  getVerifyContactText: () => translate(DefaultTexts.VERIFY_CONTACT),
  getAccountRecoveryInfoText: () => translate(DefaultTexts.VERIFY_HEADING),

  /** Passwordless */
  getPasskeyPromptHeadingText: () =>
    translate(DefaultTexts.PASSKEY_PROMPT_HEADING),
  getPasskeyPromptDescriptionText: () =>
    translate(DefaultTexts.PASSKEY_PROMPT_DESCRIPTION),
  getCreatePasskeyText: () => translate(DefaultTexts.CREATE_PASSKEY),
  getRegisteringText: () => translate(DefaultTexts.REGISTERING),
  getContinueWithoutPasskeyText: () =>
    translate(DefaultTexts.CONTINUE_WITHOUT_PASSKEY),
  getPasskeyCreatedSuccessText: () =>
    translate(DefaultTexts.PASSKEY_CREATED_SUCCESS),
  getPasskeyRegisteredText: () => translate(DefaultTexts.PASSKEY_REGISTERED),
  getPasskeyRegistrationFailedText: () =>
    translate(DefaultTexts.PASSKEY_REGISTRATION_FAILED),
  getPasskeyLabelText: () => translate(DefaultTexts.PASSKEY_LABEL),
  getExistingPasskeysText: () => translate(DefaultTexts.EXISTING_PASSKEYS),
  getSetupAnotherPasskeyText: () =>
    translate(DefaultTexts.SETUP_ANOTHER_PASSKEY),
  getSignInWithPasswordText: () =>
    translate(DefaultTexts.SIGN_IN_WITH_PASSWORD),
  getSignInWithEmailText: () => translate(DefaultTexts.SIGN_IN_WITH_EMAIL),
  getSignInWithSmsText: () => translate(DefaultTexts.SIGN_IN_WITH_SMS),
  getSignInWithPasskeyText: () => translate(DefaultTexts.SIGN_IN_WITH_PASSKEY),
  getOtherSignInOptionsText: () =>
    translate(DefaultTexts.OTHER_SIGN_IN_OPTIONS),
  getEnterUsernameFirstText: () => translate(DefaultTexts.ENTER_USERNAME_FIRST),

  /** Validations */
  // TODO: add defaultText
  getInvalidEmailText: () => translate('Please enter a valid email'),
  // TODO: add defaultText
  getRequiredFieldText: () => translate('This field is required'),
} as const; // using `as const` so that keys are strongly typed
