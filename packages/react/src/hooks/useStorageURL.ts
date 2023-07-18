import * as React from 'react';

import { S3ProviderGetConfig, Storage } from '@aws-amplify/storage';

export interface UseStorageURLResult {
  url?: string;
  error?: Error;
  isLoading: boolean;
}

/**
 * Computes a public URL for an Amplify Storage file
 * @internal
 */
export const useStorageURL = (
  key: string,
  options?: S3ProviderGetConfig
): UseStorageURLResult & { fetch: () => () => void } => {
  const [result, setResult] = React.useState<UseStorageURLResult>({
    isLoading: true,
  });

  // Used to prevent an infinite loop on useEffect, because `options`
  // will have a different reference on every render
  const serializedOptions = JSON.stringify(options);

  const fetch = () => {
    setResult({ isLoading: true });

    const promise = Storage.get(key, options);

    // Attempt to fetch storage object url
    promise
      .then((url) => setResult({ url, isLoading: false }))
      .catch((error: Error) => setResult({ error, isLoading: false }));

    // Cancel current promise on unmount
    return () => Storage.cancel(promise);
  };

  React.useEffect(fetch, [key, options, serializedOptions]);

  return { ...result, fetch };
};
