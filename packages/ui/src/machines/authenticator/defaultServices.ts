import { Amplify, Auth } from 'aws-amplify';

import { passwordMatches, runValidators } from '../../validators';

export const defaultServices = {
  async getAmplifyConfig() {
    return Amplify.configure();
  },

  async getCurrentUser() {
    return Auth.currentAuthenticatedUser();
  },

  async validateSignUp(formData) {
    const validators = [passwordMatches]; // this can contain custom validators too

    return runValidators(formData, validators);
  },
};
