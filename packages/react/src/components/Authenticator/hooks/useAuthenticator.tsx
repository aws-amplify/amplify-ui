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

export const lazyStartAuthMachine = () => {
  if (!authMachine) {
    authMachine = interpret(createAuthenticatorMachine()).start();
  }
  return authMachine;
};

export const useAuthenticator = () => {
  const machine = lazyStartAuthMachine();
  const [state, send] = useActor(machine);

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
