import React from 'react';
import {
  createAuthenticatorMachine,
  getServiceFacade,
  AuthInterpreter,
  AuthMachineState,
  getSendEventAliases,
  getServiceContextFacade,
} from '@aws-amplify/ui';
import { useSelector, useInterpret } from '@xstate/react';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';

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
 * Inspired from https://xstate.js.org/docs/packages/xstate-react/#useselector-actor-selector-compare-getsnapshot.
 *
 * Selector  accepts current facade values and returns desired value(s) that should trigger re-render.
 */
export type Selector = (context: AuthenticatorContext) => any;

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
   * Selects which value to return from `useAuthenticator`. If selector is not
   * provided, then we return the whole state back.
   */
  const xstateSelector = (state: AuthMachineState) => {
    if (!selector) return state;

    const facade = getFacade(state);
    return selector(facade);
  };

  /**
   * comparator decides whether or not the new authState should trigger a
   * re-render. Does a deep equality check.
   */
  const comparator = (
    prevState: AuthMachineState,
    nextState: AuthMachineState
  ) => {
    if (!selector) return false;
    return isEqual(prevState, nextState);
  };

  const selectedValue = useSelector(service, xstateSelector, comparator);

  /**
   * If selector was passed into the hook, we return just the selected value.
   *
   * Otherwise if developer `useAuthenticator()` without selector, then we return
   * back the whole facade.
   */
  if (selector) {
    return selectedValue;
  } else {
    const state = selectedValue;
    return {
      /** @deprecated For internal use only */
      _send: send,
      /** @deprecated For internal use only */
      _state: state,
      ...getFacade(state),
    };
  }
};

/**
 * Subscribes to every update to authenticator route (ie. authState) and
 * provides authenticator context.
 */
export const useAuthenticatorRoute = () =>
  useAuthenticator((context) => context.route);

export const useAuthenticatorCustom = () =>
  useAuthenticator((context) => ({ route: context.route, user: context.user }));

/**
 * Subscribes to every update to authenticated user and provides authenticator
 * context.
 */
export const useAuthenticatorUser = () =>
  useAuthenticator((context) => context.user);

/**
 * Provides helpers to trigger transitions to Authenticator.
 */
export const useAuthenticatorTransitions = () => {
  const { service } = React.useContext(AuthenticatorContext);
  const send = service.send;

  // send aliases are static and thus can be memoized
  const sendAliases = React.useMemo<ReturnType<typeof getSendEventAliases>>(
    () => getSendEventAliases(send),
    [service]
  );

  return sendAliases;
};
