import * as React from 'react';

import { isFunction } from '@aws-amplify/ui';
import { useHasValueUpdated } from '@aws-amplify/ui-react-core';
import { getUrl, GetUrlInput } from 'aws-amplify/storage';

interface UseStorageURLParams {
  key: string;
  options?: GetUrlInput['options'];
  fallbackURL?: string;
  onStorageGetError?: (error: Error) => void;
}

/**
 * Computes a public URL for an Amplify Storage file
 * @internal
 */
export const useStorageURL = ({
  key,
  options,
  fallbackURL,
  onStorageGetError,
}: UseStorageURLParams): string | undefined => {
  const [url, setURL] = React.useState<string>();
  const hasKeyUpdated = useHasValueUpdated(key);

  React.useEffect(() => {
    if (!hasKeyUpdated) {
      return;
    }

    getUrl({ key, options })
      .then(({ url }) => setURL(url.toString()))
      .catch((error: Error) => {
        if (isFunction(onStorageGetError)) {
          onStorageGetError(error);
        }
        if (fallbackURL) {
          setURL(fallbackURL);
        }
      });
  }, [key, options, fallbackURL, onStorageGetError, hasKeyUpdated]);

  return url;
};
