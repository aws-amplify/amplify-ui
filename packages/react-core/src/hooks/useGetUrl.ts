import * as React from 'react';

import { getUrl, GetUrlInput } from 'aws-amplify/storage';

import { isFunction } from '@aws-amplify/ui';
import { useHasValueUpdated } from '@aws-amplify/ui-react-core';

export type UseGetUrlInput = GetUrlInput & {
  onError?: (error: Error) => void;
};

interface UseGetUrlOutput {
  isLoading: boolean;
  url: URL | undefined;
  expiresAt: Date | undefined;
}

function getKeyOrPath(
  input: UseGetUrlInput
): string | (({ identityId }: { identityId?: string }) => string) {
  if (input.key !== undefined) {
    return input.key;
  }
  return input.path;
}

export const useGetUrl = (input: UseGetUrlInput): UseGetUrlOutput => {
  const [result, setResult] = React.useState<UseGetUrlOutput>({
    url: undefined,
    expiresAt: undefined,
    isLoading: false,
  });
  const keyOrPath = getKeyOrPath(input);
  const hasImgUpdated = useHasValueUpdated(keyOrPath);

  React.useEffect(() => {
    if (!hasImgUpdated) {
      return;
    }
    const { onError, ...getUrlInput } = input;
    setResult((prevResult) => ({ ...prevResult, isLoading: true }));
    let ignore = false;

    getUrl(getUrlInput)
      .then((response) => {
        if (ignore) {
          return;
        }
        setResult((prevResult) => ({
          ...prevResult,
          ...response,
          isLoading: false,
        }));
      })
      .catch((error: Error) => {
        if (ignore) {
          return;
        }
        if (isFunction(onError)) {
          onError(error);
        }
        setResult((prevResult) => ({ ...prevResult, isLoading: false }));
        return () => {
          ignore = true;
        };
      });
  }, [input, hasImgUpdated, keyOrPath, result]);
  return result;
};
