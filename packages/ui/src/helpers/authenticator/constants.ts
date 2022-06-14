/**
 * This file contains helpers related to forms and input attributes.
 */

import { DefaultFormFieldOptions } from '../../types';
import { countryDialCodes } from '../../i18n';

export const defaultFormFieldOptions: DefaultFormFieldOptions = {
  birthdate: {
    label: 'Birthdate',
    labelHidden: true,
    placeholder: 'Birthdate',
    type: 'date',
    autocomplete: 'bday',
    isRequired: true,
  },
  confirmation_code: {
    label: 'Confirmation Code',
    labelHidden: true,
    placeholder: 'Code',
    type: 'number',
    autocomplete: 'one-time-code',
    isRequired: true,
  },
  confirm_password: {
    label: 'Confirm Password',
    labelHidden: true,
    placeholder: 'Confirm Password',
    type: 'password',
    autocomplete: 'new-password',
    isRequired: true,
  },
  email: {
    label: 'Email',
    labelHidden: true,
    placeholder: 'Email',
    type: 'email',
    autocomplete: 'username',
    isRequired: true,
  },
  family_name: {
    label: 'Family Name',
    labelHidden: true,
    placeholder: 'Family Name',
    type: 'text',
    autocomplete: 'family-name',
    isRequired: true,
  },
  given_name: {
    label: 'Given Name',
    labelHidden: true,
    placeholder: 'Given Name',
    type: 'text',
    autocomplete: 'given-name',
    isRequired: true,
  },
  middle_name: {
    label: 'Middle Name',
    labelHidden: true,
    placeholder: 'Middle Name',
    type: 'text',
    autocomplete: 'additional-name',
    isRequired: true,
  },
  name: {
    label: 'Name',
    labelHidden: true,
    placeholder: 'Name',
    type: 'text',
    autocomplete: 'name',
    isRequired: true,
  },
  nickname: {
    label: 'Nickname',
    labelHidden: true,
    placeholder: 'Nickname',
    type: 'text',
    autocomplete: 'tel',
    isRequired: true,
  },
  password: {
    label: 'Password',
    labelHidden: true,
    placeholder: 'Password',
    type: 'password',
    autocomplete: 'new-password',
    isRequired: true,
  },
  phone_number: {
    label: 'Phone Number',
    labelHidden: true,
    placeholder: 'Phone',
    type: 'tel',
    autocomplete: 'tel',
    dialCode: '+1',
    dialCodeList: countryDialCodes,
    isRequired: true,
  },
  preferred_username: {
    label: 'Preferred Username',
    labelHidden: true,
    placeholder: 'Preferred Username',
    type: 'text',
    isRequired: true,
  },
  profile: {
    label: 'Profile',
    labelHidden: true,
    placeholder: 'Profile',
    type: 'url',
    autocomplete: 'url',
    isRequired: true,
  },
  website: {
    label: 'Website',
    labelHidden: true,
    placeholder: 'Website',
    type: 'url',
    autocomplete: 'url',
    isRequired: true,
  },
  username: {
    label: 'Username',
    labelHidden: true,
    placeholder: 'Username',
    type: 'text',
    autocomplete: 'username',
    isRequired: true,
  },
} as const;

/**
 * List of special characters that Cognito allows.
 *
 * Adapted from https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-settings-policies.html
 */
// prettier-ignore
export const ALLOWED_SPECIAL_CHARACTERS = [
  '^',  '$', '*', '.', '[', ']',
  '{',  '}', '(', ')', '?', '"',
  '!',  '@', '#', '%', '&', '/',
  '\\', ',', '>', '<', "'", ':',
  ';',  '|', '_', '~', '`', '=',
  '+',  '-', ' '
];
