import React from 'react';

import { isString, isFunction } from '@aws-amplify/ui';
import { useTimeout } from '@aws-amplify/ui-react-core';

interface UseHandleCopyParams {
  /**
   * @param value platform clipboard set handler
   */
  copyHandler: (value: string) => Promise<void>;
  /**
   * length in milliseconds to delay reset
   */
  reset?: number;
  /**
   * `target` to set as clipboard value
   */
  target?: string;
}

interface UseHandleCopy {
  /**
   * @param value callback `value` to set as clipboard value, supercedes `target`
   * @returns
   */
  handleCopy: (value?: string) => void;

  /**
   * copied value
   */
  value: string | undefined;
}

/**
 * @param {UseHandleCopyParams} params requires `copyHandler`
 * @returns {UseHandleCopy} `handleCopy` callback and copied `value`
 */
export default function useHandleCopy({
  copyHandler,
  reset,
  target,
}: UseHandleCopyParams): UseHandleCopy {
  const [value, setValue] = React.useState<string | undefined>();

  // prevent `useTimeout` from executing `callback` by assigning `undefined`
  useTimeout({
    callback: value ? () => setValue(undefined) : undefined,
    delay: reset,
  });

  const handleCopy = React.useCallback(
    (v?: string) => {
      // prefer `v` passed to callback over `target`
      const copyValue = v ?? target;
      if (isFunction(copyHandler) && isString(copyValue)) {
        copyHandler(copyValue);
        setValue(copyValue);
      }
    },
    [copyHandler, target]
  );

  return { handleCopy, value };
}
