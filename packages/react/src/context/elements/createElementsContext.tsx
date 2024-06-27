import React from 'react';

import { RenderNothing } from '@aws-amplify/ui-react-core';
import { Elements, ElementsProviderProps } from './types';

interface CreateElementsContextResult<T extends Elements> {
  ElementsProvider: (props: ElementsProviderProps<T>) => JSX.Element;
  useElement: <K extends keyof T>(name: K) => T[K];
}

const createElementsContext = <T extends Elements>(
  defaultValue: T
): CreateElementsContextResult<T> => {
  const ElementsContext = React.createContext<T>(defaultValue);
  return {
    ElementsProvider: ({ children, elements }): JSX.Element => (
      <ElementsContext.Provider value={elements}>
        {children}
      </ElementsContext.Provider>
    ),
    useElement: (name) =>
      // fallback to `RenderNothing` on lookup fail
      React.useContext(ElementsContext)?.[name] ?? RenderNothing,
  };
};

export default createElementsContext;
