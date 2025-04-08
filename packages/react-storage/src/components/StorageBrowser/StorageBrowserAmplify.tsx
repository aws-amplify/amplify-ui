import React from 'react';

import { createAmplifyAuthAdapter } from './adapters';
import {
  createStorageBrowser,
  StorageBrowserProps as StorageBrowserPropsBase,
} from './createStorageBrowser';

export interface StorageBrowserProps extends StorageBrowserPropsBase {}

export function StorageBrowser(props: StorageBrowserProps): React.JSX.Element {
  const { StorageBrowser: StorageBrowserComponent } = React.useRef(
    createStorageBrowser({ config: createAmplifyAuthAdapter() })
  ).current;

  return <StorageBrowserComponent {...props} />;
}
