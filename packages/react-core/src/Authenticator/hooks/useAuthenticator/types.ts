import {
  AuthMachineSend,
  AuthMachineState,
  AuthenticatorServiceFacade,
} from '@aws-amplify/ui';

/**
 * These are the "facades" that we provide, which contains contexts respective
 * to current authenticator state.
 */
type AuthenticatorMachineContext = AuthenticatorServiceFacade;
type AuthenticatorMachineContextKey = keyof AuthenticatorMachineContext;

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

export interface UseAuthenticator
  extends Omit<AuthenticatorServiceFacade, 'toFederatedSignIn'> {
  /**
   * @deprecated `toFederatedSignIn` will be removed in a future major version release of `@aws-amplify/ui-react`
   */
  toFederatedSignIn: AuthenticatorServiceFacade['toFederatedSignIn'];
  /** @deprecated For internal use only */
  _send: InternalAuthenticatorContext['_send'];
  /** @deprecated For internal use only */
  // _state: InternalAuthenticatorContext['_state'];
}

export type Comparator = (
  currentFacade: AuthenticatorServiceFacade,
  nextFacade: AuthenticatorServiceFacade
) => boolean;
