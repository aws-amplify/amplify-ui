import * as React from 'react';

import { DefaultComponents } from './defaultComponents';

export interface ComponentsProviderProps {
  components?: DefaultComponents;
}

export const CustomComponentsContext = React.createContext<DefaultComponents>(
  {}
);

export const useCustomComponents = (): DefaultComponents => {
  const context = React.useContext(CustomComponentsContext);
  if (!context) {
    throw new Error(
      '`useCustomComponents` cannot be used outside of a `CustomComponentsContext.Provider`'
    );
  }
  return context;
};
