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

export const Provider = ({ children }: { children: React.ReactNode }) => {
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

  const { service: activeService } = value;

  const isListening = React.useRef(false);
  React.useEffect(() => {
    if (isListening.current) return;

    isListening.current = true;
    return listenToAuthHub(activeService);
  }, [activeService]);

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

const useAuthenticatorService = () => {
  const { service } = React.useContext(AuthenticatorContext);

  if (!service) {
    throw new Error(
      'Please ensure you wrap your App with `Authenticator.Provider`.\nSee the `useAuthenticator` section on https://ui.docs.amplify.aws/components/authenticator.'
    );
  }

  return service;
};

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/authenticator/headless#useauthenticator-hook)
 */
export const useAuthenticator = (selector?: Selector) => {
  const service = useAuthenticatorService();

  const { send } = service;

  // send aliases are static and thus can be memoized
  const sendAliases = React.useMemo<ReturnType<typeof getSendEventAliases>>(
    () => getSendEventAliases(send),
    [send]
  );

  const getFacade = (state: AuthMachineState) => {
    return { ...sendAliases, ...getServiceContextFacade(state) };
  };

  /**
   * For `useSelector`'s selector argument, we transform `state` into
   * public facade values using `getFacade`.
   *
   * This is to hide the internal xstate implementation details to customers.
   */
  const xstateSelector = (state: AuthMachineState) => getFacade(state);

  /**
   * comparator decides whether or not the new authState should trigger a
   * re-render. Does a deep equality check.
   */
  const comparator = (
    prevFacade: ReturnType<typeof getFacade>,
    nextFacade: ReturnType<typeof getFacade>
  ) => {
    if (!selector) return false;

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

  const facade = useSelector(service, xstateSelector, comparator);

  return {
    ...facade,
    /** @deprecated For internal use only */
    _state: service.getSnapshot(),
    /** @deprecated For internal use only */
    _send: send,
  };
};

export type UseAuthenticator = ReturnType<typeof useAuthenticator>;
