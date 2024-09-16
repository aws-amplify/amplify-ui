import React from 'react';
import { ResponseComponents } from '../types';
import { ToolConfiguration } from '../../../types';

type ResponseComponentsContextProps = ResponseComponents | undefined;

export const RESPONSE_COMPONENT_PREFIX = 'AMPLIFY_UI_';

export const ResponseComponentsContext =
  React.createContext<ResponseComponentsContextProps>(undefined);

const prependResponseComponents = (responseComponents?: ResponseComponents) => {
  if (!responseComponents) return responseComponents;
  return Object.keys(responseComponents).reduce(
    (prev, key) => (
      (prev[`${RESPONSE_COMPONENT_PREFIX}${key}`] = responseComponents[key]),
      prev
    ),
    {} as ResponseComponents
  );
};

export const ResponseComponentsProvider = ({
  children,
  responseComponents,
}: {
  children?: React.ReactNode;
  responseComponents?: ResponseComponents;
}): JSX.Element => {
  const _responseComponents = React.useMemo(
    () => prependResponseComponents(responseComponents),
    [responseComponents]
  );

  return (
    <ResponseComponentsContext.Provider value={_responseComponents}>
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
    const { props } = responseComponents[toolName];
    const requiredProps: string[] = [];
    Object.keys(props).forEach((propName) => {
      if (props[propName].required) requiredProps.push(propName);
    });
    tools[toolName] = {
      description: responseComponents[toolName].description,
      inputSchema: {
        json: {
          type: 'object',
          required: requiredProps,
          properties: {
            ...props,
          },
        },
      },
    };
  });
  return { tools };
};
