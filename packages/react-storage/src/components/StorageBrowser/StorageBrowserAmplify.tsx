import React from 'react';

import { elementsDefault } from './context/elements';
import { createStorageBrowser } from './createStorageBrowser';
import { StorageBrowserProps as StorageBrowserPropsBase } from './types';
import { createAmplifyAuthAdapter } from './adapters';
import { componentsDefault } from './componentsDefault';

export interface StorageBrowserProps extends StorageBrowserPropsBase {}

export const StorageBrowser = ({
  views,
  displayText,
}: StorageBrowserProps): React.JSX.Element => {
  const { StorageBrowser } = React.useRef(
    createStorageBrowser({
      elements: elementsDefault,
      components: componentsDefault,
      config: createAmplifyAuthAdapter(),
    })
  ).current;

  return <StorageBrowser views={views} displayText={displayText} />;
};
