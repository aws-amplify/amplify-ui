import * as React from 'react';

import { isFunction } from '@aws-amplify/ui';
import { useHasValueUpdated } from '@aws-amplify/ui-react-core';
// import { S3ProviderGetConfig, Storage } from '@aws-amplify/storage';
import * as Storage from '@aws-amplify/storage';

interface UseStorageURLParams {
  key: string;
  options?: Storage.GetUrlInput['options'];
  fallbackURL?: string;
  onStorageGetError?: (error: Error) => void;
}

/**
 * Computes a public URL for an Amplify Storage file
 * @internal
 */
// export const useStorageURL = ({
//   key,
//   options,
//   fallbackURL,
//   onStorageGetError,
// }: UseStorageURLParams): string | undefined => {
//   const [url, setURL] = React.useState<string>();
//   const hasKeyUpdated = useHasValueUpdated(key);

//   React.useEffect(() => {
//     if (!hasKeyUpdated) {
//       return;
//     }

//     const promise = Storage.get(key, options)
//       .then((url) => setURL(url))
//       .catch((error: Error) => {
//         if (isFunction(onStorageGetError)) {
//           onStorageGetError(error);
//         }
//         if (fallbackURL) {
//           setURL(fallbackURL);
//         }
//       });

//     // Cancel current promise on unmount
//     return () => Storage.cancel(promise);
//   }, [key, options, fallbackURL, onStorageGetError, hasKeyUpdated]);

//   return url;
// };

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
