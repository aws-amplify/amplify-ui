import React from 'react';

import { useAmplifyContext } from '@aws-amplify/ui-react-core';
import { createAmplifyAuthAdapter } from './adapters';
import type {
  StorageBrowserProps as StorageBrowserPropsBase,
  StorageBrowserProviderProps as StorageBrowserProviderPropsBase,
} from './createStorageBrowser';
import { createStorageBrowser } from './createStorageBrowser';

export interface StorageBrowserProps extends StorageBrowserPropsBase {}
export interface StorageBrowserProviderProps
  extends StorageBrowserProviderPropsBase {}

export function StorageBrowser(props: StorageBrowserProps): React.JSX.Element {
  const amplifyContext = useAmplifyContext();
  const { StorageBrowser: StorageBrowserComponent } = React.useRef(
    createStorageBrowser({ config: createAmplifyAuthAdapter(amplifyContext!) })
  ).current;

  return <StorageBrowserComponent {...props} />;
}
