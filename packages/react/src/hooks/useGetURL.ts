import * as React from 'react';

import { getUrl, GetUrlInput, GetUrlOutput } from 'aws-amplify/storage';

import { isFunction } from '@aws-amplify/ui';
import { useHasValueUpdated } from '@aws-amplify/ui-react-core';

type UseGetUrlInput = GetUrlInput & {
  onError?: (error: Error) => void;
};

interface UseGetUrlOutput {
  isLoading: boolean;
  url?: URL;
  expiresAt?: Date;
}

// interface UseGetUrlOutput extends GetUrlOutput{
//     isLoading: boolean;
// }

function getKeyOrPath(
  input: UseGetUrlInput
): string | (({ identityId }: { identityId?: string }) => string) {
  if (input.key !== undefined) {
    return input.key;
  }
  return input.path;
}

type UseGetUrl = (input: UseGetUrlInput) => UseGetUrlOutput;

export const useGetURL: UseGetUrl = (
  input: UseGetUrlInput
): UseGetUrlOutput => {
  const [result, setResult] = React.useState<GetUrlOutput>();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const imgLocation = getKeyOrPath(input);
  const hasImgUpdated = useHasValueUpdated(imgLocation);
  const { onError, ...getUrlInput } = input;

  React.useEffect(() => {
    if (!hasImgUpdated) {
      return;
    }

    setIsLoading(true);

    let ignore = false;

    // @ts-ignore TODO why is this having an issue
    getUrl(getUrlInput)
      .then((response) => {
        if (ignore) {
          return;
        }

        setResult(response);
      })
      .catch((error: Error) => {
        if (ignore) {
          return;
        }
        if (isFunction(onError)) {
          onError(error);
        }

        return () => {
          ignore = true;
        };
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [input, getUrlInput, onError, hasImgUpdated]);
  return { ...result, isLoading };
};
