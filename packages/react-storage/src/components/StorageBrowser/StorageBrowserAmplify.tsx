import React from 'react';

import { elementsDefault } from './context/elements';
import {
  createStorageBrowser,
  StorageBrowserProps as StorageBrowserPropsBase,
} from './createStorageBrowser';
import { createAmplifyAuthAdapter } from './adapters';
import { Hub } from 'aws-amplify/utils';

export interface StorageBrowserProps extends StorageBrowserPropsBase {}

export const StorageBrowser = ({
  views,
}: StorageBrowserProps): React.JSX.Element => {
  const { StorageBrowser } = React.useRef(
    createStorageBrowser({
      elements: elementsDefault,
      config: createAmplifyAuthAdapter({
        registerAuthListener: (onStateChange) => {
          const remove = Hub.listen('auth', (data) => {
            if (data.payload.event === 'signedOut') {
              onStateChange();
              remove();
            }
          });
        },
      }),
    })
  ).current;

  return <StorageBrowser views={views} />;
};
