import React from 'react';
import { ResponseComponents } from '../types';

type ResponseComponentsContextProps = ResponseComponents | undefined;

export const ResponseComponentsContext =
  React.createContext<ResponseComponentsContextProps>(undefined);

export const ResponseComponentsProvider = ({
  children,
  responseComponents,
}: {
  children?: React.ReactNode;
  responseComponents?: ResponseComponents;
}): JSX.Element => {
  return (
    <ResponseComponentsContext.Provider value={responseComponents}>
      {children}
    </ResponseComponentsContext.Provider>
  );
};
