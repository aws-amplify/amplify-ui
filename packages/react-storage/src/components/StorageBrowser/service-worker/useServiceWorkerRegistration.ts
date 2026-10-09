import { useEffect } from 'react';

import { SW_DOWNLOAD_SCOPE, SW_URL } from './constants';

export function useServiceWorkerRegistration(): void {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register(SW_URL, { scope: SW_DOWNLOAD_SCOPE })
        .catch((err) => {
          // Registration failure is non-critical; the blob fallback handles
          // downloads. We still surface it: a failed registration is a real
          // (silent otherwise) degradation, and the most common cause is
          // forgetting the copy-serviceworker setup step so the SW file isn't
          // served from the app's public directory.
          // eslint-disable-next-line no-console
          console.warn(
            '[StorageBrowser] Download service worker registration failed; ' +
              'falling back to in-memory blob downloads. Ensure the service ' +
              'worker file is served (see the copy-serviceworker setup step):',
            err
          );
        });
    }
  }, []);
}
