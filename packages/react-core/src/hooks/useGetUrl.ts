import * as React from 'react';

import { getUrl, GetUrlInput } from 'aws-amplify/storage';

import { isFunction } from '@aws-amplify/ui';

export type UseGetUrlInput = GetUrlInput & {
  onError?: (error: Error) => void;
};
interface UseGetUrlOutput {
  isLoading: boolean;
  url: URL | undefined;
  expiresAt: Date | undefined;
}

const INIT_STATE: UseGetUrlOutput = {
  url: undefined,
  expiresAt: undefined,
  isLoading: true,
};

export const useGetUrl = (input: UseGetUrlInput): UseGetUrlOutput => {
  const [result, setResult] = React.useState(() => INIT_STATE);
  React.useEffect(() => {
    console.log("rendering")
    const { onError, ...getUrlInput } = input;
    let ignore = false;

    getUrl(getUrlInput)
      .then((response) => {
        if (ignore) {
          return;
        }

        setResult({ ...response, isLoading: false });
      })
      .catch((error: Error) => {
        if (ignore) {
          console.log("ignore, return")
          return;
        }
        console.log('catch block onError:', onError)
        if (isFunction(onError)) {
          console.log('is function')
          onError(error);
        }
        setResult({ ...INIT_STATE, isLoading: false });
        console.log('after set result')
      });

    return () => {
      console.log('cleanup')
      ignore = true;
    };
  }, [input]);

  return result;
};