import {
  AuthMachineSend,
  AuthMachineState,
  AuthenticatorServiceFacade,
  LegacyFormFieldOptions,
} from '@aws-amplify/ui';

/**
 * These are the "facades" that we provide, which contains contexts respective
 * to current authenticator state.
 */
type AuthenticatorMachineContext = AuthenticatorServiceFacade;
type AuthenticatorMachineContextKey = keyof AuthenticatorMachineContext;

export type AuthenticatorRouteComponentKey =
  | 'signIn'
  | 'signUp'
  | 'forceNewPassword'
  | 'confirmResetPassword'
  | 'confirmSignIn'
  | 'confirmSignUp'
  | 'confirmVerifyUser'
  | 'resetPassword'
  | 'setupTOTP';

export type AuthenticatorLegacyFields = LegacyFormFieldOptions[];

/**
 * Inspired from https://xstate.js.org/docs/packages/xstate-react/#useselector-actor-selector-compare-getsnapshot.
 *
 * Selector accepts current facade values and returns an array of
 * desired value(s) that should trigger re-render.
 */
export type Selector = (
  context: AuthenticatorMachineContext
) => AuthenticatorMachineContext[AuthenticatorMachineContextKey][];

// TODO(breaking): remove these from usage in the UI layer
type InternalAuthenticatorContext = {
  _state: AuthMachineState;
  _send: AuthMachineSend;
};

export interface UseAuthenticator extends AuthenticatorServiceFacade {
  getTotpSecretCode: () => Promise<string>;

  /** @deprecated For internal use only */
  fields: AuthenticatorLegacyFields;
  /** @deprecated For internal use only */
  _send: InternalAuthenticatorContext['_send'];
  /** @deprecated For internal use only */
  _state: InternalAuthenticatorContext['_state'];
}

export type Comparator = (
  currentFacade: AuthenticatorServiceFacade,
  nextFacade: AuthenticatorServiceFacade
) => boolean;
