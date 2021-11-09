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
import {
  deDict,
  enDict,
  esDict,
  frDict,
  itDict,
  jaDict,
  zhDict,
} from './dictionaries';

/**
 * Contains translatable strings that authenticator provides by default. Customers
 * can use this to add custom vocabularies:
 *
 * ```
 * I18n.putVocabulariesForLanguage("en", {
 *  [DefaultTexts.SIGN_IN]: "Custom Sign In Text",
 *  [DefaultTexts.SIGN_IN_BUTTON]: "Custom Click Here to Sign In"
 * });
 * ```
 */
export const DefaultTexts = {
  BACK_SIGN_IN: 'Back to Sign In',
  BIRTHDATE: 'Birthdate',
  CHANGE_PASSWORD: 'Change Password',
  CHANGING_PASSWORD: 'Changing',
  CODE: 'Code',
  CONFIRM_PASSWORD: 'Confirm Password',
  CONFIRM_RESET_PASSWORD_HEADING: 'Reset your Password',
  CONFIRM_SIGNUP_HEADING: 'Confirm Sign Up',
  CONFIRM_SMS: 'Confirm SMS Code',
  CONFIRM_TOTP: 'Confirm TOTP Code',
  CONFIRM: 'Confirm',
  CONFIRMATION_CODE: 'Confirmation Code',
  CONFIRMING: 'Confirming',
  CREATE_ACCOUNT: 'Create Account',
  CREATING_ACCOUNT: 'Creating Account',
  EMAIL_ADDRESS: 'Email',
  ENTER_CODE: 'Enter your code',
  ENTER_USERNAME: 'Enter your username',
  GIVEN_NAME: 'Given Name',
  FORGOT_YOUR_PASSWORD: 'Forgot your password? ',
  HIDE_PASSWORD: 'Hide password',
  LOADING: 'Loading',
  LOGIN_NAME: 'Username',
  MIDDLE_NAME: 'Middle Name',
  NAME: 'Name',
  NICKNAME: 'Nickname',
  NEW_PASSWORD: 'New password',
  PASSWORD: 'Password',
  PHONE_NUMBER: 'Phone Number',
  PREFERRED_USERNAME: 'Preferred Username',
  PROFILE: 'Profile',
  RESEND_CODE: 'Resend Code',
  RESET_PASSWORD_HEADING: 'Reset your password',
  RESET_PASSWORD: 'Send Code',
  SEND_CODE: 'Send code',
  SENDING: 'Sending',
  SETUP_TOTP: 'Setup TOTP',
  SHOW_PASSWORD: 'Show password',
  SIGN_IN_BUTTON: 'Sign in',
  SIGN_IN_TAB: 'Sign In',
  SIGN_IN_WITH_AMAZON: 'Sign In with Amazon',
  SIGN_IN_WITH_APPLE: 'Sign In with Apple',
  SIGN_IN_WITH_FACEBOOK: 'Sign In with Facebook',
  SIGN_IN_WITH_GOOGLE: 'Sign In with Google',
  SIGN_IN: 'Sign in to your account',
  SIGN_UP_BUTTON: 'Create a new account',
  SIGNING_IN_BUTTON: 'Signing in',
  SKIP: 'Skip',
  SUBMIT: 'Submit',
  SUBMITTING: 'Submitting',
  VERIFY_CONTACT: 'Verify Contact',
  VERIFY_HEADING: 'Account recovery requires verified contact information',
  VERIFY: 'Verify',
  WEBSITE: 'Website',
} as const;

// type Phrase = "Back to Sign In" | "Change Password" | ...
export type Phrase = typeof DefaultTexts[keyof typeof DefaultTexts];

/**
 * TODO: Translation keys for dictionaries can be inferred from DefaultTexts
 * by typing it to Partial<Record<Phrase, string>>.
 *
 * But this requires error string keys to be standarized as well, and can be a
 * limiting factor for custom translation keys. Marking it as TODO until we see
 * a reason to strongly type this.
 */
export type Dict = Record<string, string>;

/**
 * This helper type checks that given phrase is one of the texts @aws-amplify/ui
 * provides by default. This enables vscode autocompletion to help catch typos
 * during development.
 *
 * You can also use translate<string> to handle custom strings or dynamic content.
 */
export function translate<T = Phrase>(phrase: NoInfer<T>): string {
  return I18n.get(phrase);
}

export const translations: Record<string, Dict> = {
  de: deDict,
  en: enDict,
  es: esDict,
  fr: frDict,
  it: itDict,
  ja: jaDict,
  zh: zhDict,
};
