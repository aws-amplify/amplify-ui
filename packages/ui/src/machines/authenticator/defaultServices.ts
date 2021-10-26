import { Auth } from '@aws-amplify/auth';
import { Amplify } from '@aws-amplify/core';
import { ValidatorResult } from '../../types';

export const defaultServices = {
  async getAmplifyConfig() {
    return Amplify.configure();
  },

  async getCurrentUser() {
    return Auth.currentAuthenticatedUser();
  },

  // Validation hooks for overriding
  async validateCustomSignUp(formData): Promise<ValidatorResult> {},
  async validateConfirmPassword<Validator>(formData): Promise<ValidatorResult> {
    const { password, confirm_password } = formData;

    if (!password && !confirm_password) {
      // these inputs are clean, don't complain yet
      return null;
    } else if (password && confirm_password && password !== confirm_password) {
      // only return an error if both fields have text entered and the passwords do not match
      return {
        confirm_password: 'Your passwords must match',
      };
    }
  },
  async validatePreferredUsername(formData): Promise<ValidatorResult> {},
};
