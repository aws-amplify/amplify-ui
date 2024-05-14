import * as React from 'react';

import * as Storage from 'aws-amplify/storage';

import { isFunction } from '@aws-amplify/ui';
import { useHasValueUpdated } from '@aws-amplify/ui-react-core';

interface UseStorageURLParams {
  key: string;
  options?: Storage.GetUrlInput['options'];
  fallbackURL?: string;
  onStorageGetError?: (error: Error) => void;
}

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

    let ignore = false;

    const input: Storage.GetUrlInput = { key, options };

    Storage.getUrl(input)
      .then(({ url }) => {
        if (ignore) {
          return;
        }

        setURL(url.toString());
      })
      .catch((error: Error) => {
        if (ignore) {
          return;
        }

        if (isFunction(onStorageGetError)) {
          onStorageGetError(error);
        }
        if (fallbackURL) {
          setURL(fallbackURL);
        }

        return () => {
          ignore = true;
        };
      });
  }, [key, options, fallbackURL, onStorageGetError, hasKeyUpdated]);

  return url;
};
