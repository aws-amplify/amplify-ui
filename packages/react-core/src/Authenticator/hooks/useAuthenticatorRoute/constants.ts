import {
  AuthenticatorMachineContextKey,
  AuthenticatorRouteComponentKey,
} from '../types';
import {
  ConfirmResetPasswordKey,
  ConfirmSignInMachineKey,
  ConfirmSignUpKey,
  ConfirmVerifyUserKey,
  ForceNewPasswordKey,
  ResetPasswordKey,
  SignInKey,
  SignUpKey,
  SetupTOTPMachineKey,
  VerifyUserKey,
} from './types';

export const DEFAULT_TOTP_ISSUER = 'AWSCognito';

const CONFIRM_RESET_PASSWORD_KEYS: ConfirmResetPasswordKey[] = [
  'error',
  'isPending',
  'resendCode',
  'validationErrors',
];
const CONFIRM_SIGN_IN_MACHINE_PROP_KEYS: ConfirmSignInMachineKey[] = [
  'error',
  'isPending',
  'toSignIn',
  'user',
];
const CONFIRM_SIGN_UP_KEYS: ConfirmSignUpKey[] = [
  'codeDeliveryDetails',
  'error',
  'isPending',
  'resendCode',
];
const CONFIRM_VERIFY_USER_KEYS: ConfirmVerifyUserKey[] = [
  'error',
  'isPending',
  'skipVerification',
];
const FORCE_NEW_PASSWORD_KEYS: ForceNewPasswordKey[] = [
  'error',
  'isPending',
  'toSignIn',
  'validationErrors',
];
const RESET_PASSWORD_KEYS: ResetPasswordKey[] = [
  'error',
  'isPending',
  'toSignIn',
];
const SIGN_IN_KEYS: SignInKey[] = ['error', 'isPending', 'toSignUp'];
const SIGN_UP_KEYS: SignUpKey[] = [
  'error',
  'isPending',
  'toSignIn',
  'validationErrors',
];
const SETUP_TOTP_MACHINE_KEY: SetupTOTPMachineKey[] = [
  'error',
  'isPending',
  'user',
];
const VERIFY_USER_KEYS: VerifyUserKey[] = ['error', 'isPending'];

export const MACHINE_PROP_KEYS: Record<
  AuthenticatorRouteComponentKey,
  AuthenticatorMachineContextKey[]
> = {
  confirmSignIn: CONFIRM_SIGN_IN_MACHINE_PROP_KEYS,
  confirmResetPassword: CONFIRM_RESET_PASSWORD_KEYS,
  confirmSignUp: CONFIRM_SIGN_UP_KEYS,
  confirmVerifyUser: CONFIRM_VERIFY_USER_KEYS,
  forceNewPassword: FORCE_NEW_PASSWORD_KEYS,
  signIn: SIGN_IN_KEYS,
  signUp: SIGN_UP_KEYS,
  resetPassword: RESET_PASSWORD_KEYS,
  setupTOTP: SETUP_TOTP_MACHINE_KEY,
  verifyUser: VERIFY_USER_KEYS,
};
