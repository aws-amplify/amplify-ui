import { Amplify } from 'aws-amplify';
import * as Auth from '@aws-amplify/auth';
import { hasSpecialChars } from '../../helpers';

import {
  // AuthChallengeName,
  PasswordSettings,
  // SignInResult,
  ValidatorResult,
} from '../../types';
import { groupLog } from '../../utils';

export const defaultServices = {
  async getAmplifyConfig() {
    const result = Amplify.getConfig();
    groupLog('+++getAmplifyConfig', 'result', result);
    return result;
  },
  async getCurrentUser() {
    return Auth.getCurrentUser();
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
        serviceOptions: {
          autoSignIn: true, // This enables the auto sign-in flow.
        },
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

    const policyMinLength = +passwordSettings?.passwordPolicyMinLength;
    if (password.length < policyMinLength) {
      password_complexity.push(
        `Password must have at least ${policyMinLength} characters`
      );
    }

    const passwordPolicyCharacters = passwordSettings?.passwordPolicyCharacters;

    passwordPolicyCharacters?.forEach((errorCheck) => {
      switch (errorCheck) {
        case 'REQUIRES_LOWERCASE':
          if (!/[a-z]/.test(password))
            password_complexity.push('Password must have lower case letters');
          break;
        case 'REQUIRES_UPPERCASE':
          if (!/[A-Z]/.test(password))
            password_complexity.push('Password must have upper case letters');
          break;
        case 'REQUIRES_NUMBERS':
          if (!/[0-9]/.test(password))
            password_complexity.push('Password must have numbers');
          break;
        case 'REQUIRES_SYMBOLS':
          // https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-settings-policies.html
          if (!hasSpecialChars(password))
            password_complexity.push('Password must have special characters');
          break;
        default:
          break;
      }
    });

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
