import React from 'react';

import { createStorageBrowser } from './createStorageBrowser';
import { StorageBrowserProps as StorageBrowserPropsBase } from './types';
import { createAmplifyAuthAdapter } from './adapters';

export interface StorageBrowserProps extends StorageBrowserPropsBase {}

export const StorageBrowser = ({
  views,
  displayText,
}: StorageBrowserProps): React.JSX.Element => {
  const { StorageBrowser } = React.useRef(
    createStorageBrowser({ config: createAmplifyAuthAdapter() })
  ).current;

  return <StorageBrowser views={views} displayText={displayText} />;
};
