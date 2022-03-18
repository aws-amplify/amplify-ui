import { AuthEventData } from '@aws-amplify/ui';

export const facade = {
  error: '',
  hasValidationErrors: false,
  isPending: false,
  route: '',
  user: '',
  validationErrors: {
    val: '',
  },
  codeDeliveryDetails: {
    val: '',
  },
  change: (data?: AuthEventData) => null,
  updateForm: (data?: AuthEventData) => null,
  updateBlur: (data?: AuthEventData) => null,
  resend: (data?: AuthEventData) => null,
  resendCode: (data?: AuthEventData) => null,
  signOut: (data?: AuthEventData) => null,
  federatedSignIn: (data?: AuthEventData) => null,
  toFederatedSignIn: (data?: AuthEventData) => null,
  resetPassword: (data?: AuthEventData) => null,
  toResetPassword: (data?: AuthEventData) => null,
  signIn: (data?: AuthEventData) => null,
  toSignIn: (data?: AuthEventData) => null,
  signUp: (data?: AuthEventData) => null,
  toSignUp: (data?: AuthEventData) => null,
  skip: (data?: AuthEventData) => null,
  skipVerification: (data?: AuthEventData) => null,
  submit: (data?: AuthEventData) => null,
  submitForm: (data?: AuthEventData) => null,
};
