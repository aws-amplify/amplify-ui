import React from 'react';

import { elementsDefault } from './context/elements';
import {
  createStorageBrowser,
  StorageBrowserProps as StorageBrowserPropsBase,
} from './createStorageBrowser';
import { createAmplifyAuthAdapter } from './adapters';

export interface StorageBrowserProps extends StorageBrowserPropsBase {}

export const StorageBrowser = ({
  views,
}: StorageBrowserProps): React.JSX.Element => {
  const { StorageBrowser } = React.useRef(
    createStorageBrowser({
      elements: elementsDefault,
      config: createAmplifyAuthAdapter(),
    })
  ).current;

  return <StorageBrowser views={views} />;
};
