/*
 * Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with
 * the License. A copy of the License is located at
 *
 *     http://aws.amazon.com/apache2.0/
 *
 * or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions
 * and limitations under the License.
 */
import { I18n } from 'aws-amplify';
import { NoInfer } from '../types';
import { deDict, esDict, frDict, itDict, jaDict, zhDict } from './dictionaries';

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
export type Phrase = typeof DefaultTexts[keyof typeof DefaultTexts];

export type Dict = Partial<Record<Phrase, string>>;

/**
 * This helper type checks that given phrase is one of the texts @aws-amplify/ui
 * provides by default.
 *
 * This will enable vscode autocompleted and help catch typos during development.
 * For example, translate('Submit') is valid but translate('Subnit') is not.
 *
 * You can also use translate<string> to handle custom strings or dynamic content.
 */
export function translate<T = Phrase>(phrase: NoInfer<T>): string {
  return I18n.get(phrase);
}

/**
 * TODO: The string keys below can be inferred from DefaultTexts using
 * https://github.com/aws-amplify/amplify-ui/pull/189#discussion_r690896123,
 * but this needs translation key standarization. DefaultTexts above is more
 * accurate to what we use in authenticator@next.
 */
export const translations: Record<string, Dict> = {
  de: deDict,
  es: esDict,
  fr: frDict,
  it: itDict,
  ja: jaDict,
  zh: zhDict,
};
