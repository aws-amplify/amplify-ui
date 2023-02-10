import * as React from 'react';

import { DefaultComponents, defaultComponents } from './defaultComponents';

export interface ComponentsProviderProps {
  components: DefaultComponents;
}

export const CustomComponentsContext =
  React.createContext<ComponentsProviderProps>({
    components: defaultComponents,
  });

export const useCustomComponents = (): ComponentsProviderProps => {
  const context = React.useContext(CustomComponentsContext);
  if (!context) {
    throw new Error(
      '`useCustomComponents` cannot be used outside of a `CustomComponentsContext.Provider`'
    );
  }
  return context;
};
