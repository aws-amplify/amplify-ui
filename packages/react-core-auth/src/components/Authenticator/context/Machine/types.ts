import type {
  AuthInterpreter,
  NextAuthenticatorServiceFacade,
} from '@aws-amplify/ui';

/**
 * state machine context interface
 */
type ServiceFacadeKey = keyof NextAuthenticatorServiceFacade;

export interface MachineContextType {
  service: AuthInterpreter;
}

/**
 * Inspired from https://xstate.js.org/docs/packages/xstate-react/#useselector-actor-selector-compare-getsnapshot.
 *
 * Selector accepts current facade values and returns an array of
 * desired value(s) that should trigger re-render.
 */
export type UseMachineSelector = (
  context: Partial<NextAuthenticatorServiceFacade>
) => NextAuthenticatorServiceFacade[ServiceFacadeKey][];

export interface UseMachine extends NextAuthenticatorServiceFacade {}

export type Comparator = (
  currentMachineContext: Partial<NextAuthenticatorServiceFacade>,
  nextMachineContext: Partial<NextAuthenticatorServiceFacade>
) => boolean;
