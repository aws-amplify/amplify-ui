import { Amplify, ResourcesConfig } from 'aws-amplify';

import {
  confirmResetPassword,
  confirmSignIn,
  confirmSignUp,
  getCurrentUser,
  resetPassword,
  signIn,
  signUp,
} from 'aws-amplify/auth';
import { hasSpecialChars } from '../../helpers';

import {
  AuthFormData,
  AuthTouchData,
  CustomSignUpAttribute,
  LoginMechanism,
  LOGIN_MECHANISMS,
  PasswordSettings,
  SOCIAL_PROVIDERS,
  SIGN_UP_ATTRIBUTES,
  SocialProvider,
  ValidatorResult,
  SignUpAttribute,
} from '../../types';

// Cognito does not allow a password length less then 8 characters
const DEFAULT_COGNITO_PASSWORD_MIN_LENGTH = 8;

type UserAttributes = ResourcesConfig['Auth']['Cognito']['userAttributes'];
type InvalidUserAttributes =
  ResourcesConfig['Auth']['Cognito']['userAttributes'][];
type LoginWith = ResourcesConfig['Auth']['Cognito']['loginWith'];

const isInvalidUserAttributes = (
  userAttributes: UserAttributes | InvalidUserAttributes
): userAttributes is InvalidUserAttributes => Array.isArray(userAttributes);

const isSignUpAttribute = (
  value: string | undefined
): value is SignUpAttribute =>
  SIGN_UP_ATTRIBUTES.includes(
    value as Exclude<SignUpAttribute, CustomSignUpAttribute>
  ) || value?.startsWith('custom:');

const getUserAttributes = (
  userAttributes: UserAttributes | InvalidUserAttributes
): SignUpAttribute[] => {
  if (!userAttributes) {
    return [];
  }

  // `aws-amplify` versions <= 6.0.5 return an array of `userAttributes` rather than an object
  if (isInvalidUserAttributes(userAttributes)) {
    return Object.values(userAttributes).reduce((acc, value) => {
      const attribute = Object.keys(value)[0];
      return isSignUpAttribute(attribute) ? [...acc, attribute] : acc;
    }, []);
  }

  return Object.keys(userAttributes).filter(isSignUpAttribute);
};

const isLoginMechanism = (value: string | undefined): value is LoginMechanism =>
  LOGIN_MECHANISMS.includes(value as LoginMechanism);

const getLoginMechanisms = (values: LoginWith = {}): LoginMechanism[] =>
  Object.entries(values).reduce((acc, [key, includeMechanism]) => {
    // the key for phone_number is phone in getConfig but everywhere else we treat is as phone_number
    const loginMechanism = key === 'phone' ? 'phone_number' : key;
    return includeMechanism && isLoginMechanism(loginMechanism)
      ? [...acc, loginMechanism]
      : acc;
  }, []);

const isSocialProvider = (value: unknown): value is SocialProvider =>
  SOCIAL_PROVIDERS.includes(value as SocialProvider);

const getSocialProviders = (values: LoginWith): SocialProvider[] =>
  (values?.oauth?.providers ?? []).reduce((acc, provider) => {
    const socialProvider = provider.toString().toLowerCase();
    return isSocialProvider(socialProvider) ? [...acc, socialProvider] : acc;
  }, []);

export const getConfig = (): {
  loginMechanisms: LoginMechanism[];
  signUpAttributes: SignUpAttribute[];
  socialProviders: SocialProvider[];
  passwordSettings: PasswordSettings;
} => {
  const { Auth } = Amplify.getConfig();

  const {
    loginWith,
    userAttributes,
    passwordFormat: passwordSettings = {},
  } = Auth?.Cognito ?? {};

  const loginMechanisms = getLoginMechanisms(loginWith);
  const signUpAttributes = getUserAttributes(userAttributes);
  const socialProviders = getSocialProviders(loginWith);

  return {
    loginMechanisms,
    passwordSettings,
    signUpAttributes,
    socialProviders,
  };
};

export const defaultServices = {
  async getAmplifyConfig() {
    return getConfig();
  },
  getCurrentUser,
  handleSignIn: signIn,
  handleSignUp: signUp,
  handleConfirmSignIn: confirmSignIn,
  handleConfirmSignUp: confirmSignUp,
  handleForgotPasswordSubmit: confirmResetPassword,
  handleForgotPassword: resetPassword,

  // Validation hooks for overriding
  async validateCustomSignUp(
    formData: AuthFormData,
    touchData: AuthTouchData
  ): Promise<ValidatorResult> {},
  async validateFormPassword(
    formData: AuthFormData,
    touchData: AuthTouchData,
    passwordSettings: PasswordSettings
  ): Promise<ValidatorResult> {
    const { password } = formData;

    const { password: touched_password } = touchData;

    /**
     * If the password is not touched,
     * or if the password settings are not set, we don't need to validate it.
     */
    if (!touched_password || !passwordSettings) return null;

    const password_complexity = [];

    const policyMinLength =
      passwordSettings.minLength ?? DEFAULT_COGNITO_PASSWORD_MIN_LENGTH;
    if (password.length < policyMinLength) {
      password_complexity.push(
        `Password must have at least ${policyMinLength} characters`
      );
    }

    if (passwordSettings.requireLowercase && !/[a-z]/.test(password))
      password_complexity.push('Password must have lower case letters');

    if (passwordSettings.requireUppercase && !/[A-Z]/.test(password))
      password_complexity.push('Password must have upper case letters');

    if (passwordSettings.requireNumbers && !/[0-9]/.test(password))
      password_complexity.push('Password must have numbers');

    // https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-settings-policies.html
    if (passwordSettings.requireSpecialCharacters && !hasSpecialChars(password))
      password_complexity.push('Password must have special characters');

    /**
     * Only return an error if there is at least one error.
     */
    return password_complexity.length !== 0
      ? { password: password_complexity }
      : null;
  },
  async validateConfirmPassword(
    formData: AuthFormData,
    touchData: AuthTouchData
  ): Promise<ValidatorResult> {
    const { password, confirm_password } = formData;

    const {
      confirm_password: touched_confirm_password,
      password: touched_password,
    } = touchData;

    if (!password && !confirm_password) {
      // these inputs are clean, don't complain yet
      return null;
    } else if (
      (password || confirm_password) &&
      password !== confirm_password &&
      ((touched_confirm_password && touched_password) ||
        (password?.length >= 6 && confirm_password?.length >= 6))
    ) {
      // Only return an error if both fields have text entered,
      // the passwords do not match, and the fields have been
      // touched or the password and confirm password is longer then or equal to 6.
      return {
        confirm_password: 'Your passwords must match',
      };
    }
  },
  async validatePreferredUsername(
    formData: AuthFormData,
    touchData: AuthTouchData
  ): Promise<ValidatorResult> {},
};
