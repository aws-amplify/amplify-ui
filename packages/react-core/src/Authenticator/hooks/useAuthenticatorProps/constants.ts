// import { AuthenticatorRoute } from '@aws-amplify/ui';

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
  // UseAuthenticatorRouteProps,
  // NewAuthenticatorRoute,
  NewAuthenticatorComponentRoute,
  // TransitionalRoute,
  RouteMachinePropKeys,
} from './types';

export type RouteMachineKeys = {
  [K in NewAuthenticatorComponentRoute]: RouteMachinePropKeys[K][];
};

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

// const EVENT_HANDLER_KEY: FormEventHandlerPropKey[] = [
//   'handleBlur',
//   'handleChange',
//   'handleSubmit',
// ];

const CONFIRM_RESET_PASSWORD_MACHINE_KEYS: ConfirmResetPasswordMachineProps[] =
  [...COMMON_ROUTE_MACHINE_KEYS, 'resendCode', 'validationErrors'];

const CONFIRM_SIGN_IN_MACHINE_KEYS: ConfirmSignInMachineProps[] = [
  ...COMMON_ROUTE_MACHINE_KEYS,
  'toSignIn',
  'user',
];

const TEST_CONFIRM_SIGN_IN_MACHINE_KEYS: RouteMachineKeys['confirmSignIn'] = [
  ...COMMON_ROUTE_MACHINE_KEYS,
  'toSignIn',
  'user',
];

// const CONFIRM_SIGN_IN_ADDITIONAL_KEYS: ConfirmSignInAdditionalProps[] = [
//   ...EVENT_HANDLER_KEY,
//   'challengeName',
// ];

// const NEW_CONFIRM_SIGN_IN_MACHINE_KEYS: readonly ConfirmSignInMachineProps[] = [
//   ...COMMON_ROUTE_MACHINE_KEYS,
//   'toSignIn',
//   'user',
// ] as const;

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

const SIGN_IN_MACHINE_KEYS: SignInMachineProps[] = [
  ...COMMON_ROUTE_MACHINE_KEYS,
  'toFederatedSignIn',
  'toResetPassword',
  'toSignUp',
];

// const SIGN_IN_ADDITIONAL_KEYS: SignInAdditionalProps[] = [
//   ...EVENT_HANDLER_KEY,
//   'hideSignUp',
// ];
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

// type ResolvedMachinePropsKeys = {
//   [K in NewAuthenticatorRoute]: (keyof UseAuthenticatorRouteProps[K])[];
// };

// type Idk = Record<
//   NewAuthenticatorComponentRoute,
//   AuthenticatorMachineContextKey[]
// >;

// export type MachinePropKeys<T extends NewAuthenticatorComponentRoute> =
//   T extends 'confirmResetPassword'
//     ? ConfirmResetPasswordMachineProps[]
//     : T extends 'confirmSignIn'
//     ? readonly ConfirmSignInMachineProps[]
//     : T extends 'confirmSignUp'
//     ? ConfirmSignUpMachineProps[]
//     : T extends 'confirmVerifyUser'
//     ? readonly ConfirmVerifyUserMachineProps[]
//     : T extends 'forceNewPassword'
//     ? ForceNewPasswordMachineProps[]
//     : T extends 'resetPassword'
//     ? ResetPasswordMachineProps[]
//     : T extends 'signIn'
//     ? readonly SignInMachineProps[]
//     : T extends 'signUp'
//     ? SignUpMachineProps[]
//     : T extends 'setupTOTP'
//     ? SetupTOTPMachineProps[]
//     : T extends 'verifyUser'
//     ? VerifyUserMachineProps[]
//     : void;

// export type MachinePropKeysObject = {
//   'confirmResetPassword':
//   'confirmSignIn':
//   'confirmSignUp':
//   'confirmVerifyUser':
//   'forceNewPassword':
//   'resetPassword':
//   'signIn':
//   'signUp':
//   'setupTOTP':
//   'verifyUser':
// }

// export const NEW_MACHINE_PROP_KEYS: {
//   [K in NewAuthenticatorComponentRoute]: MachinePropKeys<K>;
// } = {
//   // confirmResetPassword: CONFIRM_RESET_PASSWORD_MACHINE_KEYS,
//   confirmSignIn: NEW_CONFIRM_SIGN_IN_MACHINE_KEYS,
//   // confirmSignUp: CONFIRM_SIGN_UP_MACHINE_KEYS,
//   confirmVerifyUser: CONFIRM_VERIFY_USER_MACHINE_KEYS,
//   // forceNewPassword: FORCE_NEW_PASSWORD_MACHINE_KEYS,
//   signIn: SIGN_IN_MACHINE_KEYS,
//   // signUp: SIGN_UP_MACHINE_KEYS,
//   // resetPassword: RESET_PASSWORD_MACHINE_KEYS,
//   // setupTOTP: SETUP_TOTP_MACHINE_KEYS,
//   // verifyUser: VERIFY_USER_MACHINE_KEYS,
// };

export const NEW_MACHINE_PROP_KEYS: RouteMachineKeys = {
  // confirmResetPassword: CONFIRM_RESET_PASSWORD_MACHINE_KEYS,
  // confirmSignIn: CONFIRM_SIGN_IN_MACHINE_KEYS,
  confirmSignIn: [...COMMON_ROUTE_MACHINE_KEYS, 'toSignIn', 'user'],
  // confirmSignUp: CONFIRM_SIGN_UP_MACHINE_KEYS,
  // confirmVerifyUser: [...COMMON_ROUTE_MACHINE_KEYS, 'skipVerification'],
  // forceNewPassword: FORCE_NEW_PASSWORD_MACHINE_KEYS,
  signIn: [
    ...COMMON_ROUTE_MACHINE_KEYS,
    'toFederatedSignIn',
    'toResetPassword',
    'toSignUp',
  ],
  // signUp: SIGN_UP_MACHINE_KEYS,
  // resetPassword: RESET_PASSWORD_MACHINE_KEYS,
  // setupTOTP: SETUP_TOTP_MACHINE_KEYS,
  // verifyUser: VERIFY_USER_MACHINE_KEYS,
};

// type AdditionalRouteProps = {
//   [K in NewAuthenticatorComponentRoute]: K extends 'signIn'
//     ? SignInAdditionalProps[]
//     : K extends 'confirmSignIn'
//     ? ConfirmSignInAdditionalProps[]
//     : void;
// };

// export const ADDITIONAL_PROP_KEYS: AdditionalRouteProps = {
//   // confirmResetPassword: CONFIRM_RESET_PASSWORD_MACHINE_KEYS,
//   confirmSignIn: CONFIRM_SIGN_IN_ADDITIONAL_KEYS,
//   // confirmSignUp: CONFIRM_SIGN_UP_MACHINE_KEYS,
//   confirmVerifyUser: undefined,
//   // forceNewPassword: FORCE_NEW_PASSWORD_MACHINE_KEYS,
//   signIn: SIGN_IN_ADDITIONAL_KEYS,
//   // signUp: SIGN_UP_MACHINE_KEYS,
//   // resetPassword: RESET_PASSWORD_MACHINE_KEYS,
//   // setupTOTP: SETUP_TOTP_MACHINE_KEYS,
//   // verifyUser: VERIFY_USER_MACHINE_KEYS,
// };
