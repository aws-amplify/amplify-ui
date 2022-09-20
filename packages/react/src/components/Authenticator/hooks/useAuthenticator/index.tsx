import * as React from 'react';

import {
  AuthInterpreter,
  AuthMachineSend,
  AuthMachineState,
  createAuthenticatorMachine,
  getServiceFacade,
  listenToAuthHub,
  AuthenticatorServiceFacade,
} from '@aws-amplify/ui';
import { useSelector, useInterpret } from '@xstate/react';
import isEmpty from 'lodash/isEmpty';

import { areArrayValuesEqual } from '../../../../helpers';

export type AuthenticatorContextValue = {
  service?: AuthInterpreter;
};

/**
 * These are the "facades" that we provide, which contains contexts respective
 * to current authenticator state.
 */
export type AuthenticatorContext = AuthenticatorServiceFacade;

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

export interface UseAuthenticator extends AuthenticatorServiceFacade {
  /** @deprecated For internal use only */
  _send: InternalAuthenticatorContext['_send'];
  /** @deprecated For internal use only */
  _state: InternalAuthenticatorContext['_state'];
}

/**
 * AuthenticatorContext serves static reference to the auth machine service.
 *
 * https://xstate.js.org/docs/recipes/react.html#context-provider
 */
export const AuthenticatorContext: React.Context<AuthenticatorContextValue> =
  React.createContext({});

export const Provider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
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
  const value = React.useMemo(
    () => (isEmpty(parentProviderVal) ? { service } : parentProviderVal),
    [parentProviderVal, service]
  );

  const { service: activeService } = value;

  React.useEffect(() => {
    return listenToAuthHub(activeService);
  }, [activeService]);

  return (
    <AuthenticatorContext.Provider value={value}>
      {children}
    </AuthenticatorContext.Provider>
  );
};

const useAuthenticatorService = () => {
  const { service } = React.useContext(AuthenticatorContext);

  if (!service) {
    throw new Error(
      'Please ensure you wrap your App with `Authenticator.Provider`.\nSee the `useAuthenticator` section on https://ui.docs.amplify.aws/connected-components/authenticator.'
    );
  }

  return service;
};

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/connected-components/authenticator/headless#useauthenticator-hook)
 */
export const useAuthenticator = (selector?: Selector): UseAuthenticator => {
  const service = useAuthenticatorService();

  const { send } = service;

  const getFacade = React.useCallback(
    (state: AuthMachineState) => ({ ...getServiceFacade({ send, state }) }),
    [send]
  );

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
    prevFacade: AuthenticatorServiceFacade,
    nextFacade: AuthenticatorServiceFacade
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
