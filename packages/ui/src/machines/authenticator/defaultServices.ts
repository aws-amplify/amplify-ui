import { Amplify } from 'aws-amplify';

import {
  confirmResetPassword,
  ConfirmResetPasswordInput,
  confirmSignIn,
  ConfirmSignInInput,
  ConfirmSignInOutput,
  confirmSignUp,
  ConfirmSignUpInput,
  ConfirmSignUpOutput,
  getCurrentUser,
  resetPassword,
  ResetPasswordInput,
  signIn,
  SignInInput,
  SignInOutput,
  signUp,
  SignUpInput,
} from 'aws-amplify/auth';
import { hasSpecialChars } from '../../helpers';

import {
  AuthFormData,
  AuthTouchData,
  LoginMechanism,
  PasswordSettings,
  SignUpAttribute,
  SocialProvider,
  ValidatorResult,
} from '../../types';
import { groupLog } from '../../utils';
import { uniqueId } from 'lodash';

// Cognito does not allow a password length lower then 8 characters
const DEFAULT_COGNITO_PASSWORD_MIN_LENGTH = 8;

export const defaultServices = {
  async getAmplifyConfig() {
    const result = Amplify.getConfig();
    groupLog('+++getAmplifyConfig', 'result', result);

    const cliConfig = result.Auth?.Cognito;
    const { loginWith, userAttributes } = result.Auth?.Cognito ?? {};

    const parsedLoginMechanisms = loginWith
      ? (Object.entries(loginWith)
          .filter(([key, _value]) => key !== 'oauth')
          .filter(([_key, value]) => !!value)
          .map((keyValueArray) => {
            return keyValueArray[0] === 'phone' // the key for phone_number is phone in getConfig but everywhere else we treat is as phone_number
              ? 'phone_number'
              : keyValueArray[0];
          }) as LoginMechanism[])
      : undefined;

    const parsedSignupAttributes = userAttributes
      ? (Object.entries(userAttributes).map(
          ([_key, value]) => Object.keys(value)[0]
        ) as SignUpAttribute[])
      : undefined;

    const parsedSocialProviders = loginWith?.oauth?.providers
      ? (loginWith.oauth.providers?.map((provider) =>
          provider.toString().toLowerCase()
        ) as SocialProvider[])
      : undefined;
    return {
      ...cliConfig,
      loginMechanisms: parsedLoginMechanisms,
      signUpAttributes: parsedSignupAttributes,
      socialProviders: parsedSocialProviders,
    };
  },
  async getCurrentUser() {
    const id = uniqueId();
    groupLog(`+++getCurrentUser.defaultServices: ${id}`);
    return getCurrentUser()
      .then((user) => {
        console.log('getCurrentUser.defaultServices success', id, user);
        return user;
      })
      .catch((e) => {
        console.log('getCurrentUser.defaultServices fail', id, e);
        throw new Error(undefined);
      });
  },
  async handleSignUp({
    attributes: userAttributes,
    username,
    password,
  }: {
    username: string;
    password: string;
    attributes?: {
      // made optional to appease TS, no plan to fix
      email?: string;
    };
  }) {
    const input: SignUpInput = {
      username,
      password,
      options: {
        userAttributes,
        autoSignIn: true,
      } as SignUpInput['options'],
    };
    return signUp(input);
  },
  async handleSignIn({
    username,
    password,
  }: SignInInput): Promise<SignInOutput> {
    groupLog('+++handleSignIn');
    // #todo-migration logs error in failure use cases (fiorce new password, etc)
    return signIn({ username, password });
  },
  async handleConfirmSignIn(
    input: ConfirmSignInInput
  ): Promise<ConfirmSignInOutput> {
    return confirmSignIn(input);
  },
  async handleConfirmSignUp(
    input: ConfirmSignUpInput
  ): Promise<ConfirmSignUpOutput> {
    return confirmSignUp(input);
  },
  async handleForgotPasswordSubmit(
    input: ConfirmResetPasswordInput
  ): Promise<ReturnType<typeof confirmResetPassword>> {
    return confirmResetPassword(input);
  },
  async handleForgotPassword(input: ResetPasswordInput): Promise<any> {
    // return forgotPassword(formData);
    return resetPassword(input);
  },

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
