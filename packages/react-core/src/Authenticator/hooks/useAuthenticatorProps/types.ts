import { AuthenticatorRoute } from '@aws-amplify/ui';

import {
  AuthenticatorMachineContext,
  AuthenticatorMachineContextKey,
  AuthenticatorRouteComponentKey,
  CommonRouteProps,
  ConfirmResetPasswordRouteProps,
  ConfirmSignInRouteProps,
  ConfirmSignUpRouteProps,
  ConfirmVerifyUserRouteProps,
  ForceNewPasswordRouteProps,
  ResetPasswordRouteProps,
  SetupTOTPRouteProps,
  SignInRouteProps,
  SignUpRouteProps,
  VerifyUserRouteProps,
} from '../newTypes';
import { UseAuthenticator } from '../useAuthenticator/types';

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

type RouteProp = { route: AuthenticatorRoute };

interface RouteComponentProps {
  confirmResetPassword: ConfirmResetPasswordRouteProps;
  confirmSignIn: ConfirmSignInRouteProps;
  confirmSignUp: ConfirmSignUpRouteProps;
  confirmVerifyUser: ConfirmVerifyUserRouteProps;
  forceNewPassword: ForceNewPasswordRouteProps;
  resetPassword: ResetPasswordRouteProps;
  setupTOTP: SetupTOTPRouteProps;
  signIn: SignInRouteProps;
  signUp: SignUpRouteProps;
  verifyUser: VerifyUserRouteProps;
}

export type UseAuthenticatorRoutePropz<T extends AuthenticatorRoute> =
  T extends AuthenticatorRouteComponentKey ? RouteComponentProps[T] : RouteProp;

export type UseAuthenticatorRouteProps<T extends AuthenticatorRoute> =
  T extends 'confirmResetPassword'
    ? Required<ConfirmResetPasswordRouteProps>
    : T extends 'confirmSignIn'
    ? Required<ConfirmSignInRouteProps>
    : T extends 'confirmSignUp'
    ? Required<ConfirmSignUpRouteProps>
    : T extends 'confirmVerifyUser'
    ? Required<ConfirmVerifyUserRouteProps>
    : T extends 'forceNewPassword'
    ? Required<ForceNewPasswordRouteProps>
    : T extends 'resetPassword'
    ? Required<ResetPasswordRouteProps>
    : T extends 'setupTOTP'
    ? Required<SetupTOTPRouteProps>
    : T extends 'signIn'
    ? Required<SignInRouteProps>
    : T extends 'signUp'
    ? Required<SignUpRouteProps>
    : T extends 'verifyUser'
    ? Required<VerifyUserRouteProps>
    : RouteProp;

type RouteMachinePropKeys = {
  [K in AuthenticatorRouteComponentKey]:
    | ExtractMachineKey<UseAuthenticatorRouteProps<K>>
    | CommonRouteMachineProps;
};

type PickRouteSelectorProps<K extends AuthenticatorRouteComponentKey> = Pick<
  UseAuthenticator,
  RouteMachinePropKeys[K]
>;

export type RouteSelectorProps = {
  [K in AuthenticatorRouteComponentKey]: PickRouteSelectorProps<K>;
};

export type RoutePropsResolvers = {
  [K in AuthenticatorRouteComponentKey]: (
    context: PickRouteSelectorProps<K>
  ) => UseAuthenticatorRouteProps<K>;
};

export type RouteSelectorKeys = {
  [K in AuthenticatorRouteComponentKey]: RouteMachinePropKeys[K][];
};

type ExtractAdditionalPropsKeys<T> = Exclude<
  keyof T,
  keyof UseAuthenticator | FormEventHandlerPropKey
>;

type ExtractRouteAdditonalProps<K extends AuthenticatorRouteComponentKey> =
  Pick<
    UseAuthenticatorRouteProps<K>,
    ExtractAdditionalPropsKeys<UseAuthenticatorRouteProps<K>>
  >;

export type RouteAdditionalProps = {
  [K in AuthenticatorRouteComponentKey]: (
    context: PickRouteSelectorProps<K>
  ) => ExtractRouteAdditonalProps<K>;
};

// export type AdditionalRouteProps = {
//   [K in AuthenticatorRouteComponentKey]: K extends 'signIn'
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
