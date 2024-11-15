import React from 'react';
import { createContextUtilities } from '@aws-amplify/ui-react-core';

import { ActionProvider, createListLocationsAction } from './actions';
import { LocationActions } from './locationActions';
import { ListLocations } from '../adapters/types';

export const { useTempActions, TempActionsContext } = createContextUtilities<
  LocationActions,
  'TempActions'
>({
  contextName: 'TempActions',
  errorMessage: 'Call to useTempActions must be wrapped in TempActionsProvider',
});

function TempActionsProvider({
  actions,
  children,
}: {
  actions: LocationActions;
  children?: React.ReactNode;
}): React.JSX.Element {
  return (
    <TempActionsContext.Provider value={actions}>
      {children}
    </TempActionsContext.Provider>
  );
}

interface Config {
  accountId?: string;
  listLocations: ListLocations;
  region: string;
}

interface CreateTempActionsProviderInput {
  actions: LocationActions;
  config: Config;
}

export function createTempActionsProvider({
  actions,
  config,
}: CreateTempActionsProviderInput): (props: {
  children?: React.ReactNode;
}) => React.JSX.Element {
  const listLocationsAction = createListLocationsAction(config.listLocations);

  function Provider({
    children,
  }: {
    children?: React.ReactNode;
  }): React.JSX.Element {
    return (
      <TempActionsProvider actions={actions}>
        <ActionProvider listLocationsAction={listLocationsAction}>
          {children}
        </ActionProvider>
      </TempActionsProvider>
    );
  }

  return Provider;
}
