import * as React from 'react';

import type {
  GetUrlInput,
  GetUrlOutput,
  GetUrlWithPathInput,
} from 'aws-amplify/storage';
import { getUrl } from 'aws-amplify/storage';

import { isFunction } from '@aws-amplify/ui';

export type UseGetUrlInput = (GetUrlInput | GetUrlWithPathInput) & {
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

type GetUrl = (
  input: GetUrlInput | GetUrlWithPathInput
) => Promise<GetUrlOutput>;

export default function useGetUrl(input: UseGetUrlInput): UseGetUrlOutput {
  const [result, setResult] = React.useState(() => INIT_STATE);
  React.useEffect(() => {
    const { onError, ...getUrlInput } = input;
    let ignore = false;

    (getUrl as GetUrl)(getUrlInput)
      .then((response) => {
        if (ignore) {
          return;
        }

        setResult({ ...response, isLoading: false });
      })
      .catch((error: Error) => {
        if (ignore) {
          return;
        }

        if (isFunction(onError)) {
          onError(error);
        }

        setResult({ ...INIT_STATE, isLoading: false });
      });

    return () => {
      ignore = true;
    };
  }, [input]);

  return result;
}
