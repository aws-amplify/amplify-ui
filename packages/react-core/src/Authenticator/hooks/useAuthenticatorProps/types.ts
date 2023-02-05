import { AuthenticatorRoute } from '@aws-amplify/ui';

import {
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

export type UseAuthenticatorRouteProps<Route extends AuthenticatorRoute> =
  Route extends AuthenticatorRouteComponentKey
    ? Required<RouteComponentProps[Route]>
    : RouteProp;

type RouteSelectorPropsKeys = {
  [K in AuthenticatorRouteComponentKey]:
    | ExtractMachineKey<RouteComponentProps[K]>
    | CommonRouteMachineProps;
};

export type RouteSelectorKeys = {
  [K in AuthenticatorRouteComponentKey]: RouteSelectorPropsKeys[K][];
};

type PickRouteSelectorProps<Route extends AuthenticatorRouteComponentKey> =
  Pick<UseAuthenticator, RouteSelectorPropsKeys[Route]>;

export type RouteSelectorProps = {
  [K in AuthenticatorRouteComponentKey]: PickRouteSelectorProps<K>;
};

type RoutePropsResolver<Route extends AuthenticatorRouteComponentKey> = (
  props: PickRouteSelectorProps<Route>
) => UseAuthenticatorRouteProps<Route>;

export type RoutePropsResolvers = {
  [K in AuthenticatorRouteComponentKey]: RoutePropsResolver<K>;
};
