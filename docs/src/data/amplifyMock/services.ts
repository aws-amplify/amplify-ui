const FIXED_USERNAME = 'test';
const FIXED_EMAIL = 'test@test.com';
const FIXED_PHONE = '0123456789';
const FIXED_PASSWORD = 'password';
const FIXED_VERIFICATION_CODE = '123456';

const verifiedUsers = new Map();

// used to track the sign up password for the confirmSignUp() flow
let signUpPassword = '';

const checkFixedCredentials = (username, password) => {
  let user = '';
  if (username.length === 14) {
    if (username.substring(4) === FIXED_PHONE) {
      user = username.substring(4);
    }
  } else if (username.length === 13) {
    if (username.substring(3) === FIXED_PHONE) {
      user = username.substring(3);
    }
  } else if (username.length === 12) {
    if (username.substring(2) === FIXED_PHONE) {
      user = username.substring(2);
    }
  } else if (username.length === 10) {
    user = username;
  }
  return (
    (username === FIXED_USERNAME ||
      username === FIXED_EMAIL ||
      user === FIXED_PHONE) &&
    password === FIXED_PASSWORD
  );
};

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
