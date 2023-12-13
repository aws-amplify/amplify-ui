import pickBy from 'lodash/pickBy.js';

import { AuthActorContext } from './types';
import { SignUpInput, UserAttributeKey } from 'aws-amplify/auth';
import { LoginMechanism, UserAttributes } from '../../types';
import { isString } from '../../utils';

// default `autoSignIn` flag is `true`
const DEFAULT_AUTO_SIGN_IN = true;
const EMPTY_STRING = '';

export const sanitizePhoneNumber = (dialCode: string, phoneNumber: string) =>
  `${dialCode}${phoneNumber}`.replace(/[^A-Z0-9+]/gi, '');

const selectUserAttributes = (_: string | undefined, key: UserAttributeKey) => {
  // Allowlist of Cognito User Pool Attributes (from OpenID Connect specification)
  // See: https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-settings-attributes.html
  switch (key) {
    case 'address':
    case 'birthdate':
    case 'email':
    case 'family_name':
    case 'gender':
    case 'given_name':
    case 'locale':
    case 'middle_name':
    case 'name':
    case 'nickname':
    case 'phone_number':
    case 'picture':
    case 'preferred_username':
    case 'profile':
    case 'updated_at':
    case 'website':
    case 'zoneinfo':
      return true;

    // Otherwise, it's a custom attribute
    default:
      return key.startsWith('custom:');
  }
};

export const getUserAttributes = (
  formValues: AuthActorContext['formValues']
): UserAttributes => {
  const { phone_number, ...userAttributes } = pickBy(
    formValues,
    selectUserAttributes
  );

  // only include `phone_number` attribute in `userAttributes` if it has a value
  if (isString(phone_number) && phone_number !== EMPTY_STRING) {
    const { country_code } = formValues;
    return {
      ...userAttributes,
      phone_number: sanitizePhoneNumber(country_code, phone_number),
    };
  }

  return userAttributes;
};

export const getSignUpInput = (
  username: string,
  formValues: AuthActorContext['formValues'],
  loginMechanism: LoginMechanism
): SignUpInput => {
  const { password, ...values } = formValues;
  const attributes = getUserAttributes(values);

  const options: SignUpInput['options'] = {
    autoSignIn: DEFAULT_AUTO_SIGN_IN,
    userAttributes: {
      // use `username` value for `phone_number`
      ...(loginMechanism === 'phone_number'
        ? { ...attributes, phone_number: username }
        : attributes),
    },
  };

  return { username, password, options };
};

export const getUsernameSignUp = ({
  formValues,
  loginMechanisms,
}: AuthActorContext) => {
  const loginMechanism = loginMechanisms[0];

  if (loginMechanism === 'phone_number') {
    const { country_code, phone_number } = formValues;
    return sanitizePhoneNumber(country_code, phone_number);
  }

  return formValues[loginMechanism];
};
