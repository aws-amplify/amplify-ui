import { UserAttributeKey } from 'aws-amplify/auth';

// sign up attributes keys that have default UI properties (placeholder, label, etc)
// if included in Authenticator configuration
const SUPPORTED_SIGNUP_ATTRIBUTE = [
  'birthdate',
  'email',
  'family_name',
  'given_name',
  'middle_name',
  'name',
  'nickname',
  'phone_number',
  'preferred_username',
  'profile',
  'website',
] as const;

// sign up attributes keys that DO NOT have default UI properties (placeholder, label, etc)
// if included in Authenticator configuration
const UNSUPPORTED_SIGNUP_ATTRIBUTE = [
  'address',
  'gender',
  'locale',
  'picture',
  'updated_at',
  'zoneinfo',
] as const;

export const SIGN_UP_ATTRIBUTES = [
  ...SUPPORTED_SIGNUP_ATTRIBUTE,
  ...UNSUPPORTED_SIGNUP_ATTRIBUTE,
] as const;

export type CustomSignUpAttribute = `custom:${string}`;

/** All known auth fields */
export type SignUpAttribute =
  | (typeof SIGN_UP_ATTRIBUTES)[number]
  | CustomSignUpAttribute;

/** Fields that are common in all routes */
export type CommonFields = 'username' | 'password' | 'confirm_password';

/** Array of known login mechanisms */
export const LOGIN_MECHANISMS = ['username', 'email', 'phone_number'] as const;

/**
 * Default supported federated sign sn providers
 */
export type FederatedProvider = 'amazon' | 'apple' | 'facebook' | 'google';

/** Login mechanisms that can be used to sign in */
export type LoginMechanism = (typeof LOGIN_MECHANISMS)[number];

export const SOCIAL_PROVIDERS = [
  'apple',
  'amazon',
  'facebook',
  'google',
] as const;

/** List of social provider Authenticator supports */
export type SocialProvider = (typeof SOCIAL_PROVIDERS)[number];

export const authFieldsWithDefaults = [
  ...LOGIN_MECHANISMS,
  ...SUPPORTED_SIGNUP_ATTRIBUTE,
  'confirmation_code',
  'password',
  'confirm_password',
] as const;

/** Input fields that we provide default fields with */
export type AuthFieldsWithDefaults = (typeof authFieldsWithDefaults)[number];

export const isAuthFieldsWithDefaults = (
  field: string
): field is AuthFieldsWithDefaults => {
  return authFieldsWithDefaults.includes(field as AuthFieldsWithDefaults);
};

export type UserAttributes = Partial<Record<UserAttributeKey, string>>;
