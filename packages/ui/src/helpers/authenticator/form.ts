/**
 * This file contains helpers related to forms and input attributes.
 */

import {
  AuthInputAttributes,
  CommonFields,
  FormField,
  SignUpAttribute,
} from '../../types';

export const authInputAttributes: AuthInputAttributes = {
  birthdate: {
    label: 'Birthdate',
    placeholder: 'Birthdate',
    type: 'date',
    autocomplete: 'bday',
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

export const getFormDataFromEvent = (event: Event) => {
  const formData = new FormData(event.target as HTMLFormElement);
  return Object.fromEntries(formData);
};

export const setFormOrder = (
  formOverrides: FormField,
  fieldNames: Array<SignUpAttribute | CommonFields>
): Array<string | number> => {
  type keyValues = string | number;
  let orderedKeys = [] as keyValues[];
  if (formOverrides) {
    orderedKeys = Object.keys(formOverrides)
      .reduce((prev, key) => {
        // reduce to array that can be sorted
        prev.push([key, formOverrides[key]?.order as number]);
        return prev;
      }, [] as Array<Array<keyValues>>)
      .sort(
        (a: keyValues[], b: keyValues[]) =>
          //sort them based on order
          (a as number[])[1] - (b as number[])[1]
      ) // returned just key
      .filter((a) => a[1] !== undefined)
      .map((a: keyValues[]) => a[0]);
  }

  // remove duplicates
  return Array.from(new Set([...orderedKeys, ...fieldNames]));
};
