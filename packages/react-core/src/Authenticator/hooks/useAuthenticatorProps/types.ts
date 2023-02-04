// import { AuthenticatorRoute } from '@aws-amplify/ui';

import {
  AuthenticatorMachineContext,
  AuthenticatorMachineContextKey,
  // AuthenticatorRouteComponentKey,
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

// export type NewCommonRouteMachineProps =
//   // | ExtractMachineKey<CommonRouteProps>
// FormEventHandlerMachineKey;

/**
 * `route` sub-component machine selector key types
 */
export type ConfirmResetPasswordMachineProps =
  | ExtractMachineKey<ConfirmResetPasswordRouteProps>
  | CommonRouteMachineProps;

export type ConfirmSignInMachineProps =
  | ExtractMachineKey<ConfirmSignInRouteProps>
  | CommonRouteMachineProps;
// ConfirmSignIn requires `user` to extract value needed for `challengeName`

// export type ConfirmSignInAdditionalProps = keyof Pick<ConfirmSignInRouteProps, 'challengeName'>
// string union
type ExtractAdditionalPropsKeys<T> = Exclude<
  keyof T,
  keyof UseAuthenticator | FormEventHandlerPropKey
>;

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
  | 'confirmSignIn'
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

export type NewAuthenticatorComponentRoute =
  // | 'confirmResetPassword'
  | 'confirmSignIn'
  // | 'confirmSignUp'
  // | 'confirmVerifyUser'
  // | 'forceNewPassword'
  // | 'resetPassword'
  // | 'setupTOTP'
  | 'signIn';
// | 'signUp'
// | 'verifyUser';

export type UseAuthenticatorPropsParams<R extends NewAuthenticatorRoute> = {
  route: R;
};

type RouteProp = { route: NewAuthenticatorRoute };
export type UseAuthenticatorRouteProps = Record<NewAuthenticatorRoute, any> & {
  confirmSignIn: ConfirmSignInRouteProps;
  // confirmSignUp:
  // confirmResetPassword:
  confirmVerifyUser: ConfirmVerifyUserRouteProps;
  // forceNewPassword:
  // resetPassword:
  // setupTOTP:
  signIn: SignInRouteProps;
  transition: RouteProp;
};

export type UseAuthenticatorRoutePropz<T extends NewAuthenticatorRoute> =
  // T extends 'confirmResetPassword'
  //   ? ConfirmResetPasswordMachineProps
  //   :
  T extends 'confirmSignIn'
    ? ConfirmSignInRouteProps
    : // : T extends 'confirmSignUp'
    // ? ConfirmSignUpMachineProps
    // : T extends 'confirmVerifyUser'
    // ? ConfirmVerifyUserMachineProps
    // : T extends 'forceNewPassword'
    // ? ForceNewPasswordMachineProps
    // : T extends 'resetPassword'
    // ? ResetPasswordMachineProps
    T extends 'signIn'
    ? SignInRouteProps
    : // : T extends 'signUp'
      // ? SignUpMachineProps
      // : T extends 'setupTOTP'
      // ? SetupTOTPMachineProps
      // : T extends 'verifyUser'
      // ? VerifyUserMachineProps
      { route: NewAuthenticatorRoute };

// type Huh = UseAuthenticatorRoutePropz<'confirmSignIn'>;

export type RouteMachinePropKeys = {
  [K in NewAuthenticatorComponentRoute]:
    | ExtractMachineKey<UseAuthenticatorRouteProps[K]>
    | CommonRouteMachineProps;
};

export type RouteSelectorProps<K extends NewAuthenticatorComponentRoute> = Pick<
  UseAuthenticator,
  RouteMachinePropKeys[K]
>;

// type Huh = RouteSelectorProps<'confirmSignIn'>

export type RouteSelectorPropz = {
  [K in NewAuthenticatorComponentRoute]: RouteSelectorProps<K>;
};

// type Huhz = RouteSelectorPropz['confirmSignIn']

export type RoutePropsTranslators = {
  [K in NewAuthenticatorComponentRoute]: (
    context: RouteSelectorProps<K>
  ) => UseAuthenticatorRoutePropz<K>;
};

type RouteAdditionalPropz = {
  confirmSignIn: Pick<
    UseAuthenticatorRoutePropz<'confirmSignIn'>,
    ExtractAdditionalPropsKeys<ConfirmSignInRouteProps>
  >;
  // confirmSignUp:
  // confirmResetPassword:
  // confirmVerifyUser: ExtractAdditionalPropsKeys<ConfirmVerifyUserMachineProps>;
  // forceNewPassword:
  // resetPassword:
  // setupTOTP:
  signIn: Pick<
    UseAuthenticatorRoutePropz<'signIn'>,
    ExtractAdditionalPropsKeys<SignInRouteProps>
  >;
  // signUp:
  // verifyUser:
};

export type RouteAdditionalProps = {
  [K in NewAuthenticatorComponentRoute]: (
    context: RouteSelectorProps<K>
  ) => RouteAdditionalPropz[K];
};

// export type AdditionalRouteProps = {
//   [K in NewAuthenticatorComponentRoute]: K extends 'signIn'
//     ? Pick<SignInRouteProps, SignInAdditionalProps>
//     : K extends 'confirmSignIn'
//     ? Pick<ConfirmSignInRouteProps, ConfirmSignInAdditionalProps>
//     : void;
// };

export type TranslatedWithHandlers = Record<
  FormEventHandlerPropKey,
  AuthenticatorMachineContext[FormEventHandlerMachineKey]
> &
  Omit<AuthenticatorMachineContext, FormEventHandlerMachineKey>;

// export type UseAuthenticatorRouteProps<R extends AuthenticatorRoute> =
//   R extends AuthenticatorRouteComponentKey ? Resolvers[R] : undefined;

// export const testy: Testy['authenticated'] = undefined;
// export const alsoTesty: UseAuthenticatorProps<'signIn'> = {};
