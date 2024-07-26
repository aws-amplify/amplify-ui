import React from 'react';

import { ElementsProvider } from '@aws-amplify/ui-react-core/elements';

import { StorageBrowserElements } from './context/elements';
import { ControlProvider } from './context/controls';
import { ErrorBoundary } from './ErrorBoundary';

interface CreateStorageBrowserInput<T> {
  elements?: T;
}

export default function createProvider<
  T extends Partial<StorageBrowserElements>,
>({ elements }: Pick<CreateStorageBrowserInput<T>, 'elements'>) {
  return function Provider({
    children,
  }: {
    children?: React.ReactNode;
  }): React.JSX.Element {
    return (
      <ErrorBoundary>
        <ElementsProvider elements={elements}>
          <ControlProvider>{children}</ControlProvider>
        </ElementsProvider>
      </ErrorBoundary>
    );
  };
}
