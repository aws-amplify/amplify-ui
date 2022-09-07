const FIXED_USERNAME = 'test';
const FIXED_PASSWORD = 'password';
const FIXED_VERIFICATION_CODE = '123456';

const verifiedUsers = new Map();

// used to track the sign up password for the confirmSignUp() flow
let signUpPassword = '';

const checkFixedCredentials = (username, password) => {
  return username === FIXED_USERNAME && password === FIXED_PASSWORD;
};

const mockServices = {
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
    if (checkFixedCredentials(username, password)) {
      return {};
    } else if (
      verifiedUsers.has(username) &&
      verifiedUsers.get(username).password === password
    ) {
      return Promise.resolve(verifiedUsers.get(username));
    } else {
      return Promise.reject(new Error('User does not exist.'));
    }
  },
  async handleConfirmSignUp({
    username,
    code,
  }: {
    username: string;
    code: string;
  }) {
    if (code === FIXED_VERIFICATION_CODE) {
      const input = { username, password: signUpPassword };
      verifiedUsers.set(username, input);
      return Promise.resolve(verifiedUsers.get(username));
    } else {
      return Promise.reject(
        new Error('Invalid verification code provided, please try again.')
      );
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
    if (code === FIXED_VERIFICATION_CODE) {
      verifiedUsers.set(username, { username, password });
      return Promise.resolve();
    } else {
      return Promise.reject(
        new Error('Invalid verification code provided, please try again.')
      );
    }
  },
  async handleForgotPassword(formData): Promise<any> {
    if (verifiedUsers.has(formData) || formData === FIXED_USERNAME) {
      return Promise.resolve();
    } else {
      return Promise.reject(
        new Error('Username/client id combination not found.')
      );
    }
  },
};
export default mockServices;
