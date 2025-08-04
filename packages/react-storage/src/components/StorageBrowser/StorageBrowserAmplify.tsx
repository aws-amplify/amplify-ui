import React from 'react';

import { createAmplifyAuthAdapter } from './adapters';
import type { StorageBrowserProps as StorageBrowserPropsBase } from './createStorageBrowser';
import { createStorageBrowser } from './createStorageBrowser';

export interface StorageBrowserProps extends StorageBrowserPropsBase {}

export function StorageBrowser(props: StorageBrowserProps): React.JSX.Element {
  const { StorageBrowser: StorageBrowserComponent } = React.useRef(
    createStorageBrowser({
      components: {},
      config: createAmplifyAuthAdapter(),
      filePreviewConfig: {
        fileTypeResolver: () => {
          return 'pdf';
          return undefined;
        },
        customRenderers: {
          // "unknown"
          // pdf: () => <div></div>,
        },
      },
    })
  ).current;

  return <StorageBrowserComponent {...props} />;
}
