import { AuthMachineSend, AuthMachineState } from '@aws-amplify/ui';

import {
  AuthenticatorLegacyFields,
  AuthenticatorMachineContext,
  AuthenticatorMachineContextKey,
  GetTotpSecretCode,
} from '../types';

/**
 * Inspired from https://xstate.js.org/docs/packages/xstate-react/#useselector-actor-selector-compare-getsnapshot.
 *
 * Selector accepts current facade values and returns an array of
 * desired value(s) that should trigger re-render.
 */
export type UseAuthenticatorSelector = (
  context: AuthenticatorMachineContext
) => AuthenticatorMachineContext[AuthenticatorMachineContextKey][];

// TODO(breaking): remove these from usage in the UI layer
type InternalAuthenticatorContext = {
  _state: AuthMachineState;
  _send: AuthMachineSend;
};

export interface UseAuthenticator extends AuthenticatorMachineContext {
  getTotpSecretCode: GetTotpSecretCode;

  /** @deprecated For internal use only */
  fields: AuthenticatorLegacyFields;
  /** @deprecated For internal use only */
  _send: InternalAuthenticatorContext['_send'];
  /** @deprecated For internal use only */
  _state: InternalAuthenticatorContext['_state'];
}

export type Comparator = (
  currentMachineContext: AuthenticatorMachineContext,
  nextMachineContext: AuthenticatorMachineContext
) => boolean;
