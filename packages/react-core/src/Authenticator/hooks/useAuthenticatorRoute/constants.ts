import {
  AuthenticatorMachineContextKey,
  AuthenticatorRouteComponentKey,
} from '../types';
import {
  CommonRouteMachineKey,
  ConfirmResetPasswordMachineKey,
  ConfirmSignInMachineKey,
  ConfirmSignUpMachineKey,
  ConfirmVerifyUserMachineKey,
  ForceNewPasswordMachineKey,
  FormEventHandlerMachineKey,
  FormEventHandlerPropKey,
  ResetPasswordMachineKey,
  SignInMachineKey,
  SignUpMachineKey,
  SetupTOTPMachineKey,
  VerifyUserMachineKey,
} from './types';

export const EVENT_HANDLER_KEY_MAP: Record<
  FormEventHandlerMachineKey,
  FormEventHandlerPropKey
> = {
  updateBlur: 'handleBlur',
  updateForm: 'handleChange',
  submitForm: 'handleSubmit',
};

const COMMON_ROUTE_MACHINE_KEYS: CommonRouteMachineKey[] = [
  'error',
  'isPending',
  'submitForm',
  'updateBlur',
  'updateForm',
];

const CONFIRM_RESET_PASSWORD_MACHINE_KEYS: ConfirmResetPasswordMachineKey[] = [
  ...COMMON_ROUTE_MACHINE_KEYS,
  'resendCode',
  'validationErrors',
];
const CONFIRM_SIGN_IN_MACHINE_KEYS: ConfirmSignInMachineKey[] = [
  ...COMMON_ROUTE_MACHINE_KEYS,
  'toSignIn',
  'user',
];
const CONFIRM_SIGN_UP_MACHINE_KEYS: ConfirmSignUpMachineKey[] = [
  ...COMMON_ROUTE_MACHINE_KEYS,
  'codeDeliveryDetails',
  'resendCode',
];
const CONFIRM_VERIFY_USER_MACHINE_KEYS: ConfirmVerifyUserMachineKey[] = [
  ...COMMON_ROUTE_MACHINE_KEYS,
  'skipVerification',
];
const FORCE_NEW_PASSWORD_MACHINE_KEYS: ForceNewPasswordMachineKey[] = [
  ...COMMON_ROUTE_MACHINE_KEYS,
  'toSignIn',
  'validationErrors',
];
const RESET_PASSWORD_MACHINE_KEYS: ResetPasswordMachineKey[] = [
  ...COMMON_ROUTE_MACHINE_KEYS,
  'toSignIn',
];
const SIGN_IN_MACHINE_KEYS: SignInMachineKey[] = [
  ...COMMON_ROUTE_MACHINE_KEYS,
  'toFederatedSignIn',
  'toResetPassword',
  'toSignUp',
];
const SIGN_UP_MACHINE_KEYS: SignUpMachineKey[] = [
  ...COMMON_ROUTE_MACHINE_KEYS,
  'toSignIn',
  'validationErrors',
];
const SETUP_TOTP_MACHINE_KEYS: SetupTOTPMachineKey[] = [
  ...COMMON_ROUTE_MACHINE_KEYS,
  'toSignIn',
];
const VERIFY_USER_MACHINE_KEYS: VerifyUserMachineKey[] = [
  ...COMMON_ROUTE_MACHINE_KEYS,
  'skipVerification',
];

export const MACHINE_PROP_KEYS: Record<
  AuthenticatorRouteComponentKey,
  AuthenticatorMachineContextKey[]
> = {
  confirmResetPassword: CONFIRM_RESET_PASSWORD_MACHINE_KEYS,
  confirmSignIn: CONFIRM_SIGN_IN_MACHINE_KEYS,
  confirmSignUp: CONFIRM_SIGN_UP_MACHINE_KEYS,
  confirmVerifyUser: CONFIRM_VERIFY_USER_MACHINE_KEYS,
  forceNewPassword: FORCE_NEW_PASSWORD_MACHINE_KEYS,
  signIn: SIGN_IN_MACHINE_KEYS,
  signUp: SIGN_UP_MACHINE_KEYS,
  resetPassword: RESET_PASSWORD_MACHINE_KEYS,
  setupTOTP: SETUP_TOTP_MACHINE_KEYS,
  verifyUser: VERIFY_USER_MACHINE_KEYS,
};
