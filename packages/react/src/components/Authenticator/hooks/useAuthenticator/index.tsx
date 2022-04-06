import * as React from 'react';
import {
  createAuthenticatorMachine,
  getServiceFacade,
  AuthInterpreter,
  AuthMachineState,
  getSendEventAliases,
  getServiceContextFacade,
  AuthMachineSend,
  listenToAuthHub,
} from '@aws-amplify/ui';
import { useSelector, useInterpret } from '@xstate/react';
import isEmpty from 'lodash/isEmpty';

import { areArrayValuesEqual } from '../../../../helpers';

export type AuthenticatorContextValue = {
  service?: AuthInterpreter;
};

/**
 * AuthenticatorContext serves static reference to the auth machine service.
 *
 * https://xstate.js.org/docs/recipes/react.html#context-provider
 */
export const AuthenticatorContext: React.Context<AuthenticatorContextValue> =
  React.createContext({});

export const Provider = ({ children }) => {
  /**
   * Based on use cases, developer might already have added another Provider
   * outside Authenticator. In that case, we sync the two providers by just
   * passing the parent value.
   *
   * TODO(BREAKING): enforce only one provider in App tree
   */
  const parentProviderVal = React.useContext(AuthenticatorContext);
  /**
   * Ideally, `useInterpret` shouldn't even be run if `parentProviderVal` is
   * not empty. But conditionally running `useInterpret` breaks rules of hooks.
   *
   * Leaving this as is for now in the interest of suggested code guideline.
   */
  const service = useInterpret(createAuthenticatorMachine);
  const currentProviderVal = { service };

  const value = isEmpty(parentProviderVal)
    ? currentProviderVal
    : parentProviderVal;

  const {
    service: { send },
  } = value;

  React.useEffect(() => {
    return listenToAuthHub(send);
  }, []);

  return (
    <AuthenticatorContext.Provider value={value}>
      {children}
    </AuthenticatorContext.Provider>
  );
};

/**
 * These are the "facades" that we provide, which contains contexts respective
 * to current authenticator state.
 */
export type AuthenticatorContext = ReturnType<typeof getServiceFacade>;

/**
 * These are internal xstate helpers to we share with `useAuthenticator`.
 *
 * TODO(breaking?): remove these internal contexts
 */
export type InternalAuthenticatorContext = {
  _state: AuthMachineState;
  _send: AuthMachineSend;
};

/**
 * Inspired from https://xstate.js.org/docs/packages/xstate-react/#useselector-actor-selector-compare-getsnapshot.
 *
 * Selector accepts current facade values and returns an array of
 * desired value(s) that should trigger re-render.
 */
export type Selector = (context: AuthenticatorContext) => Array<any>;

export const useAuthenticator = (selector?: Selector) => {
  const { service } = React.useContext(AuthenticatorContext);
  const send = service.send;

  // send aliases are static and thus can be memoized
  const sendAliases = React.useMemo<ReturnType<typeof getSendEventAliases>>(
    () => getSendEventAliases(send),
    [service]
  );

  const getFacade = (state: AuthMachineState) => {
    return { ...sendAliases, ...getServiceContextFacade(state) };
  };

  /**
   * For `useSelector`'s selector argument, we just return back the `state`.
   * The reason is that whenever you select a specific value of the state, the
   * hook will return *only* that selected value instead of the whole `state`.
   *
   * To provide a consistent set of facade, we let the `selector` trivially return
   * itself and let comparator decide when to re-render.
   */
  const xstateSelector = (state: AuthMachineState) => state;

  /**
   * Holds a snapshot copy of last previous facade values. Will be used
   * on state changes to see if any of facade values have changed.
   */
  const prevFacadeRef = React.useRef<ReturnType<typeof getFacade>>();

  /**
   * comparator decides whether or not the new authState should trigger a
   * re-render. Does a deep equality check.
   */
  const comparator = (
    /**
     * We do not use `_prevState`, because it holds a *reference* to actor
     * object, of which value could easily mutate between compare calls.
     *
     * Instead, we'll use prevFacadeRef for comparison.
     */
    _prevState: AuthMachineState,
    nextState: AuthMachineState
  ) => {
    if (!selector) return false;

    /**
     * We only trigger re-render if any of values in specified selected
     * values change. First compute the facade for prev and next state.
     */
    const prevFacade = prevFacadeRef.current;
    const nextFacade = getFacade(nextState);

    /**
     * prevFacadeRef can now be updated with new facade values
     */
    prevFacadeRef.current = nextFacade;

    // If this is the first time comparator is called, return false
    if (!prevFacade) return false;

    /**
     * Apply the passed in `selector` to get the value of their desired
     * dependency array.
     */
    const prevDepsArray = selector(prevFacade);
    const nextDepsArray = selector(nextFacade);

    // Shallow compare the array values
    // TODO: is there a reason to compare deep at the cost of expensive comparisons?
    return areArrayValuesEqual(prevDepsArray, nextDepsArray);
  };

  const state = useSelector(service, xstateSelector, comparator);

  return {
    ...getFacade(state),
    /** @deprecated For internal use only */
    _state: state,
    /** @deprecated For internal use only */
    _send: send,
  };
};
