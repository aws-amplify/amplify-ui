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

export const AuthenticatorContext: React.Context<AuthenticatorContextValue> =
  React.createContext({});

export const Provider = ({ children }) => {
  const parentProviderVal = React.useContext(AuthenticatorContext);
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

export type AuthenticatorContext = ReturnType<typeof getServiceFacade>;

export type Selector = (context: AuthenticatorContext) => any;

export const useAuthenticator = (selector?: Selector) => {
  const { service } = React.useContext(AuthenticatorContext);
  const send = service.send;
  const sendAliases = React.useMemo(() => getSendEventAliases(send), [service]);

  const getFacade = (state: AuthMachineState) => {
    return { ...sendAliases, ...getServiceContextFacade(state) };
  };

  const comparator = (
    prevState: AuthMachineState,
    nextState: AuthMachineState
  ) => {
    if (!selector) return false;

    const prevFacade = getFacade(prevState);
    const nextFacade = getFacade(nextState);
    return isEqual(selector(prevFacade), selector(nextFacade));
  };

  const state = useSelector(service, (state) => state, comparator);

  return {
    /** @deprecated For internal use only */
    _send: send,
    /** @deprecated For internal use only */
    _state: state,
    ...getFacade(state),
  };
};

/**
 * This React hook subscribes to every update to authenticator route (ie. authState)
 * and provides authenticator related context.
 */
export const useAuthenticatorRoute = () =>
  useAuthenticator((context) => context.route);

/**
 * This React hook subscribes to every update to authenticated user and provides
 * authenticator related context.
 */
export const useAuthenticatorUser = () =>
  useAuthenticator((context) => context.user);
