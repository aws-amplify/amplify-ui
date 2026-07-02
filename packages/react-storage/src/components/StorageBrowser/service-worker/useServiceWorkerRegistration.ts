import { useEffect } from 'react';

export const SW_DOWNLOAD_SCOPE = '/';

const SW_URL = '/amplify-storage-download/download-sw.js';

export function useServiceWorkerRegistration(): void {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register(SW_URL, { scope: SW_DOWNLOAD_SCOPE })
        .catch(() => {
          // Registration failure is non-critical; blob fallback handles downloads
        });
    }
  }, []);
}
