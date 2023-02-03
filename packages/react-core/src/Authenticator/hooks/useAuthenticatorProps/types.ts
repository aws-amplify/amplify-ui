// import { AuthenticatorRoute } from '@aws-amplify/ui';

import {
  AuthenticatorMachineContext,
  AuthenticatorMachineContextKey,
  AuthenticatorRouteComponentKey,
  AuthenticatorRouteComponentName,
  CommonRouteProps,
  ConfirmResetPasswordRouteProps,
  ConfirmSignInRouteProps,
  ConfirmSignUpRouteProps,
  Defaults,
  ConfirmVerifyUserRouteProps,
  DefaultProps,
  ForceResetPasswordRouteProps,
  ResetPasswordRouteProps,
  SetupTOTPRouteProps,
  SignInRouteProps,
  SignUpRouteProps,
  VerifyUserRouteProps,
} from '../newTypes';
import { UseAuthenticator } from '../useAuthenticator/types';

export type UseAuthenticatorRouteParams<FieldType> = {
  components: Defaults<FieldType>;
};
export type UseAuthenticatorRoute<
  ComponentName extends AuthenticatorRouteComponentName,
  FieldType = {}
> = {
  Component: Defaults<FieldType>[ComponentName];
  props: DefaultProps[ComponentName];
};

export type UseAuthenticatorRouteDefault<FieldType> = {
  Component: Defaults<FieldType>[AuthenticatorRouteComponentName];
  props: DefaultProps[AuthenticatorRouteComponentName];
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

// common route keys shared by all routes
export type CommonRouteMachineProps =
  | ExtractMachineKey<CommonRouteProps>
  | FormEventHandlerMachineKey;

export type NewCommonRouteMachineProps =
  // | ExtractMachineKey<CommonRouteProps>
  FormEventHandlerMachineKey;

/**
 * `route` sub-component machine selector key types
 */
export type ConfirmResetPasswordMachineProps =
  | ExtractMachineKey<ConfirmResetPasswordRouteProps>
  | CommonRouteMachineProps;

export type ConfirmSignInMachineProps =
  | ExtractMachineKey<ConfirmSignInRouteProps>
  | CommonRouteMachineProps
  // ConfirmSignIn requires `user` to extract value needed for `challengeName`
  | 'user';

export type ConfirmSignUpMachineProps =
  | ExtractMachineKey<ConfirmSignUpRouteProps>
  | CommonRouteMachineProps;

export type ConfirmVerifyUserMachineProps =
  | ExtractMachineKey<ConfirmVerifyUserRouteProps>
  | CommonRouteMachineProps;

export type ForceNewPasswordMachineProps =
  | ExtractMachineKey<ForceResetPasswordRouteProps>
  | CommonRouteMachineProps;

export type ResetPasswordMachineProps =
  | ExtractMachineKey<ResetPasswordRouteProps>
  | CommonRouteMachineProps;

export type SetupTOTPMachineProps =
  | ExtractMachineKey<SetupTOTPRouteProps>
  | CommonRouteMachineProps;

export type SignInMachineProps =
  | ExtractMachineKey<SignInRouteProps>
  | CommonRouteMachineProps;

export type NewSignInMachineProps = ExtractMachineKey<SignInRouteProps>;

export type OtherSignInProps = Omit<SignInRouteProps, SignInMachineProps>;

export type SignUpMachineProps =
  | ExtractMachineKey<SignUpRouteProps>
  | CommonRouteMachineProps;

export type VerifyUserMachineProps =
  | ExtractMachineKey<VerifyUserRouteProps>
  | CommonRouteMachineProps;

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

export type NewAuthenticatorRoute =
  // | 'authenticated'
  // | 'confirmResetPassword'
  // | 'confirmSignIn'
  // | 'confirmSignUp'
  // | 'confirmVerifyUser'
  // | 'forceNewPassword'
  // | 'idle'
  // | 'resetPassword'
  // | 'setup'
  // | 'signOut'
  // | 'setupTOTP'
  | 'signIn'
  // | 'signUp'
  | 'transition';
// | 'verifyUser';

export type TransitionalRoute = Exclude<
  NewAuthenticatorRoute,
  AuthenticatorRouteComponentKey
>;
// export type TransitionalRoute = 'transition';
export type Resolvers = {
  // confirmSignIn: (
  //   props: UseAuthenticator
  // ) => Required<ConfirmSignInRouteProps>;
  // confirmSignUp: (
  //   props: UseAuthenticator
  // ) => Required<ConfirmSignUpRouteProps>;
  // confirmResetPassword: (
  //   props: UseAuthenticator
  // ) => Required<ConfirmResetPasswordRouteProps>;
  // confirmVerifyUser: (
  //   props: UseAuthenticator
  // ) => Required<ConfirmVerifyUserRouteProps>;
  // forceNewPassword: (
  //   props: UseAuthenticator
  // ) => Required<ForceResetPasswordRouteProps>;
  // resetPassword: (
  //   props: UseAuthenticator
  // ) => Required<ResetPasswordRouteProps>;
  // setupTOTP: (props: UseAuthenticator) => Required<SetupTOTPRouteProps>;
  // keep (props: UseAuthenticator) => hideSignUp in SignInRouteProps, it makes sense really, trust me. same with other UI props
  // for (props: UseAuthenticator) => example, in `useSignInProps` you would need to manually declare the default `hideSignUp`
  signIn: (props: UseAuthenticator) => Required<SignInRouteProps>;
  // signUp: (props: UseAuthenticator) => Required<SignUpRouteProps>;
  // verifyUser: (props: UseAuthenticator) => Required<VerifyUserRouteProps>;
} & Record<TransitionalRoute, (props: UseAuthenticator) => void>;

// export const hehe: Resolvers['authenticated'] = () => undefined;

export type ExtractReturnProps<F extends (props: UseAuthenticator) => any> =
  F extends (props: UseAuthenticator) => infer R ? R : never;

export type UseAuthenticatorRouteProps = {
  [Key in NewAuthenticatorRoute]: ExtractReturnProps<Resolvers[Key]>;
};

export type UseAuthenticatorPropsParams<R extends NewAuthenticatorRoute> = {
  route: R;
};

// export type UseAuthenticatorRouteProps<R extends AuthenticatorRoute> =
//   R extends AuthenticatorRouteComponentKey ? Resolvers[R] : undefined;

// export const testy: Testy['authenticated'] = undefined;
// export const alsoTesty: UseAuthenticatorProps<'signIn'> = {};
