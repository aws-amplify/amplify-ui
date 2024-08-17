import React from 'react';
import { ResponseComponents } from '../types';
import { ToolConfiguration } from '../../../types';

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

export const convertResponseComponentsToToolConfiguration = (
  responseComponents?: ResponseComponents
): ToolConfiguration | undefined => {
  if (!responseComponents) {
    return;
  }
  const tools: ToolConfiguration['tools'] = {};
  Object.keys(responseComponents).forEach((toolName: string) => {
    tools[toolName] = {
      description: responseComponents[toolName].description,
      inputSchema: {
        json: {
          type: 'object',
          properties: {
            ...responseComponents[toolName].props,
          },
        },
      },
    };
  });
  return { tools };
};
