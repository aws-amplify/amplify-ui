import React from 'react';

import { ElementsProvider } from '@aws-amplify/ui-react-core/elements';

import { ComposablesProvider, Composables } from './composables';
import { StorageBrowserElements } from './context/elements';

/**
 * Override/Custom component slots
 */
export interface StorageBrowserComponents extends Partial<Composables> {}

export interface ComponentsProviderProps {
  children?: React.ReactNode;
  composables?: Composables;
  elements?: Partial<StorageBrowserElements>;
}

export function ComponentsProvider(
  props: ComponentsProviderProps
): React.JSX.Element {
  const { children, composables, elements } = props;

  return (
    <ElementsProvider elements={elements}>
      <ComposablesProvider composables={composables}>
        {children}
      </ComposablesProvider>
    </ElementsProvider>
  );
}
