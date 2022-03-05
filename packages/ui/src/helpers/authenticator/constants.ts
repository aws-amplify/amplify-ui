/**
 * This file contains helpers related to forms and input attributes.
 */

import { countryDialCodes } from '../../i18n';
import { AuthInputAttributes, FormFieldOptions } from '../../types';

export const authInputAttributes: AuthInputAttributes = {
  birthdate: {
    label: 'Birthdate',
    placeholder: 'Birthdate',
    type: 'date',
    autocomplete: 'bday',
  },
  confirm_password: {
    label: 'Confirm Password',
    placeholder: 'Confirm Password',
    type: 'password',
    autocomplete: 'password',
  },
  confirmation_code: {
    label: 'Confirmation Code',
    placeholder: 'Code',
    type: 'number',
    autocomplete: 'one-time-code',
  },
  email: {
    label: 'Email',
    type: 'email',
    placeholder: 'Email',
    autocomplete: 'username',
  },
  family_name: {
    label: 'Family Name',
    placeholder: 'Family Name',
    type: 'text',
    autocomplete: 'family-name',
  },
  given_name: {
    label: 'Given Name',
    placeholder: 'Given Name',
    type: 'text',
    autocomplete: 'given-name',
  },
  middle_name: {
    label: 'Middle Name',
    placeholder: 'Middle Name',
    type: 'text',
    autocomplete: 'additional-name',
  },
  name: {
    label: 'Name',
    placeholder: 'Name',
    type: 'text',
    autocomplete: 'name',
  },
  nickname: {
    label: 'Nickname',
    placeholder: 'Nickname',
    type: 'text',
    autocomplete: 'tel',
  },
  password: {
    label: 'Password',
    placeholder: 'Password',
    type: 'password',
    autocomplete: 'password',
  },
  phone_number: {
    label: 'Phone Number',
    placeholder: 'Phone',
    type: 'tel',
    autocomplete: 'tel',
  },
  preferred_username: {
    label: 'Preferred Username',
    placeholder: 'Preferred Username',
    type: 'text',
  },
  profile: {
    label: 'Profile',
    placeholder: 'Profile',
    type: 'url',
    autocomplete: 'url',
  },
  website: {
    label: 'Website',
    placeholder: 'Website',
    type: 'url',
    autocomplete: 'url',
  },
  username: {
    label: 'Username',
    type: 'text',
    placeholder: 'Username',
    autocomplete: 'username',
  },
};

export const defaultFormFieldOptions = {
  birthdate: {
    label: 'Birthdate',
    labelHidden: true,
    placeholder: 'Birthdate',
    type: 'date',
    autocomplete: 'bday',
  },
  confirmation_code: {
    label: 'Confirmation Code',
    labelHidden: true,
    placeholder: 'Code',
    type: 'number',
    autocomplete: 'one-time-code',
  },
  confirm_password: {
    label: 'Confirm Password',
    labelHidden: true,
    placeholder: 'Confirm Password',
    type: 'password',
    autocomplete: 'password',
  },
  email: {
    label: 'Email',
    labelHidden: true,
    placeholder: 'Email',
    type: 'email',
    autocomplete: 'username',
  },
  family_name: {
    label: 'Family Name',
    labelHidden: true,
    placeholder: 'Family Name',
    type: 'text',
    autocomplete: 'family-name',
  },
  given_name: {
    label: 'Given Name',
    labelHidden: true,
    placeholder: 'Given Name',
    type: 'text',
    autocomplete: 'given-name',
  },
  middle_name: {
    label: 'Middle Name',
    labelHidden: true,
    placeholder: 'Middle Name',
    type: 'text',
    autocomplete: 'additional-name',
  },
  name: {
    label: 'Name',
    labelHidden: true,
    placeholder: 'Name',
    type: 'text',
    autocomplete: 'name',
  },
  nickname: {
    label: 'Nickname',
    labelHidden: true,
    placeholder: 'Nickname',
    type: 'text',
    autocomplete: 'tel',
  },
  password: {
    label: 'Password',
    labelHidden: true,
    placeholder: 'Password',
    type: 'password',
    autocomplete: 'password',
  },
  phone_number: {
    label: 'Phone Number',
    labelHidden: true,
    placeholder: 'Phone',
    type: 'tel',
    autocomplete: 'tel',
    dialCode: '+1',
    dialCodeList: countryDialCodes,
  },
  preferred_username: {
    label: 'Preferred Username',
    labelHidden: true,
    placeholder: 'Preferred Username',
    type: 'text',
  },
  profile: {
    label: 'Profile',
    labelHidden: true,
    placeholder: 'Profile',
    type: 'url',
    autocomplete: 'url',
  },
  website: {
    label: 'Website',
    labelHidden: true,
    placeholder: 'Website',
    type: 'url',
    autocomplete: 'url',
  },
  username: {
    label: 'Username',
    labelHidden: true,
    placeholder: 'Username',
    type: 'text',
    autocomplete: 'username',
  },
} as const;
