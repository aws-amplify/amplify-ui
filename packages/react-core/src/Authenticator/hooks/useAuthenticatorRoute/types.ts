import {
  AuthenticatorMachineContextKey,
  AuthenticatorRouteComponentName,
  CommonConfirmResetPasswordProps,
  CommonConfirmSignInProps,
  CommonConfirmSignUpProps,
  CommonConfirmVerifyUserProps,
  CommonForceNewPasswordProps,
  CommonResetPasswordProps,
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

/**
 * `route` sub-component machine selector key types
 */
export type ConfirmResetPasswordKey =
  ExtractMachineKey<CommonConfirmResetPasswordProps>;

export type ConfirmSignInMachineKey =
  // ConfirmSignIn additonally requires `user` to extract value needed for `challengeName`
  ExtractMachineKey<CommonConfirmSignInProps> | 'user';

export type ConfirmSignUpKey = ExtractMachineKey<CommonConfirmSignUpProps>;

export type ConfirmVerifyUserKey =
  ExtractMachineKey<CommonConfirmVerifyUserProps>;

export type ForceNewPasswordKey =
  ExtractMachineKey<CommonForceNewPasswordProps>;

export type ResetPasswordKey = ExtractMachineKey<CommonResetPasswordProps>;

export type SignInKey = ExtractMachineKey<CommonSignInProps>;

export type SignUpKey = ExtractMachineKey<CommonSignUpProps>;

export type SetupTOTPMachineKey =
  // SetupTOTP additonally requires `user` to extract values needed for `totpIssuer` and 'totpUsername`
  ExtractMachineKey<CommonSetupTOTPProps> | 'user';

export type VerifyUserKey = ExtractMachineKey<CommonVerifyUserProps>;
