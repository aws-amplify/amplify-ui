import { Amplify, Auth } from 'aws-amplify';

import { runValidators } from '../../validators';

export const defaultServices = {
  async getAmplifyConfig() {
    return Amplify.configure();
  },

  async getCurrentUser() {
    return Auth.currentAuthenticatedUser();
  },

  // Validation hooks for overriding
  async validateCustomSignUp(formData) {},
  async validateConfirmPassword(formData) {
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
  async validatePreferredUsername(formData) {},
};
