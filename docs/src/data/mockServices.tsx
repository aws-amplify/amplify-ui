import { Amplify} from 'aws-amplify';

const awsExports = {
  aws_user_pools_id: 'xx-xxxx-x_xxxxx', // (optional) -  Amazon Cognito User Pool ID
  aws_user_pools_web_client_id: 'xxxxxxxxxxxxxx', // (optional) - Amazon Cognito App Client ID (App client secret needs to be disabled)
};
Amplify.configure(awsExports)

let signUpPassword = "";
const verifiedUsers = new Map();
const fixed_username = "amplify-ui";
const fixed_password = "connected-components";

export const mockServices = {
  async getAmplifyConfig() {
    return {};
  },
  async handleSignUp(formData) {
    if(verifiedUsers.has(formData.username)) {
      return Promise.reject(new Error("User already exists!"))
    } else {
      signUpPassword = formData.password;
      return {};
    }
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
  }): Promise<any> {
    if ((verifiedUsers.get(username).password === password) ||
        (username === fixed_username && password === fixed_password)) {
      return Promise.resolve(verifiedUsers.get(username));
    } else {
      return Promise.reject(new Error("Invalid username or password"));
    }
  },
  async handleConfirmSignUp({
    username,
    code
  }: {
    username: string;
    code: string;
  }) {
    if (code === '123456') {
      verifiedUsers.set(username, {username : username, password : signUpPassword});
      return Promise.resolve(verifiedUsers.get(username));
    } else {
      return Promise.reject(new Error("Invalid Verification Code"));
    }
  },
  async handleResendConfirmationCode({
    username
  }: {
    username: string
  }): Promise<any> {
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
  }): Promise<any> {
      if(code === "123456") {
        verifiedUsers.set(username,{username: username, password: password});
        return Promise.resolve();
      } else {
        return Promise.reject(new Error("Invalid Verification Code"));
      }
  },
  async handleForgotPassword(formData): Promise<any> {
    if((verifiedUsers.has(formData)) || formData === fixed_username) {
      return Promise.resolve();
    } else {
      return Promise.reject(new Error("User does not exist!"))
    }
  },
};

export default mockServices;
