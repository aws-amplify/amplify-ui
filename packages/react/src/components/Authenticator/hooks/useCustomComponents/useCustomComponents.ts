import * as React from 'react';

import { DefaultComponents } from './defaultComponents';

export interface ComponentsProviderProps {
  components?: DefaultComponents;
}
export const CustomComponentsContext =
  // @ts-ignore
  React.createContext<ComponentsProviderProps>(null);

export const useCustomComponents = (): ComponentsProviderProps => {
  const context = React.useContext(CustomComponentsContext);
  if (!context) {
    throw new Error(
      '`useCustomComponents` cannot be used outside of a `CustomComponentsContext.Provider`'
    );
  }
  return context;
};
