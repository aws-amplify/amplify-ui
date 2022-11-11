/**
 * This file contains helpers related to forms and input attributes.
 */

import { DefaultFormFieldOptions } from '../../types';
import { countryDialCodes } from '../../i18n';

export const defaultFormFieldOptions: DefaultFormFieldOptions = {
  birthdate: {
    label: 'Birthdate',
    placeholder: 'Enter your Birthdate',
    type: 'date',
    autocomplete: 'bday',
    isRequired: true,
  },
  confirmation_code: {
    label: 'Confirmation Code',
    placeholder: 'Enter your Confirmation Code',
    type: 'number',
    autocomplete: 'one-time-code',
    isRequired: true,
  },
  confirm_password: {
    label: 'Confirm Password',
    placeholder: 'Please confirm your Password',
    type: 'password',
    autocomplete: 'new-password',
    isRequired: true,
  },
  email: {
    label: 'Email',
    placeholder: 'Enter your Email',
    type: 'email',
    autocomplete: 'username',
    isRequired: true,
  },
  family_name: {
    label: 'Family Name',
    placeholder: 'Enter your Family Name',
    type: 'text',
    autocomplete: 'family-name',
    isRequired: true,
  },
  given_name: {
    label: 'Given Name',
    placeholder: 'Enter your Given Name',
    type: 'text',
    autocomplete: 'given-name',
    isRequired: true,
  },
  middle_name: {
    label: 'Middle Name',
    placeholder: 'Enter your Middle Name',
    type: 'text',
    autocomplete: 'additional-name',
    isRequired: true,
  },
  name: {
    label: 'Name',
    placeholder: 'Enter your Name',
    type: 'text',
    autocomplete: 'name',
    isRequired: true,
  },
  nickname: {
    label: 'Nickname',
    placeholder: 'Enter your Nickname',
    type: 'text',
    autocomplete: 'tel',
    isRequired: true,
  },
  password: {
    label: 'Password',
    placeholder: 'Enter your Password',
    type: 'password',
    autocomplete: 'new-password',
    isRequired: true,
  },
  phone_number: {
    label: 'Phone Number',
    placeholder: 'Enter your Phone Number',
    type: 'tel',
    autocomplete: 'tel',
    dialCode: '+1',
    dialCodeList: countryDialCodes,
    isRequired: true,
  },
  preferred_username: {
    label: 'Preferred Username',
    placeholder: 'Enter your Preferred Username',
    type: 'text',
    isRequired: true,
  },
  profile: {
    label: 'Profile',
    placeholder: 'Add your Profile',
    type: 'url',
    autocomplete: 'url',
    isRequired: true,
  },
  website: {
    label: 'Website',
    placeholder: 'Add your Website',
    type: 'url',
    autocomplete: 'url',
    isRequired: true,
  },
  username: {
    label: 'Username',
    placeholder: 'Enter your Username',
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
