import React, { useCallback } from 'react';
import { useInterpret, useSelector } from '@xstate/react';
import type {
  AuthenticatorMachineOptions,
  AuthMachineState,
} from '@aws-amplify/ui';
import {
  getNextServiceFacade,
  createAuthenticatorMachine,
} from '@aws-amplify/ui';

import type {
  MachineContextType,
  UseMachineSelector,
  UseMachine,
} from './types';
import { defaultComparator, getComparator } from './utils';
import type { InitialRoute } from '../ComponentRoute';

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

interface MachineProviderProps
  extends Omit<AuthenticatorMachineOptions, 'initialState'> {
  children?: React.ReactNode;
  initialRoute: InitialRoute;
}

export function MachineProvider({
  children,
  initialRoute: initialState,
  ...data
}: MachineProviderProps): React.JSX.Element {
  const service = useInterpret(() =>
    createAuthenticatorMachine({
      ...data,
      initialState,
      useNextWaitConfig: true,
    })
  );
  const value = React.useMemo(() => ({ service }), [service]);
  return (
    <MachineContext.Provider value={value}>{children}</MachineContext.Provider>
  );
}
