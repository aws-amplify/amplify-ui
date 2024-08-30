import React from 'react';

import {
  createAmplifyAuthAdapter,
  CreateAmplifyAuthAdapterOptions,
} from './adapters/createAmplifyAuthAdapter';
import { createStorageBrowser } from './createStorageBrowser';
import { elementsDefault } from './context/elements';

interface StorageBrowserProps {
  defaultPrefixes: CreateAmplifyAuthAdapterOptions['defaultPrefixes'];
}

export const StorageBrowser = ({
  defaultPrefixes,
}: StorageBrowserProps): JSX.Element => {
  const { StorageBrowser } = createStorageBrowser({
    elements: elementsDefault,
    config: createAmplifyAuthAdapter({
      options: {
        defaultPrefixes,
      },
    }),
  });

  return <StorageBrowser />;
};
