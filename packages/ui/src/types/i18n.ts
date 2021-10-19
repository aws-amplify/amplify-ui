/**
 * Contains translatable strings that authenticator provides by default. Customers
 * can use this to add custom vocabularies:
 *
 * ```
 * I18n.putVocabulariesForLanguage("en", {
 *  [DefaultTexts.SIGN_IN_TEXT]: "Custom Sign In Header Text",
 *  [DefaultTexts.SIGN_IN_BUTTON_TEXT]: "Custom Click Here to Sign In"
 * });
 * ```
 *
 * TODO: this needs clean up. What's needed and what's not needed?
 */
export const DefaultTexts = {
  BACK_SIGN_IN_TEXT: 'Back to Sign In',
  CHANGE_PASSWORD_LABEL: 'Change Password',
  CHANGING_PASSWORD_LABEL: 'Changing',
  CODE_TEXT: 'Code',
  LOADING: 'Loading',
  SUBMITTING: 'Submitting',
  CONFIRM_PASSWORD_LABEL: 'Confirm Password',
  CONFIRM_RESET_PASSWORD_HEADING: 'Reset your Password',
  CONFIRM_RESET_PASSWORD_TEXT: 'Submit',
  CONFIRM_SIGNUP_HEADING: 'Confirm Sign Up',
  CONFIRM_SMS_LABEL: 'Confirm SMS Code',
  CONFIRM_TEXT: 'Confirm',
  CONFIRM_TOTP_LABEL: 'Confirm TOTP Code',
  CONFIRMATION_CODE_TEXT: 'Confirmation Code',
  CONFIRMING: 'Confirming',
  CREATE_ACCOUNT_LABEL: 'Create Account',
  CREATE_ACCOUNT_LINK: 'Create account',
  EMAIL_ADDRESS_LABEL: 'Email',
  ENTER_CODE: 'Enter your code',
  SEND_CODE: 'Send code',
  SENDING: 'Sending',
  ENTER_USERNAME_TEXT: 'Enter your username',
  FORGOT_YOUR_PASSWORD_LINK: 'Forgot your password? ',
  HAVE_ACCOUNT_LABEL: 'Have an account? ',
  HIDE_PASSWORD: 'Hide password',
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
  SHOW_PASSWORD: 'Show password',
  SIGN_IN_BUTTON_TEXT: 'Sign in',
  SIGN_IN_TEXT: 'Sign in to your account',
  SIGN_IN_TAB: 'Sign In',
  SIGN_IN_WITH_AMAZON: 'Sign In with Amazon',
  SIGN_IN_WITH_APPLE: 'Sign In with Apple',
  SIGN_IN_WITH_FACEBOOK: 'Sign In with Facebook',
  SIGN_IN_WITH_GOOGLE: 'Sign In with Google',
  SIGN_UP_BUTTON_TEXT: 'Create a new account',
  SIGNING_IN_BUTTON_TEXT: 'Signing in',
  SKIP_TEXT: 'Skip',
  VERIFY_HEADING: 'Account recovery requires verified contact information',
  VERIFY_TEXT: 'Verify',
  VERIFY_CONTACT: 'Verify Contact',
  CREATING_ACCOUNT: 'Creating Account',
} as const;

// type Phrase = "Back to Sign In" | "Change Password" | ...
// TODO: should just be defined directly?
export type Phrase = typeof DefaultTexts[keyof typeof DefaultTexts];

export type Dict = Partial<Record<Phrase, string>>;
