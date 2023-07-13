import * as React from 'react';

import { isFunction } from '@aws-amplify/ui';
import { S3ProviderGetConfig, Storage } from '@aws-amplify/storage';

export interface UseStorageURLResult {
  url?: string;
  isLoading: boolean;
}

interface UseStorageURLErrorConfig {
  fallbackURL?: string;
  onError?: (error: Error) => void;
}

/**
 * Computes a public URL for an Amplify Storage file
 * @internal
 */
export const useStorageURL = (
  key: string,
  options?: S3ProviderGetConfig,
  errorConfig?: UseStorageURLErrorConfig
): UseStorageURLResult => {
  const [result, setResult] = React.useState<UseStorageURLResult>({
    isLoading: true,
  });

  const fetch = () => {
    setResult({ isLoading: true });

    const promise = Storage.get(key, options);

    // Attempt to fetch storage object url
    promise
      .then((url) => setResult({ url, isLoading: false }))
      .catch((error: Error) => {
        const { fallbackURL, onError } = errorConfig ?? {};
        if (isFunction(onError)) {
          onError(error);
        }
        setResult({ isLoading: false, url: fallbackURL });
      });

    // Cancel current promise on unmount
    return () => Storage.cancel(promise);
  };

  React.useEffect(fetch, [key, options, errorConfig]);

  return { ...result };
};
