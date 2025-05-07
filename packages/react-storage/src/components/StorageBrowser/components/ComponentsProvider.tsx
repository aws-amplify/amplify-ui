import React from 'react';

import { ElementsProvider } from '@aws-amplify/ui-react-core/elements';

import type { Composables } from './composables';
import { ComposablesProvider } from './composables';
import { elementsDefault } from './elements';

/**
 * Override/Custom component slots
 */
export interface StorageBrowserComponents extends Partial<Composables> {}

export interface ComponentsProviderProps {
  children?: React.ReactNode;
  composables?: Composables;
}

export function ComponentsProvider(
  props: ComponentsProviderProps
): React.JSX.Element {
  const { children, composables } = props;

  return (
    <ElementsProvider elements={elementsDefault}>
      <ComposablesProvider composables={composables}>
        {children}
      </ComposablesProvider>
    </ElementsProvider>
  );
}
