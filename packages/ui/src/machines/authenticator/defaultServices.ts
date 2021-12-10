import { Amplify, Auth } from 'aws-amplify';

import { AuthChallengeNames, ValidatorResult } from '../../types';

export const defaultServices = {
  async getAmplifyConfig() {
    return Amplify.configure();
  },

  async getCurrentUser() {
    return Auth.currentAuthenticatedUser();
  },

  async handleSignUp(formData): Promise<any> {
    return Auth.signUp(formData);
  },
  async handleSignIn({
    username,
    password,
  }: {
    username: string;
    password: string;
  }): Promise<any> {
    return Auth.signIn(username, password);
  },
  async handleConfirmSignIn({
    user,
    code,
    mfaType,
  }: {
    user: string;
    code: string;
    mfaType: AuthChallengeNames.SMS_MFA | AuthChallengeNames.SOFTWARE_TOKEN_MFA;
  }): Promise<any> {
    return Auth.confirmSignIn(user, code, mfaType);
  },
  async handleConfirmSignUp({
    username,
    code,
  }: {
    username: string;
    code: string;
  }): Promise<any> {
    return await Auth.confirmSignUp(username, code);
  },
  async handleForgotPasswordSubmit({
    username,
    code,
    password,
  }: {
    username: string;
    code: string;
    password: string;
  }): Promise<any> {
    return Auth.forgotPasswordSubmit(username, code, password);
  },
  async handleForgotPassword(formData: string): Promise<any> {
    return Auth.forgotPassword(formData);
  },

  // Validation hooks for overriding
  async validateCustomSignUp(formData, touchData): Promise<ValidatorResult> {},
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
        (password.length >= 6 && confirm_password.length >= 6))
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
