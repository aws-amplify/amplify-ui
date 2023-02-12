import { AuthChallengeName, AuthenticatorRoute } from '@aws-amplify/ui';

import { UseAuthenticator } from '../useAuthenticator';
import {
  AuthenticatorRouteComponentKey,
  AuthenticatorMachineContext,
  AuthenticatorMachineContextKey,
} from '../types';

export interface CommonRouteProps {
  error?: UseAuthenticator['error'];
  isPending: UseAuthenticator['isPending'];
  handleBlur: UseAuthenticator['updateBlur'];
  handleChange: UseAuthenticator['updateForm'];
  handleSubmit: UseAuthenticator['submitForm'];
}

interface ConfirmResetPasswordRouteProps extends CommonRouteProps {
  resendCode: UseAuthenticator['resendCode'];
  validationErrors?: UseAuthenticator['validationErrors'];
}

interface ConfirmSignInRouteProps extends CommonRouteProps {
  challengeName: AuthChallengeName;
  toSignIn: UseAuthenticator['toSignIn'];
}

interface ConfirmSignUpRouteProps extends CommonRouteProps {
  codeDeliveryDetails: UseAuthenticator['codeDeliveryDetails'];
  resendCode: UseAuthenticator['resendCode'];
}

interface ConfirmVerifyUserRouteProps extends CommonRouteProps {
  skipVerification: UseAuthenticator['skipVerification'];
}

interface ForceNewPasswordRouteProps extends CommonRouteProps {
  toSignIn: UseAuthenticator['toSignIn'];
  validationErrors?: UseAuthenticator['validationErrors'];
}

interface ResetPasswordRouteProps extends CommonRouteProps {
  toSignIn: UseAuthenticator['toSignIn'];
}

interface SetupTOTPRouteProps extends CommonRouteProps {
  toSignIn: UseAuthenticator['toSignIn'];
  totpSecretCode: UseAuthenticator['totpSecretCode'];
}

interface SignInRouteProps extends CommonRouteProps {
  hideSignUp?: boolean;
  toFederatedSignIn: UseAuthenticator['toFederatedSignIn'];
  toResetPassword: UseAuthenticator['toResetPassword'];
  toSignUp: UseAuthenticator['toSignUp'];
}

interface SignUpRouteProps extends CommonRouteProps {
  hideSignIn?: boolean;
  toFederatedSignIn: UseAuthenticator['toFederatedSignIn'];
  toSignIn: UseAuthenticator['toSignIn'];
  validationErrors?: UseAuthenticator['validationErrors'];
}

interface VerifyUserRouteProps extends CommonRouteProps {
  skipVerification: UseAuthenticator['skipVerification'];
}

/**
 * Extract `route` selector `props` keys
 */
type ExtractRouteSelectorKeys<Props> = Extract<
  AuthenticatorMachineContextKey,
  keyof Props
>;

/**
 * `UseAuthenticator` event handler `props` keys
 */
type FormEventSelectorKey = 'updateBlur' | 'updateForm' | 'submitForm';

export type CommonRouteSelectorKeys =
  | ExtractRouteSelectorKeys<CommonRouteProps>
  | FormEventSelectorKey;

/**
 * Route Component `props` for both React and React Native implementations.
 *
 * Each Route Component's `props` consist of:
 * - common machine related `props` from `useAuthenticator`
 * - `route` specific machine related `props` from `useAuthenticator`
 * - common event handler `props`
 * - `route` specific `props`, example: `hideSignIn`
 */
export interface BaseRouteComponentsProps {
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

type RouteProp = { route: AuthenticatorRoute };

export interface UseAuthenticatorPropsParams<Route extends AuthenticatorRoute> {
  route: Route;
}

export type UseAuthenticatorRouteProps<Route extends AuthenticatorRoute> =
  Route extends AuthenticatorRouteComponentKey
    ? Required<BaseRouteComponentsProps[Route]>
    : RouteProp;

/**
 * Route Component specific selector `props` keys. Each union corresponds to the
 * keys that should be returned by for the current `route` when calling
 * `useAuthenticator`
 */
type RouteSelectorPropsKeys = {
  [Key in AuthenticatorRouteComponentKey]:
    | CommonRouteSelectorKeys
    | ExtractRouteSelectorKeys<BaseRouteComponentsProps[Key]>
    // `confirmSignIn` requires special handling, `user` is needed to resolve the
    // the value of `challengeName`
    | (Key extends 'confirmSignIn' ? 'user' : never);
};

export type RouteSelectorKeys = {
  [Key in AuthenticatorRouteComponentKey]: RouteSelectorPropsKeys[Key][];
};

type PickRouteSelectorProps<Route extends AuthenticatorRouteComponentKey> =
  Pick<UseAuthenticator, RouteSelectorPropsKeys[Route]>;

/**
 * Expected selector `props` for each Route Component
 */
export type RouteSelectorProps = {
  [Key in AuthenticatorRouteComponentKey]: PickRouteSelectorProps<Key>;
};

type RoutePropsResolver<Route extends AuthenticatorRouteComponentKey> = (
  props: PickRouteSelectorProps<Route>
) => UseAuthenticatorRouteProps<Route>;

/**
 * Tranlates state machine event handlers functions to UI event handler `props`
 */
export type TranslateHandlerProps = Partial<AuthenticatorMachineContext> &
  Pick<AuthenticatorMachineContext, FormEventSelectorKey>;

/**
 * Functions resolving selector, event handler, and route specific `props` for each Route Component.
 */
export type RoutePropsResolvers = {
  [Key in AuthenticatorRouteComponentKey]: RoutePropsResolver<Key>;
};
