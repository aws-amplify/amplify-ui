import pickBy from 'lodash/pickBy.js';

import type { AuthActorContext, AuthMethod } from './types';
import type { SignUpInput, UserAttributeKey } from 'aws-amplify/auth';
import type { LoginMechanism, UserAttributes } from '../../types';
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
  loginMechanism: LoginMechanism,
  authMethod?: AuthMethod
): SignUpInput => {
  const { password, ...values } = formValues;
  const attributes = getUserAttributes(values);

  const isPasswordless = authMethod && authMethod !== 'PASSWORD';

  const options: SignUpInput['options'] = {
    autoSignIn: isPasswordless
      ? {
          enabled: true,
          authFlowType: 'USER_AUTH',
          preferredChallenge: authMethod,
        }
      : DEFAULT_AUTO_SIGN_IN,
    userAttributes: {
      // use `username` value for `phone_number`
      ...(loginMechanism === 'phone_number'
        ? { ...attributes, phone_number: username }
        : attributes),
    },
  };

  return { username, password: isPasswordless ? undefined : password, options };
};

export const getUsernameSignUp = ({
  formValues,
  loginMechanisms,
}: AuthActorContext) => {
  // Check if a specific auth method was selected via form data
  const authMethod = formValues.__authMethod;

  // For SMS_OTP, always use phone_number as username
  if (authMethod === 'SMS_OTP') {
    const { country_code, phone_number } = formValues;
    return sanitizePhoneNumber(country_code, phone_number);
  }

  // For EMAIL_OTP, always use email as username
  if (authMethod === 'EMAIL_OTP') {
    return formValues.email;
  }

  // When 'username' is in loginMechanisms, always use the username field for the Username parameter.
  // This handles both username-only mode and alias mode (username + email/phone as sign-in options).
  // See: https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-settings-attributes.html#user-pool-settings-aliases
  if (loginMechanisms.includes('username')) {
    return formValues.username;
  }

  const loginMechanism = loginMechanisms[0];

  if (loginMechanism === 'phone_number') {
    const { country_code, phone_number } = formValues;
    return sanitizePhoneNumber(country_code, phone_number);
  }

  // Otherwise, use the primary login mechanism (email as username)
  return formValues[loginMechanism];
};

/**
 * Get available authentication methods based on backend capabilities and hidden methods
 */
export const getAvailableAuthMethods = (
  passwordlessCapabilities?: {
    emailOtpEnabled: boolean;
    smsOtpEnabled: boolean;
    webAuthnEnabled: boolean;
  },
  hiddenAuthMethods?: Array<'PASSWORD' | 'EMAIL_OTP' | 'SMS_OTP' | 'WEB_AUTHN'>
): Array<'PASSWORD' | 'EMAIL_OTP' | 'SMS_OTP' | 'WEB_AUTHN'> => {
  const allMethods: Array<'PASSWORD' | 'EMAIL_OTP' | 'SMS_OTP' | 'WEB_AUTHN'> =
    [];

  // If hiddenAuthMethods is explicitly provided (even as empty array),
  // assume all methods are available and let hiddenAuthMethods filter them
  const assumeAllAvailable = hiddenAuthMethods !== undefined;

  // PASSWORD is always available by default
  allMethods.push('PASSWORD');

  // Add passwordless methods if backend supports them OR if hiddenAuthMethods is explicitly set
  if (assumeAllAvailable || passwordlessCapabilities?.emailOtpEnabled) {
    allMethods.push('EMAIL_OTP');
  }
  if (assumeAllAvailable || passwordlessCapabilities?.smsOtpEnabled) {
    allMethods.push('SMS_OTP');
  }
  if (assumeAllAvailable || passwordlessCapabilities?.webAuthnEnabled) {
    allMethods.push('WEB_AUTHN');
  }

  // Filter out hidden methods
  const hidden = hiddenAuthMethods ?? [];
  const availableMethods = allMethods.filter(
    (method) => !hidden.includes(method)
  );

  // Validate that at least one method remains
  if (availableMethods.length === 0) {
    throw new Error(
      'InvalidPasswordlessAuthOptions: All authentication methods are hidden'
    );
  }

  return availableMethods;
};

/**
 * Get preferred authentication method or first available
 */
export const getPreferredAuthMethod = (
  availableMethods?: Array<'PASSWORD' | 'EMAIL_OTP' | 'SMS_OTP' | 'WEB_AUTHN'>,
  preferredAuthMethod?: 'PASSWORD' | 'EMAIL_OTP' | 'SMS_OTP' | 'WEB_AUTHN'
): 'PASSWORD' | 'EMAIL_OTP' | 'SMS_OTP' | 'WEB_AUTHN' | undefined => {
  if (!availableMethods || availableMethods.length === 0) {
    return undefined;
  }

  // If preferred method specified and available, use it
  if (preferredAuthMethod && availableMethods.includes(preferredAuthMethod)) {
    return preferredAuthMethod;
  }

  // Warn if preferred method is not available
  if (preferredAuthMethod && !availableMethods.includes(preferredAuthMethod)) {
    // eslint-disable-next-line no-console
    console.warn(
      `Preferred auth method "${preferredAuthMethod}" is not available. Using first available method.`
    );
  }

  // Return first available method
  return availableMethods[0];
};
