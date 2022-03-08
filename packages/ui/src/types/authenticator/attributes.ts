/** Array of auth fields that we supply defaults with */
export const signUpFieldsWithDefault = [
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

/** Auth fields that we supply defaults with */
export type SignUpFieldsWithDefaults = typeof signUpFieldsWithDefault[number];

/** Array of auth fields that we do not supply defaults with */
export const signUpFieldsWithoutDefault = [
  'address',
  'gender',
  'locale',
  'picture',
  'updated_at',
  'zoneinfo',
] as const;

/** Auth fields that we do not supply defaults with */
export type SignUpFieldsWithoutDefaults =
  typeof signUpFieldsWithoutDefault[number];

/** All known auth fields */
export type SignUpAttribute =
  | SignUpFieldsWithDefaults
  | SignUpFieldsWithoutDefaults;

/** Fields that are common in all routes */
export type CommonFields = 'username' | 'password' | 'confirm_password';

/** Array of known login mechanisms */
export const LoginMechanismArray = [
  'username',
  'email',
  'phone_number',
] as const;

/** Login mechanisms that can be used to sign in */
export type LoginMechanism = typeof LoginMechanismArray[number];

/** List of social provider Authenticator supports */
export type SocialProvider = 'amazon' | 'apple' | 'facebook' | 'google';

export const authFieldsWithDefaults = [
  ...LoginMechanismArray,
  ...signUpFieldsWithDefault,
  'confirmation_code',
  'password',
  'confirm_password',
] as const;

/** Input fields that we provide default fields with */
export type AuthFieldsWithDefaults = typeof authFieldsWithDefaults[number];
