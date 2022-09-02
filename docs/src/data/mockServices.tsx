let signUpPassword = '';
const verifiedUsers = new Map();
const FIXED_USERNAME = 'test';
const FIXED_PASSWORD = 'password';

export const mockServices = {
  async getAmplifyConfig() {
    return {};
  },
  async handleSignUp(formData) {
    signUpPassword = formData.password;
    return {};
  },
  async checkVerifiedContact() {
    return { verified: {}, unverified: {} };
  },
  async handleSignIn({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) {
    if (
      verifiedUsers.get(username).password === password ||
      (username === FIXED_USERNAME && password === FIXED_PASSWORD)
    ) {
      return Promise.resolve(verifiedUsers.get(username));
    } else {
      return Promise.reject(new Error('Invalid username or password'));
    }
  },
  async handleConfirmSignUp({
    username,
    code,
  }: {
    username: string;
    code: string;
  }) {
    if (code === '123456') {
      verifiedUsers.set(username, {
        username: username,
        password: signUpPassword,
      });
      return Promise.resolve(verifiedUsers.get(username));
    } else {
      return Promise.reject(new Error('Invalid Verification Code'));
    }
  },
  async handleResendConfirmationCode({ username }: { username: string }) {
    return {};
  },
  async handleForgotPasswordSubmit({
    username,
    code,
    password,
  }: {
    username: string;
    code: string;
    password: string;
  }) {
    if (code === '123456') {
      verifiedUsers.set(username, { username, password });
      return Promise.resolve();
    } else {
      return Promise.reject(new Error('Invalid Verification Code'));
    }
  },
  async handleForgotPassword(formData): Promise<any> {
    if (verifiedUsers.has(formData) || formData === FIXED_USERNAME) {
      return Promise.resolve();
    } else {
      return Promise.reject(new Error('User does not exist!'));
    }
  },
};

export default mockServices;
