import React from 'react';
import { NavigateProvider, NavigateContext } from './navigate';

import {
  LocationActions,
  LocationActionsContext,
  LocationActionsProvider,
} from './locationActions';

const CONTEXTS = {
  NAVIGATE: NavigateContext,
  LOCATION_ACTIONS: LocationActionsContext,
};

type Contexts = typeof CONTEXTS;

export function ControlProvider({
  actions,
  children,
}: {
  actions: LocationActions;
  children?: React.ReactNode;
}): React.JSX.Element {
  return (
    <NavigateProvider>
      <LocationActionsProvider actions={actions}>
        {children}
      </LocationActionsProvider>
    </NavigateProvider>
  );
}

export function useControl<
  T extends keyof Contexts,
  K = Contexts[T] extends React.Context<infer U | undefined> ? U : never,
>(type: T): K {
  // TS does not handle the inference of the underlying `Context` type well
  // but ultimately this is a safe lookup
  // @ts-expect-error
  const context = React.useContext<K>(CONTEXTS[type]);

  if (!context) {
    throw new Error(
      '`useControl` can only be called from within `StorageBrowser.Provider`'
    );
  }

  return context;
}
