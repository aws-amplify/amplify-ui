import React from 'react';
import {
  createAuthenticatorMachine,
  getServiceFacade,
  AuthInterpreter,
  AuthMachineState,
  getSendEventAliases,
  getServiceContextFacade,
  AuthMachineSend,
} from '@aws-amplify/ui';
import { useSelector, useInterpret } from '@xstate/react';
import isEmpty from 'lodash/isEmpty';
import { areArraysEqual } from '../../../../helpers';

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
   * comparator decides whether or not the new authState should trigger a
   * re-render. Does a deep equality check.
   */
  const comparator = (
    prevState: AuthMachineState,
    nextState: AuthMachineState
  ) => {
    if (!selector) return false;

    /**
     * We only trigger re-render if any of values in specified selected
     * values change. First compute the facade for prev and next state.
     */
    const prevFacade = getFacade(prevState);
    const nextFacade = getFacade(nextState);

    /**
     * Apply the passed in `selector` to get the value of their desired
     * dependency array.
     */
    const prevDepsArray = selector(prevFacade);
    const nextDepsArray = selector(nextFacade);

    // Shallow compare the array values
    // TODO: is there a reason to compare deep at the cost of expensive comparisons?
    return areArraysEqual(prevDepsArray, nextDepsArray);
  };

  const state = useSelector(service, xstateSelector, comparator);

  return { ...getFacade(state), _state: state, _send: send };
};
