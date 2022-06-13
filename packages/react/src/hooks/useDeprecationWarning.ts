import * as React from 'react';

interface UseDeprecationWarning {
  shouldWarn: boolean;
  message: string;
}

export const useDeprecationWarning = ({
  shouldWarn,
  message,
}: UseDeprecationWarning): void => {
  React.useEffect(() => {
    if (
      shouldWarn &&
      // show message on builds without Node `process` polyfill
      // or with process.env.NODE_ENV not production
      (typeof process === 'undefined' ||
        (process && process.env.NODE_ENV !== 'production'))
    ) {
      // eslint-disable-next-line no-console
      console.warn(message);
    }
  }, [shouldWarn, message]);
};
