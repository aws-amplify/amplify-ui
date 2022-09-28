import { Auth } from 'aws-amplify';
export function signUp(username, password, attributes) {
  return Auth.signUp({
    username,
    password,
    attributes,
    autoSignIn: {
      enabled: true,
    },
  });
}

export function signIn(username, password) {
  return Auth.signIn(username, password);
}

export function confirmSignIn(user, code, mfaType) {
  return Auth.confirmSignIn(
    user,
    code,
    // cast due to restrictive typing of Auth.confirmSignIn
    mfaType as 'SMS_MFA' | 'SOFTWARE_TOKEN_MFA'
  );
}

export function forgotPassword(formData) {
  return Auth.forgotPassword(formData);
}

export function confirmSignUp(username, code) {
  return Auth.confirmSignUp(username, code);
}

export function forgotPasswordSubmit(username, code, password) {
  return Auth.forgotPasswordSubmit(username, code, password);
}
