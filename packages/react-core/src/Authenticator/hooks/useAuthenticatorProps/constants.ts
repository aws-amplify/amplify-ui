import { AuthenticatorRoute } from '@aws-amplify/ui';

import {
  AuthenticatorMachineContextKey,
  AuthenticatorRouteComponentKey,
} from '../types';
import {
  CommonRouteMachineProps,
  ConfirmResetPasswordMachineProps,
  ConfirmSignInMachineProps,
  ConfirmSignUpMachineProps,
  ConfirmVerifyUserMachineProps,
  ForceNewPasswordMachineProps,
  FormEventHandlerMachineKey,
  FormEventHandlerPropKey,
  ResetPasswordMachineProps,
  // NewSignInMachineProps,
  SignInMachineProps,
  SignUpMachineProps,
  SetupTOTPMachineProps,
  VerifyUserMachineProps,
  UseAuthenticatorRouteProps,
  NewAuthenticatorRoute,
} from './types';

export const EVENT_HANDLER_KEY_MAP: Record<
  FormEventHandlerMachineKey,
  FormEventHandlerPropKey
> = {
  updateBlur: 'handleBlur',
  updateForm: 'handleChange',
  submitForm: 'handleSubmit',
};

const COMMON_ROUTE_MACHINE_KEYS: CommonRouteMachineProps[] = [
  'error',
  'isPending',
  'submitForm',
  'updateBlur',
  'updateForm',
];

const NEW_COMMON_ROUTE_MACHINE_KEYS: CommonRouteMachineProps[] = [
  'error',
  'isPending',
  'submitForm',
  'updateBlur',
  'updateForm',
];

const CONFIRM_RESET_PASSWORD_MACHINE_KEYS: ConfirmResetPasswordMachineProps[] =
  [...COMMON_ROUTE_MACHINE_KEYS, 'resendCode', 'validationErrors'];

const CONFIRM_SIGN_IN_MACHINE_KEYS: ConfirmSignInMachineProps[] = [
  ...COMMON_ROUTE_MACHINE_KEYS,
  'toSignIn',
  'user',
];
const CONFIRM_SIGN_UP_MACHINE_KEYS: ConfirmSignUpMachineProps[] = [
  ...COMMON_ROUTE_MACHINE_KEYS,
  'codeDeliveryDetails',
  'resendCode',
];
const CONFIRM_VERIFY_USER_MACHINE_KEYS: ConfirmVerifyUserMachineProps[] = [
  ...COMMON_ROUTE_MACHINE_KEYS,
  'skipVerification',
];
const FORCE_NEW_PASSWORD_MACHINE_KEYS: ForceNewPasswordMachineProps[] = [
  ...COMMON_ROUTE_MACHINE_KEYS,
  'toSignIn',
  'validationErrors',
];
const RESET_PASSWORD_MACHINE_KEYS: ResetPasswordMachineProps[] = [
  ...COMMON_ROUTE_MACHINE_KEYS,
  'toSignIn',
];

const NEW_SIGN_IN_MACHINE_KEYS: SignInMachineProps[] = [
  ...NEW_COMMON_ROUTE_MACHINE_KEYS,
  'toFederatedSignIn',
  'toResetPassword',
  'toSignUp',
];

const SIGN_IN_MACHINE_KEYS: SignInMachineProps[] = [
  ...COMMON_ROUTE_MACHINE_KEYS,
  'toFederatedSignIn',
  'toResetPassword',
  'toSignUp',
];
const SIGN_UP_MACHINE_KEYS: SignUpMachineProps[] = [
  ...COMMON_ROUTE_MACHINE_KEYS,
  'toSignIn',
  'validationErrors',
];
const SETUP_TOTP_MACHINE_KEYS: SetupTOTPMachineProps[] = [
  ...COMMON_ROUTE_MACHINE_KEYS,
  'toSignIn',
  'totpSecretCode',
];
const VERIFY_USER_MACHINE_KEYS: VerifyUserMachineProps[] = [
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

// type ResolvedPropsKeys = {
//   [K in NewAuthenticatorRoute]: keyof UseAuthenticatorRouteProps[K];
// };

export const NEW_MACHINE_PROP_KEYS: Record<
  AuthenticatorRoute,
  AuthenticatorMachineContextKey[]
> = {
  confirmResetPassword: CONFIRM_RESET_PASSWORD_MACHINE_KEYS,
  confirmSignIn: CONFIRM_SIGN_IN_MACHINE_KEYS,
  confirmSignUp: CONFIRM_SIGN_UP_MACHINE_KEYS,
  confirmVerifyUser: CONFIRM_VERIFY_USER_MACHINE_KEYS,
  forceNewPassword: FORCE_NEW_PASSWORD_MACHINE_KEYS,
  signIn: NEW_SIGN_IN_MACHINE_KEYS,
  signUp: SIGN_UP_MACHINE_KEYS,
  resetPassword: RESET_PASSWORD_MACHINE_KEYS,
  setupTOTP: SETUP_TOTP_MACHINE_KEYS,
  verifyUser: VERIFY_USER_MACHINE_KEYS,
  idle: [],
  authenticated: [],
  signOut: [],
  setup: [],
  transition: [],
};
