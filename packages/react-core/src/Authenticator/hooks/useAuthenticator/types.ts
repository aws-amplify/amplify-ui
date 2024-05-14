import {
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
  | 'forgotPassword'
  | 'setupTotp'
  | 'verifyUser';

export type AuthenticatorLegacyFields = LegacyFormFieldOptions[];

/**
 * Inspired from https://xstate.js.org/docs/packages/xstate-react/#useselector-actor-selector-compare-getsnapshot.
 *
 * Selector accepts current facade values and returns an array of
 * desired value(s) that should trigger re-render.
 */
export type UseAuthenticatorSelector = (
  context: AuthenticatorMachineContext
) => AuthenticatorMachineContext[AuthenticatorMachineContextKey][];

export interface UseAuthenticator extends AuthenticatorServiceFacade {
  /** @deprecated For internal use only */
  fields: AuthenticatorLegacyFields;

  /** @deprecated For internal use only */
  QRFields: { totpIssuer?: string; totpUsername?: string } | null;
}

export type Comparator = (
  currentMachineContext: AuthenticatorMachineContext,
  nextMachineContext: AuthenticatorMachineContext
) => boolean;
