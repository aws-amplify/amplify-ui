import {
  AuthenticatorMachineOptions,
  AuthInterpreter,
  createAuthenticatorMachine,
  getServiceFacade,
} from '@aws-amplify/ui';
import { useActor } from '@xstate/react';
import React from 'react';
import { interpret } from 'xstate';

let authMachine: AuthInterpreter;

export const startAuthMachine = (options: AuthenticatorMachineOptions) => {
  authMachine = interpret(createAuthenticatorMachine(options)).start();
  return authMachine;
};

export const getAuthMachine = () => {
  return authMachine;
};

export const useAuthenticator = () => {
  if (!authMachine) return; // this breaks the rules of hooks though.
  const [state, send] = useActor(authMachine);
  console.log(state.value);

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
