import React from 'react';

import { ElementsProvider } from '@aws-amplify/ui-react-core/elements';

import { ComposablesProvider } from './composables/context';
import { Composables } from './composables/types';
import { StorageBrowserElements } from './context/elements';

export interface ComponentsProviderProps {
  children?: React.ReactNode;
  // temp disablng of linting rule to note where `components`/"slots" context is provided
  // eslint-disable-next-line react/no-unused-prop-types
  components?: Composables;
  elements?: Partial<StorageBrowserElements>;
}

export function ComponentsProvider(
  props: ComponentsProviderProps
): React.JSX.Element {
  const { children, elements } = props;

  return (
    <ElementsProvider elements={elements}>
      <ComposablesProvider>{children}</ComposablesProvider>
    </ElementsProvider>
  );
}
