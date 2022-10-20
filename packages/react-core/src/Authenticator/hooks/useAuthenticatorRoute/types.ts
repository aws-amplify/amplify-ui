import {
  AuthenticatorMachineContext,
  AuthenticatorMachineContextKey,
  AuthenticatorRouteComponentName,
  CommonConfirmResetPasswordProps,
  CommonConfirmSignInProps,
  CommonConfirmSignUpProps,
  CommonConfirmVerifyUserProps,
  CommonForceNewPasswordProps,
  CommonResetPasswordProps,
  CommonRouteProps,
  CommonSetupTOTPProps,
  CommonSignInProps,
  CommonSignUpProps,
  CommonVerifyUserProps,
  Defaults,
} from '../types';

export type UseAuthenticatorRouteParams<PlatformProps = {}> = {
  components: Defaults<PlatformProps>;
};

/**
 * Mapping of route component names to corresponding common prop type
 */
interface Props<PlatformProps = {}> {
  ConfirmResetPassword: CommonConfirmResetPasswordProps<PlatformProps>;
  ConfirmSignIn: CommonConfirmSignInProps<PlatformProps>;
  ConfirmSignUp: CommonConfirmSignUpProps<PlatformProps>;
  ConfirmVerifyUser: CommonConfirmVerifyUserProps<PlatformProps>;
  ForceNewPassword: CommonForceNewPasswordProps<PlatformProps>;
  ResetPassword: CommonResetPasswordProps<PlatformProps>;
  SetupTOTP: CommonSetupTOTPProps<PlatformProps>;
  SignIn: CommonSignInProps<PlatformProps>;
  SignUp: CommonSignUpProps<PlatformProps>;
  VerifyUser: CommonVerifyUserProps<PlatformProps>;
}

export type UseAuthenticatorRoute<
  PlatformProps,
  ComponentName extends AuthenticatorRouteComponentName
> = {
  Component: Defaults<PlatformProps>[ComponentName];
  props: Props<PlatformProps>[ComponentName];
};

// extract machine prop keys required for a sub-component route
type ExtractMachineKey<RouteProps> = Extract<
  AuthenticatorMachineContextKey,
  keyof RouteProps
>;

// map to `handleBlur`, `handleChange`, and `handleSubmit` props
export type FormEventHandlerMachineKey =
  | 'updateBlur'
  | 'updateForm'
  | 'submitForm';

export type FormEventHandlerPropKey =
  | `handleBlur`
  | `handleChange`
  | `handleSubmit`;

// common route keys shared by all route
export type CommonRouteMachineKey =
  | ExtractMachineKey<CommonRouteProps>
  | FormEventHandlerMachineKey;

/**
 * `route` sub-component machine selector key types
 */
export type ConfirmResetPasswordMachineKey =
  | ExtractMachineKey<CommonConfirmResetPasswordProps>
  | FormEventHandlerMachineKey;

export type ConfirmSignInMachineKey =
  // ConfirmSignIn additonally requires `user` to extract value needed for `challengeName`
  | ExtractMachineKey<CommonConfirmSignInProps>
  | FormEventHandlerMachineKey
  | 'user';

export type ConfirmSignUpMachineKey =
  | ExtractMachineKey<CommonConfirmSignUpProps>
  | FormEventHandlerMachineKey;

export type ConfirmVerifyUserMachineKey =
  | ExtractMachineKey<CommonConfirmVerifyUserProps>
  | FormEventHandlerMachineKey;

export type ForceNewPasswordMachineKey =
  | ExtractMachineKey<CommonForceNewPasswordProps>
  | FormEventHandlerMachineKey;

export type ResetPasswordMachineKey =
  | ExtractMachineKey<CommonResetPasswordProps>
  | FormEventHandlerMachineKey;

export type SignInMachineKey =
  | ExtractMachineKey<CommonSignInProps>
  | FormEventHandlerMachineKey;

export type SignUpMachineKey =
  | ExtractMachineKey<CommonSignUpProps>
  | FormEventHandlerMachineKey;

export type SetupTOTPMachineKey =
  // SetupTOTP additonally requires `user` to extract values needed for `totpIssuer` and 'totpUsername`
  ExtractMachineKey<CommonSetupTOTPProps> | FormEventHandlerMachineKey | 'user';

export type VerifyUserMachineKey =
  | ExtractMachineKey<CommonVerifyUserProps>
  | FormEventHandlerMachineKey;

/**
 * machine values with machine form event handlers keys mapped to UI form event handlers
 */
export type ConvertedMachineProps = Omit<
  AuthenticatorMachineContext,
  FormEventHandlerMachineKey
> & {
  handleBlur: AuthenticatorMachineContext['updateBlur'];
  handleChange: AuthenticatorMachineContext['updateForm'];
  handleSubmit: AuthenticatorMachineContext['submitForm'];
};
