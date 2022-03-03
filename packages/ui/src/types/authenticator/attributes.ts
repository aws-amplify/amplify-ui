// https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-settings-attributes.html
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

export type SignUpFieldsWithDefaults = typeof signUpFieldsWithDefault[number];

export const signUpFieldsWithoutDefault = [
  'address',
  'gender',
  'locale',
  'picture',
  'updated_at',
  'zoneinfo',
] as const;

export type SignUpFieldsWithoutDefaults =
  typeof signUpFieldsWithoutDefault[number];

export type SignUpAttribute =
  | SignUpFieldsWithDefaults
  | SignUpFieldsWithoutDefaults;

export type CommonFields = 'username' | 'password' | 'confirm_password';

export const LoginMechanismArray = [
  'username',
  'email',
  'phone_number',
] as const;

export type LoginMechanism = typeof LoginMechanismArray[number];

export type SocialProvider = 'amazon' | 'apple' | 'facebook' | 'google';

// Auth fields that we provide default fields with
export type AuthFieldsWithDefaults =
  | LoginMechanism
  | SignUpFieldsWithDefaults
  | 'confirmation_code'
  | 'password';

export interface InputAttributes {
  label: string;
  type: string;
  placeholder: string;
  autocomplete?: string;
}

export type AuthInputAttributes = Record<
  AuthFieldsWithDefaults,
  InputAttributes
>;
