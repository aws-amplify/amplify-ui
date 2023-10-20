import { Amplify } from 'aws-amplify';
import * as Auth from '@aws-amplify/auth';
import { hasSpecialChars } from '../../helpers';

import {
  LoginMechanism,
  // AuthChallengeName,
  PasswordSettings,
  SignUpAttribute,
  SocialProvider,
  // SignInResult,
  ValidatorResult,
} from '../../types';
import { groupLog } from '../../utils';

export const defaultServices = {
  async getAmplifyConfig() {
    const result = Amplify.getConfig();
    groupLog('+++getAmplifyConfig', 'result', result);

    const cliConfig = result.Auth.Cognito;
    const parsedLoginMechanisms = Object.entries(cliConfig.loginWith)
      .filter(([key, _value]) => key !== 'oauth')
      .filter(([_key, value]) => !!value)
      .map((keyValueArray) => {
        return keyValueArray[0] === 'phone' // the key for phone_number is phone in getConfig but everywhere else we treat is as phone_number
          ? 'phone_number'
          : keyValueArray[0];
      }) as LoginMechanism[];
    const parsedSignupAttributes = Object.entries(cliConfig.userAttributes).map(
      ([_key, value]) => Object.keys(value)[0]
    ) as SignUpAttribute[];
    const parsedSocialProviders = cliConfig.loginWith?.oauth?.providers?.map(
      (provider) => provider.toString().toLowerCase()
    ) as SocialProvider[];
    return {
      ...cliConfig,
      loginMechanisms: parsedLoginMechanisms,
      signUpAttributes: parsedSignupAttributes,
      socialProviders: parsedSocialProviders,
    };
  },
  async getCurrentUser() {
    return {
      ...(await Auth.getCurrentUser()),
      attributes: { ...(await Auth.fetchUserAttributes()) },
    };
  },
  // async handleSignUp(formData) {
  //   return Auth.signUp({ ...formData, autoSignIn: { enabled: true } });
  // },
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
    const input: Auth.SignUpInput = {
      username,
      password,
      options: {
        userAttributes,
        autoSignIn: true,
      },
    };
    return Auth.signUp(input);
  },
  async handleSignIn({
    username,
    password,
  }: {
    username: string;
    password: string;
  }): Promise<Auth.SignInOutput> {
    return Auth.signIn({ username, password });
  },
  async handleConfirmSignIn(
    input: Auth.ConfirmSignInInput
  ): Promise<Auth.ConfirmSignInOutput> {
    return Auth.confirmSignIn(
      input
      // {
      //   // user,
      //   code,
      // }
      // // cast due to restrictive typing of Auth.confirmSignIn
      // mfaType as 'SMS_MFA' | 'SOFTWARE_TOKEN_MFA'
    );
  },
  async handleConfirmSignUp(
    input: Auth.ConfirmSignUpInput
  ): Promise<Auth.ConfirmSignUpOutput> {
    return await Auth.confirmSignUp(input);
  },
  async handleForgotPasswordSubmit(
    input: Auth.ConfirmResetPasswordInput
  ): Promise<ReturnType<typeof Auth.confirmResetPassword>> {
    return Auth.confirmResetPassword(input);
  },
  async handleForgotPassword(input: Auth.ResetPasswordInput): Promise<any> {
    // return Auth.forgotPassword(formData);
    return Auth.resetPassword(input);
  },

  // Validation hooks for overriding
  async validateCustomSignUp(formData, touchData): Promise<ValidatorResult> {},
  async validateFormPassword<Validator>(
    formData,
    touchData,
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

    const policyMinLength = +passwordSettings?.minLength;
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
  async validateConfirmPassword<Validator>(
    formData,
    touchData
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
    formData,
    touchData
  ): Promise<ValidatorResult> {},
};
