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
  DefaultComponent,
  Defaults,
} from '../types';

export type UseAuthenticatorRouteParams<PlatformProps = {}> = {
  components: Defaults<PlatformProps>;
};

/**
 * Mapping of route component names to corresponding common prop type
 */
interface Props {
  ConfirmResetPassword: CommonConfirmResetPasswordProps;
  ConfirmSignIn: CommonConfirmSignInProps;
  ConfirmSignUp: CommonConfirmSignUpProps;
  ConfirmVerifyUser: CommonConfirmVerifyUserProps;
  ForceNewPassword: CommonForceNewPasswordProps;
  ResetPassword: CommonResetPasswordProps;
  SetupTOTP: CommonSetupTOTPProps;
  SignIn: CommonSignInProps;
  SignUp: CommonSignUpProps;
  VerifyUser: CommonVerifyUserProps;
}

export type UseAuthenticatorRoute<
  PlatformProps,
  ComponentName extends AuthenticatorRouteComponentName
> = ComponentName extends AuthenticatorRouteComponentName
  ? {
      Component: Defaults<PlatformProps>[ComponentName];
      props: Props[ComponentName];
    }
  : {
      Component: DefaultComponent<PlatformProps>;
      props: Props[keyof Props];
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
