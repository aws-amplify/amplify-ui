import { useEffect } from 'react';

export const SW_DOWNLOAD_SCOPE = '/amplify-storage-download/';

const SW_URL = '/amplify-storage-download/download-sw.js';

export function useServiceWorkerRegistration(): void {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register(SW_URL, { scope: SW_DOWNLOAD_SCOPE })
        .catch((err) => {
          // Registration failure is non-critical; blob fallback handles downloads.
          // Surface it in development to help diagnose the most common setup
          // mistake — forgetting to run `copy-serviceworker` so the SW file is
          // served from the app's public directory.
          if (process.env.NODE_ENV !== 'production') {
            // eslint-disable-next-line no-console
            console.warn(
              '[StorageBrowser] Download service worker registration failed; ' +
                'falling back to in-memory blob downloads. Ensure the service ' +
                'worker file is served (see the copy-serviceworker setup step):',
              err
            );
          }
        });
    }
  }, []);
}
