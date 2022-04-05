import * as React from 'react';

import { DefaultComponents } from './defaultComponents';

interface CustomComponentsType {
  components?: DefaultComponents;
}

export const CustomComponentsContext =
  React.createContext<CustomComponentsType>(null);

export const useCustomComponents = () => {
  const context = React.useContext(CustomComponentsContext);
  if (!context) {
    throw new Error(
      '`useCustomComponents` cannot be used outside of a `CustomComponentsContext.Provider`'
    );
  }
  return context;
};
