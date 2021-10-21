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
  BACK_SIGN_IN: 'Back to Sign In',
  CHANGE_PASSWORD: 'Change Password',
  CHANGING_PASSWORD: 'Changing',
  CODE: 'Code',
  CONFIRM_PASSWORD: 'Confirm Password',
  CONFIRM_RESET_PASSWORD_HEADING: 'Reset your Password',
  SUBMIT: 'Submit',
  CONFIRM_SIGNUP_HEADING: 'Confirm Sign Up',
  CONFIRM_SMS: 'Confirm SMS Code',
  CONFIRM: 'Confirm',
  CONFIRM_TOTP: 'Confirm TOTP Code',
  CONFIRMATION_CODE: 'Confirmation Code',
  CONFIRMING: 'Confirming',
  CREATE_ACCOUNT: 'Create Account',
  CREATING_ACCOUNT: 'Creating Account',
  EMAIL_ADDRESS: 'Email',
  ENTER_CODE: 'Enter your code',
  ENTER_USERNAME: 'Enter your username',
  FORGOT_YOUR_PASSWORD: 'Forgot your password? ',
  HIDE_PASSWORD: 'Hide password',
  LOADING: 'Loading',
  LOGIN_NAME: 'Username',
  PASSWORD: 'Password',
  PHONE_NUMBER: 'Phone Number',
  RESEND_CODE: 'Resend Code',
  RESET_PASSWORD_HEADING: 'Reset your password',
  RESET_PASSWORD: 'Send Code',
  SEND_CODE: 'Send code',
  SENDING: 'Sending',
  SETUP_TOTP: 'Setup TOTP',
  SHOW_PASSWORD: 'Show password',
  SIGN_IN_BUTTON: 'Sign in',
  SIGN_IN_TAB: 'Sign In',
  SIGN_IN: 'Sign in to your account',
  SIGN_IN_WITH_AMAZON: 'Sign In with Amazon',
  SIGN_IN_WITH_APPLE: 'Sign In with Apple',
  SIGN_IN_WITH_FACEBOOK: 'Sign In with Facebook',
  SIGN_IN_WITH_GOOGLE: 'Sign In with Google',
  SIGN_UP_BUTTON: 'Create a new account',
  SIGNING_IN_BUTTON: 'Signing in',
  SKIP: 'Skip',
  SUBMITTING: 'Submitting',
  VERIFY_CONTACT: 'Verify Contact',
  VERIFY_HEADING: 'Account recovery requires verified contact information',
  VERIFY: 'Verify',
} as const;

// type Phrase = "Back to Sign In" | "Change Password" | ...
// TODO: should just be defined directly?
export type Phrase = typeof DefaultTexts[keyof typeof DefaultTexts];

export type Dict = Partial<Record<Phrase, string>>;
