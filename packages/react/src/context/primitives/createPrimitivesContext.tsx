import React from 'react';

import { RenderNothing } from '@aws-amplify/ui-react-core';
import { Primitives, PrimitivesProviderProps } from './types';

interface CreatePrimitivesContextResult<T extends Primitives> {
  PrimitivesProvider: (props: PrimitivesProviderProps<T>) => JSX.Element;
  usePrimitive: <K extends keyof T>(name: K) => T[K];
}

const createPrimitivesContext = <T extends Primitives>(
  defaultValue: T
): CreatePrimitivesContextResult<T> => {
  const PrimitivesContext = React.createContext<T>(defaultValue);
  return {
    PrimitivesProvider: ({ children, primitives }): JSX.Element => (
      <PrimitivesContext.Provider value={primitives}>
        {children}
      </PrimitivesContext.Provider>
    ),
    usePrimitive: (name) =>
      // fallback to `RenderNothing` on lookup fail
      React.useContext(PrimitivesContext)?.[name] ?? RenderNothing,
  };
};

export default createPrimitivesContext;
