import React from 'react';

import { createStorageBrowser } from './createStorageBrowser';
import { StorageBrowserProps as StorageBrowserPropsBase } from './types';
import { createAmplifyAuthAdapter } from './adapters';

export interface StorageBrowserProps extends StorageBrowserPropsBase {}

export function StorageBrowser(props: StorageBrowserProps): React.JSX.Element {
  const { StorageBrowser: StorageBrowserComponent } = React.useRef(
    createStorageBrowser({ config: createAmplifyAuthAdapter() })
  ).current;

  return <StorageBrowserComponent {...props} />;
}
