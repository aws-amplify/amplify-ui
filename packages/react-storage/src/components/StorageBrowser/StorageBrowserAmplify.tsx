import React from 'react';

import {
  createAmplifyAuthAdapter,
  CreateAmplifyAuthAdapterOptions,
} from './adapters/createAmplifyAuthAdapter';
import { elementsDefault } from './context/elements';
import {
  createStorageBrowser,
  StorageBrowserProps as StorageBrowserPropsBase,
} from './createStorageBrowser';

export interface StorageBrowserProps
  extends Pick<CreateAmplifyAuthAdapterOptions, 'defaultPrefixes'>,
    StorageBrowserPropsBase {}

export const StorageBrowser = ({
  defaultPrefixes,
  views,
}: StorageBrowserProps): React.JSX.Element => {
  const { StorageBrowser } = React.useRef(
    createStorageBrowser({
      elements: elementsDefault,
      config: createAmplifyAuthAdapter({ options: { defaultPrefixes } }),
    })
  ).current;

  return <StorageBrowser views={views} />;
};
