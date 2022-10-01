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
  PlatformProps = {},
  ComponentName extends AuthenticatorRouteComponentName | unknown = unknown
> = ComponentName extends AuthenticatorRouteComponentName
  ? {
      Component: Defaults<PlatformProps>[ComponentName];
      props: Props[ComponentName];
    }
  : {
      Component: DefaultComponent<PlatformProps>;
      props: Props[keyof Props];
    };

// machine prop keys required for each sub-component route
type CommonSelectorKey = 'error' | 'isPending';
type ConfirmSignInSelectorKey = CommonSelectorKey | 'toSignIn' | 'user';
type SetupTOTSelectorKey = CommonSelectorKey | 'user';

export type RouteSelector<
  Key extends AuthenticatorMachineContextKey = AuthenticatorMachineContextKey
> = (
  context: AuthenticatorMachineContext
) => AuthenticatorMachineContext[Key][];

export type ConfirmSignInSelector = RouteSelector<ConfirmSignInSelectorKey>;
export type SetupTOTPSelector = RouteSelector<SetupTOTSelectorKey>;
