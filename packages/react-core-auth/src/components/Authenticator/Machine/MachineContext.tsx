import React, { useCallback } from 'react';
import { useInterpret, useSelector } from '@xstate/react';
import {
  AuthenticatorMachineOptions,
  AuthMachineState,
  getNextServiceFacade,
  createAuthenticatorMachine,
} from '@aws-amplify/ui';

import { MachineContextType, UseMachineSelector, UseMachine } from './types';
import { defaultComparator, getComparator } from './utils';

export const USE_MACHINE_ERROR =
  '`useMachine` must be used inside an `Authenticator.Provider`.';

const MachineContext = React.createContext<MachineContextType | null>(null);

export function useMachine(selector?: UseMachineSelector): UseMachine {
  const context = React.useContext(MachineContext);

  if (!context) {
    throw new Error(USE_MACHINE_ERROR);
  }

  const { service } = context;
  const { send } = service;

  const xstateSelector = useCallback(
    (state: AuthMachineState) => getNextServiceFacade({ send, state }),
    [send]
  );

  const comparator = selector ? getComparator(selector) : defaultComparator;
  const facade = useSelector(service, xstateSelector, comparator);

  return facade;
}

interface MachineProviderProps extends AuthenticatorMachineOptions {
  children?: React.ReactNode;
}

export function MachineProvider({
  children,
  ...data
}: MachineProviderProps): JSX.Element {
  const service = useInterpret(() => createAuthenticatorMachine(data));
  const value = React.useMemo(() => ({ service }), [service]);

  return (
    <MachineContext.Provider value={value}>{children}</MachineContext.Provider>
  );
}
