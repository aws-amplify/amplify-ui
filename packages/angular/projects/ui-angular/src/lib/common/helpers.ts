import { I18n } from '@aws-amplify/core';
import { authInputAttributes } from '@aws-amplify/ui';
import { AttributeInfoProvider } from './types';

export const getAttributeMap: AttributeInfoProvider = () => authInputAttributes;

// TODO: share this in core

/**
 * Contains translatable strings that authenticator provides by default. Customers
 * can use this to add custom vocabularies:
 *
 * ```
 * I18n.putVocabulariesForLanguage("en", {
 *  [Translations.SIGN_IN_HEADER_TEXT]: "Custom Sign In Header Text",
 *  [Translations.SIGN_IN_ACTION]: "Custom Click Here to Sign In"
 * });
 * ```
 */
export const DefaultTexts = {
  BACK_SIGN_IN_TEXT: 'Back to Sign In',
  CHANGE_PASSWORD_LABEL: 'Change password',
  CHANGING_PASSWORD_LABEL: 'Changing',
  CODE_TEXT: 'Code',
  CONFIRM_PASSWORD_LABEL: 'Confirm Password',
  CONFIRM_RESET_PASSWORD_HEADING: 'Reset your Password',
  CONFIRM_RESET_PASSWORD_TEXT: 'Submit',
  CONFIRM_SIGNUP_HEADING: 'Confirm Sign Up',
  CONFIRM_TEXT: 'Confirm',
  CONFIRMATION_CODE_TEXT: 'Confirmation Code',
  CREATE_ACCOUNT_LABEL: 'Create Account',
  CREATE_ACCOUNT_LINK: 'Create account',
  EMAIL_ADDRESS_LABEL: 'Email',
  ENTER_USERNAME_TEXT: 'Enter your username',
  FORGOT_YOUR_PASSWORD_LINK: 'Forgot your password? ',
  HAVE_ACCOUNT_LABEL: 'Have an account? ',
  LOGIN_NAME_TEXT: 'Username',
  LOST_YOUR_CODE_TEXT: 'Lost your code? ',
  NO_ACCOUNT: 'No account? ',
  PASSWORD_LABEL: 'Password',
  PASSWORD_TEXT: 'Password',
  PHONE_NUMBER_LABEL: 'Phone Number',
  RESEND_CODE_TEXT: 'Resend Code',
  RESET_PASSWORD_HEADING: 'Reset your password',
  RESET_PASSWORD_TEXT: 'Send Code',
  SETUP_TOTP_TEXT: 'Setup TOTP',
  SIGN_IN_BUTTON_TEXT: 'Sign in',
  SIGN_IN_TEXT: 'Sign in to your account',
  SIGN_UP_BUTTON_TEXT: 'Create a new account',
  SIGNING_IN_BUTTON_TEXT: 'Signing in',
  SKIP_TEXT: 'Skip',
  VERIFY_HEADING: 'Account recovery requires verified contact information',
  VERIFY_TEXT: 'Verify',
} as const;

// type Phrase = "Back to Sign In" | "Change password" | ...
export type Phrase = typeof DefaultTexts[keyof typeof DefaultTexts];

/**
 * This helper type checks that given phrase is one of the texts @aws-amplify/ui
 * provides by default.
 *
 * This will enable vscode autocompleted and help catch typos during development.
 * For example, translate('Submit') is valid but translate('Subnit') is not.
 */
export const translate = (phrase: Phrase) => {
  return I18n.get(phrase);
};
