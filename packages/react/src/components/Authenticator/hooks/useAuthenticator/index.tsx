import React from 'react';
import { createAuthenticatorMachine, getServiceFacade } from '@aws-amplify/ui';
import { useMachine } from '@xstate/react';
import isEmpty from 'lodash/isEmpty';

export const useAuthenticatorContextValue = () => {
  const [state, send] = useMachine(createAuthenticatorMachine);

  const facade = React.useMemo(
    () => getServiceFacade({ send, state }),
    [send, state]
  );

  return {
    /** @deprecated For internal use only */
    _send: send,
    /** @deprecated For internal use only */
    _state: state,
    ...facade,
  };
};

export type AuthenticatorContextValue = Partial<
  ReturnType<typeof useAuthenticatorContextValue>
>;

export const AuthenticatorContext: React.Context<AuthenticatorContextValue> =
  React.createContext({});

export const Provider = ({ children }) => {
  const parentProviderVal = React.useContext(AuthenticatorContext);
  const currentProviderVal = useAuthenticatorContextValue();

  const value = isEmpty(parentProviderVal)
    ? currentProviderVal
    : parentProviderVal;

  return (
    <AuthenticatorContext.Provider value={value}>
      {children}
    </AuthenticatorContext.Provider>
  );
};

export const useAuthenticator = () => {
  return React.useContext(AuthenticatorContext);
};
